export const ocd5eItemCard = function (html, actor) {
  // show/hide grid layout item info card on mouse enter/leave

  const itemCardsForAllItems = game.settings.get('ocd-5e', 'itemCardsForAllItems');

  // TODO: this needs to bind the events after the "favorites list" is loaded in the DOM
  const containerTrigger = itemCardsForAllItems
    ? html.find('.inventory-list:not(.character-actions-dnd5e)')
    : html.find('.grid-layout .inventory-list');
  const cardTrigger = itemCardsForAllItems
    ? html.find('.inventory-list:not(.character-actions-dnd5e) .item-list .item')
    : html.find('.grid-layout .item-list .item');

  console.log('ocd-5e | cardTrigger is bound to: ', cardTrigger);

  const infoContainer = html.find('#item-info-container'),
    infoContainerContent = html.find('#item-info-container-content');

  let timer;
  let itemCardDelay = game.settings.get('ocd-5e', 'itemCardsDelay');
  if (!itemCardDelay || itemCardDelay == 0) itemCardDelay = false;

  let mouseOverItem = false;
  let itemCardIsFixed = false;
  const itemCardFixKey = game.settings.get('ocd-5e', 'itemCardsFixKey') || 'x';

  const itemCardsAreFloating = game.settings.get('ocd-5e', 'itemCardsAreFloating');

  let sheet, sheetWidth, sheetHeight, sheetBorderRight, sheetBorderBottom;

  if (itemCardsAreFloating) {
    infoContainer.addClass('floating');

    setTimeout(function () {
      getBounds();
    }, 500);

    console.log('ocd-5e | containerTriger is: ', containerTrigger);

    containerTrigger.each(function (i, el) {
      console.log('ocd-5e | container trigger addEventListener');
      el.addEventListener('mousemove', setCardPosition);
    });
  }

  function getBounds() {
    sheet = $('.ocd5e.sheet.actor');
    if (sheet.length < 1) {
      // PoPOut "hack"
      sheet = $(html);
      sheetWidth = $(sheet[0]).width();
      sheetHeight = $(sheet[0]).height();
      sheetBorderRight = sheetWidth;
      sheetBorderBottom = sheetHeight;
    } else {
      sheetWidth = sheet.width();
      sheetHeight = sheet.height();
      sheetBorderRight = sheet.offset().left + sheetWidth;
      sheetBorderBottom = sheet.offset().top + sheetHeight;
    }
  }

  function setCardPosition(ev) {
    if (!itemCardIsFixed && mouseOverItem) {
      const card = html.find('#item-info-container.floating');
      if (card.length == 0) return;
      const mousePos = { x: ev.clientX, y: ev.clientY };
      // card height = 460px -> 1/2 = 230px
      let topPos = `${mousePos.y - 230}px`;
      let leftPos = `${mousePos.x + 24}px`;

      // wenn maus weniger als 280px zum rechten sheet-rand card auf linker seite
      // wenn maus weniger als card/2 nach unten/oben card in gegenrichtung verschieben.
      if (mousePos.x + 304 > sheetBorderRight) {
        leftPos = `${mousePos.x - 304}px`;
      }

      if (mousePos.y + 230 > sheetBorderBottom) {
        const diff = sheetBorderBottom - (mousePos.y + 230);
        topPos = `${mousePos.y - 230 + diff}px`;
      }

      card.css({
        top: topPos,
        left: leftPos,
      });
    }
  }

  $(document).on('keydown', function (e) {
    if (e.key === itemCardFixKey) {
      itemCardIsFixed = true;
    }
  });

  $(document).on('keyup', function (e) {
    if (e.key === itemCardFixKey) {
      itemCardIsFixed = false;
      if (!itemCardDelay) removeCard();
      infoContainer.removeClass('open');
    }
  });

  const itemCardDelayCard = (event) => {
    timer = setTimeout(function () {
      if (!itemCardIsFixed) {
        removeCard();
        showCard(event);
        infoContainer.addClass('open');
      }
    }, itemCardDelay);
  };

  const resetDelay = () => {
    clearTimeout(timer);
    if (!itemCardIsFixed) infoContainer.removeClass('open');
  };

  cardTrigger.mouseenter(function (event) {
    console.log(
      'ocd-5e | itemCard::mouseenter regular event, cardTrigger is only loaded with: ',
      cardTrigger,
      ' regular event setup balls',
    );
    if (!itemCardIsFixed) {
      if (!itemCardDelay) infoContainer.addClass('open');
    }
  });

  cardTrigger.mouseleave(function (event) {
    if (!itemCardIsFixed) {
      if (!itemCardDelay) hideContainer();
    }
  });

  cardTrigger.mouseenter(async (event) => {
    console.log('ocd-5e | itemCard::mouseenter async event');
    mouseOverItem = true;
    if (!itemCardIsFixed) {
      if (itemCardDelay) itemCardDelayCard(event);
      else showCard(event);
    }
  });

  cardTrigger.mouseleave(function (event) {
    mouseOverItem = false;
    if (!itemCardIsFixed) {
      if (!itemCardDelay) removeCard();
      else resetDelay();
    }
  });

  const item = html.find('.item');
  item.each(function () {
    this.addEventListener('mousedown', function (event) {
      switch (event.which) {
        case 3:
          // right click opens context menu
          event.preventDefault();
          mouseOverItem = false;
          hideContainer();
          break;
      }
    });

    this.addEventListener('dragstart', function () {
      mouseOverItem = false;
      hideContainer();
    });
  });

  function showCard(event) {
    getBounds();
    event.preventDefault();
    const li = $(event.currentTarget).closest('.item'),
      item = actor.items.get(li.data('item-id')),
      itemData = item.data,
      chatData = item.getChatData({ secrets: actor.isOwner }),
      itemDescription = chatData.description.value,
      infoCard = li.find('.info-card');

    infoCard.clone().appendTo(infoContainerContent);

    const infoBackground = infoContainer.find('.item-info-container-background'),
      infoDescription = infoContainerContent.find('.info-card-description'),
      props = $(`<div class="item-properties"></div>`);

    infoDescription.html(itemDescription);

    chatData.properties.forEach((p) => props.append(`<span class="tag">${p}</span>`));
    infoContainerContent.find('.info-card .description-wrap').after(props);

    infoBackground.hide();

    const innerScrollHeight = infoDescription[0].scrollHeight;

    if (innerScrollHeight > infoDescription.height()) {
      infoDescription.addClass('overflowing');
    }
  }

  function removeCard() {
    html.find('.item-info-container-background').show();
    infoContainerContent.find('.info-card').remove();
  }

  function hideContainer() {
    infoContainer.removeClass('open');
  }

  $('#item-info-container').on('click', '.button', function (e) {
    e.preventDefault();
    const itemId = $(this).closest('.info-card').attr('data-item-id');
    const action = $(this).attr('data-action');
    $(`.ocd-5e .item[data-item-id='${itemId}'] .item-buttons .button[data-action='${action}']`).trigger(e);
  });
};
