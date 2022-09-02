// count inventory items
export async function countInventoryItems(app, html, data) {
  if (game.user.isGM) {
    html.find('.attuned-items-counter').addClass('isGM');
  }

  // i.e. weapons / equipment / consumables / tools / containers / loot
  html.find('.tab.inventory .item-list').each(function () {
    const itemlist = $(this);
    const items = $(itemlist).find('li');
    const itemCount = items.length - 1;
    $(itemlist)
      .prev('.items-header')
      .find('.item-name')
      .append(' (' + itemCount + ')');
  });
}

// count attuned items
export async function countAttunedItems(app, html, data) {
  const actor = app.actor;
  const count = actor.data.data.attributes.attunement.value;
  if (actor.data.data.attributes.attunement.value > actor.data.data.attributes.attunement.max) {
    html.find('.attuned-items-counter').addClass('overattuned');
    ui.notifications.warn(`${game.i18n.format('OCD5E.AttunementWarning', { number: count })}`);
  }
}

// handle traits list display
export async function toggleTraitsList(app, html, data) {
  const selector = html.find('.traits:not(.always-visible):not(.expanded) .form-group.inactive');
  selector.remove();
}

// Check Death Save Status
export async function checkDeathSaveStatus(app, html, data) {
  if (data.editable) {
    const actor = app.actor;
    const data = actor.data.data;
    const currentHealth = data.attributes.hp.value;
    const deathSaveSuccess = data.attributes.death.success;
    const deathSaveFailure = data.attributes.death.failure;

    if (currentHealth <= 0) {
      $('.ocd-5e .profile').addClass('dead');
    }

    if ((currentHealth > 0 && deathSaveSuccess != 0) || (currentHealth > 0 && deathSaveFailure != 0)) {
      await actor.update({ 'data.attributes.death.success': 0 });
      await actor.update({ 'data.attributes.death.failure': 0 });
    }
  }
}

// TODO: this is one of the main tweaks I want to do:
// I want the GM to be able to say "don't let players modify important fields like ability scores / skills"
// Edit Protection - Hide empty Inventory Sections, Effects aswell as add and delete-buttons
export async function editProtection(app, html, data) {
  const actor = app.actor;
  if (game.user.isGM && game.settings.get('ocd-5e', 'editGmAlwaysEnabled')) {
    html.find('.classic-controls').addClass('gmEdit');
  } else if (!actor.getFlag('ocd-5e', 'allow-edit')) {
    if (game.settings.get('ocd-5e', 'editTotalLockEnabled')) {
      html.find('.skill input').prop('disabled', true);
      html.find('.skill .config-button').remove();
      html.find('.skill .proficiency-toggle').removeClass('proficiency-toggle');
      html.find('.ability-score').prop('disabled', true);
      html.find('.ac-display input').prop('disabled', true);
      html.find('.initiative input').prop('disabled', true);
      html.find('.hp-max').prop('disabled', true);
      html.find('.resource-name input').prop('disabled', true);
      html.find('.res-max').prop('disabled', true);
      html.find('.res-options').remove();
      html.find('.ability-modifiers .proficiency-toggle').remove();
      html.find('.ability .config-button').remove();
      html.find('.traits .config-button,.traits .trait-selector,.traits .proficiency-selector').remove();
      html.find('[contenteditable]').prop('contenteditable', false);
      html.find('.spellbook .slot-max-override').remove();
      html.find('.spellcasting-attribute select').prop('disabled', true);
      const spellbook = html.find('.spellbook .inventory-list .item-list').length;
      if (spellbook == 0) html.find(".item[data-tab='spellbook']").remove();
    }

    let resourcesUsed = 0;
    html.find('.resources input[type="text"]').each(function () {
      if ($(this).val() != '') {
        resourcesUsed++;
      }
    });
    if (resourcesUsed == 0) html.find('.resources').hide();

    const itemContainer = html.find('.inventory-list.items-list, .effects-list.items-list');
    html.find('.inventory-list .items-header:not(.spellbook-header), .effects-list .items-header').each(function () {
      if (
        $(this).next('.item-list').find('li').length - $(this).next('.item-list').find('li.items-footer').length ==
        0
      ) {
        $(this).next('.item-list').addClass('hidden').hide();
        $(this).addClass('hidden').hide();
      }
    });

    html.find('.inventory-list .items-footer').addClass('hidden').hide();
    html.find('.inventory-list .item-control.item-delete').remove();

    if (game.settings.get('ocd-5e', 'editEffectsGmOnlyEnabled') && !game.user.isGM) {
      html.find('.effects-list .items-footer, .effects-list .effect-controls').remove();
    } else {
      html.find('.effects-list .items-footer, .effects-list .effect-control.effect-delete').remove();
    }

    itemContainer.each(function () {
      const hiddenSections = $(this).find('> .hidden').length;
      const totalSections = $(this).children().not('.notice').length;
      if (hiddenSections >= totalSections) {
        if (
          $(this).hasClass('effects-list') &&
          !game.user.isGM &&
          game.settings.get('ocd-5e', 'editEffectsGmOnlyEnabled')
        ) {
          $(this).prepend(`<span class="notice">${game.i18n.localize('OCD5E.GmOnlyEdit')}</span>`);
        } else {
          $(this).append(`<span class="notice">${game.i18n.localize('OCD5E.EmptySection')}</span>`);
        }
      }
    });
  } else if (
    !game.user.isGM &&
    actor.getFlag('ocd-5e', 'allow-edit') &&
    game.settings.get('ocd-5e', 'editEffectsGmOnlyEnabled')
  ) {
    const itemContainer = html.find('.effects-list.items-list');

    itemContainer.prepend(`<span class="notice">${game.i18n.localize('OCD5E.GmOnlyEdit')}</span>`);
    html.find('.effects-list .items-footer, .effects-list .effect-controls').remove();

    html.find('.effects-list .items-header').each(function () {
      if ($(this).next('.item-list').find('li').length < 1) {
        $(this).next('.item-list').addClass('hidden').hide();
        $(this).addClass('hidden').hide();
      }
    });
  }
}

