export const ocd5eContextMenu = function (html) {
  console.log('ocd-5e | ocd5eContextMenu listening');
  // open context menu

  html.find('.item-list .item.context-enabled').mousedown(async (event) => {
    const target = event.target.class;
    const item = event.currentTarget;
    switch (event.which) {
      case 2:
        // middle mouse opens item editor
        event.preventDefault();
        if ($(item).find('.item-edit')) {
          $(item).find('.item-edit').trigger('click');
        }

        if ($(item).find('.effect-edit')) {
          $(item).find('.effect-edit').trigger('click');
        }

        break;
      case 3:
        // right click opens context menu
        item.addEventListener('contextmenu', (e) => e.preventDefault());
        event.preventDefault();
        if (!game.settings.get('ocd-5e', 'rightClickDisabled') && $(item).hasClass('context-enabled')) {
          html.find('.item').removeClass('context');
          html.find('.item .context-menu').hide();
          itemContextMenu(event);
        }
        break;
    }
  });

  html.find('.item-list .item .activate-context-menu').mousedown(async (event) => {
    if (game.settings.get('ocd-5e', 'rightClickDisabled')) {
      switch (event.which) {
        case 1:
          event.preventDefault();
          html.find('.item').removeClass('context');
          html.find('.item .context-menu').hide();
          itemContextMenu(event);
          break;
      }
    }
  });

  // context menu calculations
  async function itemContextMenu(event) {
    let item = event.currentTarget;

    if ($(item).hasClass('activate-context-menu')) {
      item = item.parentNode;
    }

    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const itemTop = $(item).offset().top;
    const itemLeft = $(item).offset().left;

    // itemHeight = $(item).height();
    // itemWidth = $(item).width();

    const contextTop = mouseY - itemTop + 1;
    const contextLeft = mouseX - itemLeft + 1;
    const contextWidth = $(item).find('.context-menu').width();
    const contextHeight = $(item).find('.context-menu').height();
    const contextRightBound = mouseX + contextWidth;
    const contextBottomBound = mouseY + contextHeight;
    const itemsList = $(item).closest('.items-list');
    const itemsListRightBound = itemsList.offset().left + itemsList.width() - 17;
    const itemsListBottomBound = itemsList.offset().top + itemsList.height();

    // check right side bounds
    if (contextRightBound > itemsListRightBound) {
      const rightDiff = itemsListRightBound - contextRightBound;
      contextLeft = contextLeft + rightDiff;
    }

    // check bottom bounds
    if (contextBottomBound > itemsListBottomBound) {
      const bottomDiff = itemsListBottomBound - contextBottomBound;
      contextTop = contextTop + bottomDiff;
    }

    $(item)
      .addClass('context')
      .find('.context-menu')
      .css({ top: contextTop + 'px', left: contextLeft + 'px' })
      .fadeIn(300);
  }

  //close context menu on any click outside
  $(html).mousedown(async (event) => {
    switch (event.which) {
      case 1:
        if (
          !$(event.target).closest('.item .context-menu').length &&
          !$(event.target).closest('.item .activate-context-menu').length
        ) {
          html.find('.item').removeClass('context');
          html.find('.item .context-menu').hide();
        }
        break;
    }
  });
};
