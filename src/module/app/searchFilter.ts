export const ocd5eSearchFilter = function (html, actor) {
  // filter settings list
  const searchInput = html.find('.filter-search input');

  searchInput.on('input', function () {
    filterInventoryList(this);
  });

  // check if already input
  (function () {
    searchInput.each(function () {
      if ($(this).val() != '') {
        filterInventoryList($(this));
      }
    });
  })();

  searchInput.on('blur', async function () {
    const id = $(this).attr('id'),
      value = $(this).val();
    switch (id) {
      case 'item-search':
        await actor.setFlag('ocd-5e', 'item-search', value);
        break;
      case 'spell-search':
        await actor.setFlag('ocd-5e', 'spell-search', value);
        break;
      case 'feat-search':
        await actor.setFlag('ocd-5e', 'feat-search', value);
        break;
    }
  });

  async function filterInventoryList(input) {
    const searchField = $(input);
    clearSearch = searchField.siblings('.clear-search');
    id = searchField.attr('id');
    searchTarget;
    value = searchField.val();

    switch (id) {
      case 'item-search':
        searchTarget = html.find(
          '.list-layout .inventory-list:not(.spellbook-list):not(.features-list) .item-name, .grid-layout .inventory-list:not(.spellbook-list):not(.features-list) .info-card-name',
        );
        break;
      case 'spell-search':
        searchTarget = html.find(
          '.list-layout .spellbook-list .item-name, .grid-layout .spellbook-list .info-card-name',
        );
        break;
      case 'feat-search':
        searchTarget = html.find('.list-layout .features-list .item-name');
        break;
    }

    if (value != '') {
      clearSearch.removeClass('hidden');
    } else {
      clearSearch.addClass('hidden');
    }

    value = value.toLowerCase().replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });

    searchTarget.each(function () {
      if ($(this).text().search(value) > -1) {
        $(this).closest('.item').removeClass('filtered').show();
      } else {
        $(this).closest('.item').addClass('filtered').hide();
      }

      if (
        $(this).closest('.item-list').find('.filtered').length + 1 ==
        $(this).closest('.item-list').children().length
      ) {
        $(this).closest('.item-list').hide();
        $(this).closest('.item-list').prev('.items-header').hide();
      } else {
        $(this).closest('.item-list').show();
        $(this).closest('.item-list').prev('.items-header').show();
      }
    });

    // clear search
    clearSearch.on('click', async function (e) {
      e.preventDefault();
      $(this).toggleClass('hidden');
      searchInput.val('');
      filterInventoryList(searchField);
      switch (id) {
        case 'item-search':
          await actor.setFlag('ocd-5e', 'item-search', '');
          break;
        case 'spell-search':
          await actor.setFlag('ocd-5e', 'spell-search', '');
          break;
        case 'feat-search':
          await actor.setFlag('ocd-5e', 'feat-search', '');
          break;
      }
    });
  }
};