// Add Character Class List
export async function addClassList(app, html, data) {
  if (data.editable) {
    if (!game.settings.get('ocd-5e', 'classListDisabled')) {
      const actor = app.actor;
      let classList = [];
      const items = data.actor.items;
      for (const item of items) {
        if (item.type === 'class') {
          const levels = item.data.levels ? `<span class="levels-info">${item.data.levels}</span>` : ``;
          classList.push(item.name + levels);
        }
        if (item.type === 'subclass') {
          classList.push(item.name);
        }
      }
      classList =
        "<ul class='class-list'><li class='class-item'>" +
        classList.join("</li><li class='class-item'>") +
        '</li></ul>';
      mergeObject(actor, { 'data.flags.ocd-5e.classlist': classList });
      const classListTarget = html.find('.bonus-information');
      classListTarget.append(classList);
    }
  }
}

// Calculate Spell Attack modifier
export async function spellAttackMod(app, html, data) {
  if (data.editable) {
    const actor = app.actor,
      prof = actor.data.data.attributes.prof,
      spellAbility = html.find('.spellcasting-attribute select option:selected').val(),
      abilityMod = spellAbility != '' ? actor.data.data.abilities[spellAbility].mod : 0,
      spellBonus = parseInt(actor.data.data.bonuses.rsak.attack || 0),
      spellAttackMod = prof + abilityMod + spellBonus,
      text = spellAttackMod > 0 ? '+' + spellAttackMod : spellAttackMod;
    html.find('.spell-mod .spell-attack-mod').html(text);
  }
}

// Abbreviate Currency
export async function abbreviateCurrency(app, html, data) {
  html.find('.currency .currency-item label').each(function () {
    const currency = $(this).data('denom').toUpperCase();
    let abbr = game.i18n.localize(`DND5E.CurrencyAbbr${currency}`);
    if (abbr == `DND5E.CurrencyAbbr${currency}`) {
      abbr = currency;
    }

    $(this).html(abbr);
  });
}

// transform DAE formulas for maxPreparesSpells
export async function ocd5eCustomEffect(actor, change) {
  if (change.key !== 'data.details.maxPreparedSpells') return;
  if (change.value?.length > 0) {
    let oldValue = getProperty(actor.data, change.key) || 0;
    let changeText = change.value.trim();
    let op = 'none';
    if (['+', '-', '/', '*', '='].includes(changeText[0])) {
      op = changeText[0];
      changeText = changeText.slice(1);
    }
    const rollData = actor.getRollData();
    Object.keys(rollData.abilities).forEach((abl) => {
      rollData.abilities[abl].mod = Math.floor((rollData.abilities[abl].value - 10) / 2);
    });
    const roll_value = await new Roll(changeText, rollData).roll();
    const value = roll_value.total;
    oldValue = Number.isNumeric(oldValue) ? parseInt(oldValue) : 0;
    switch (op) {
      case '+':
        return setProperty(actor.data, change.key, oldValue + value);
      case '-':
        return setProperty(actor.data, change.key, oldValue - value);
      case '*':
        return setProperty(actor.data, change.key, oldValue * value);
      case '/':
        return setProperty(actor.data, change.key, oldValue / value);
      case '=':
        return setProperty(actor.data, change.key, value);
      default:
        return setProperty(actor.data, change.key, value);
    }
  }
}

// add active effects marker
export function markActiveEffects(app, html, data) {
  if (game.settings.get('ocd-5e', 'activeEffectsMarker')) {
    const actor = app.actor;
    const items = data.actor.items;
    const marker = `<span class="ae-marker" title="Item has active effects">Æ</span>`;
    for (const item of items) {
      if (item.effects.length > 0) {
        const id = item._id;
        html.find(`.item[data-item-id="${id}"] .item-name h4`).append(marker);
      }
    }
  }
}

// Manage Sheet Options
export async function setSheetClasses(app, html, data) {
  console.log('ocd-5e | setSheetClasses');

  const actor = app.actor;
  if (!game.settings.get('ocd-5e', 'playerNameEnabled')) {
    html.find('.ocd-5e #playerName').remove();
  }
  if (game.settings.get('ocd-5e', 'journalTabDisabled')) {
    html.find('.ocd-5e .ocd5e-navigation a[data-tab="journal"]').remove();
  }
  if (game.settings.get('ocd-5e', 'rightClickDisabled')) {
    if (game.settings.get('ocd-5e', 'classicControlsEnabled')) {
      html.find('.ocd-5e .grid-layout .items-list').addClass('alt-context');
    } else {
      html.find('.ocd-5e .items-list').addClass('alt-context');
    }
  }
  if (game.settings.get('ocd-5e', 'classicControlsEnabled')) {
    ocd5eClassicControls(html);
  }
  if (game.settings.get('ocd-5e', 'portraitStyle') == 'pc' || game.settings.get('ocd-5e', 'portraitStyle') == 'all') {
    html.find('.ocd-5e .profile').addClass('roundPortrait');
  }
  if (game.settings.get('ocd-5e', 'hpOverlayDisabled')) {
    html.find('.ocd-5e .profile').addClass('disable-hp-overlay');
  }
  if (game.settings.get('ocd-5e', 'hpBarDisabled')) {
    html.find('.ocd-5e .profile').addClass('disable-hp-bar');
  }
  if (game.settings.get('ocd-5e', 'inspirationDisabled')) {
    html.find('.ocd-5e .profile .inspiration').remove();
  }
  if (game.settings.get('ocd-5e', 'inspirationAnimationDisabled')) {
    html.find('.ocd-5e .profile .inspiration label i').addClass('disable-animation');
  }
  if (game.settings.get('ocd-5e', 'hpOverlayBorder') > 0) {
    $('.system-dnd5e')
      .get(0)
      .style.setProperty('--pc-border', game.settings.get('ocd-5e', 'hpOverlayBorder') + 'px');
  } else {
    $('.system-dnd5e').get(0).style.removeProperty('--pc-border');
  }
  if (game.settings.get('ocd-5e', 'hideIfZero')) {
    html.find('.ocd-5e .profile').addClass('autohide');
  }
  if (game.settings.get('ocd-5e', 'exhaustionDisabled')) {
    html.find('.ocd-5e .profile .exhaustion-container').remove();
  }
  if (game.settings.get('ocd-5e', 'exhaustionOnHover')) {
    html.find('.ocd-5e .profile').addClass('exhaustionOnHover');
  }

  if (game.settings.get('ocd-5e', 'inspirationOnHover')) {
    html.find('.ocd-5e .profile').addClass('inspirationOnHover');
  }
  if (game.settings.get('ocd-5e', 'traitsMovedBelowResource')) {
    const altPos = html.find('.alt-trait-pos');
    const traits = html.find('.traits');
    altPos.append(traits);
  }

  // Determine if we should show the show/hide Empty Traits button
  if (!game.settings.get('ocd-5e', 'traitsTogglePc')) {
    html.find('.ocd-5e .traits').addClass('always-visible');
  }

  // Always show the Special Traits configuration, regardless of traitsTogglePc
  if (game.settings.get('ocd-5e', 'traitsAlwaysShowSpecialButton')) {
    html.find('a.config-button.configure-flags').css({ display: 'inline-block' });
  }

  if (game.settings.get('ocd-5e', 'traitLabelsEnabled')) {
    html.find('.ocd-5e .traits').addClass('show-labels');
  }
  if (game.user.isGM) {
    html.find('.ocd-5e').addClass('isGM');
  }
  if (game.settings.get('ocd-5e', 'hiddenDeathSavesEnabled') && !game.user.isGM) {
    html.find('.ocd-5e .death-saves').addClass('gmOnly');
  }
  if (game.settings.get('ocd-5e', 'quantityAlwaysShownEnabled')) {
    html.find('.item').addClass('quantityAlwaysShownEnabled');
  }
  $('.info-card-hint .key').html(game.settings.get('ocd-5e', 'itemCardsFixKey'));
}
