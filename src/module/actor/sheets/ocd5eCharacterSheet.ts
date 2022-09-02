import ActorSheet5eCharacter from '/Users/markholmberg/Library/Application Support/FoundryVTT/Data/systems/dnd5e/module/actor/sheets/character.js';
import { ocd5eListeners } from '../../app/listeners';
import { ocd5eContextMenu } from '../../app/contextMenu';
import { ocd5eSearchFilter } from '../../app/searchFilter';
import { ocd5eShowActorArt } from '../../app/showActorArt';
import { ocd5eItemCard } from '../../app/itemCard';
import { ocd5eAmmoSwitch } from '../../app/ammoSwitch';
import { ocd5eItemCard } from '../../app/itemCard';

export class Ocd5eCharacterSheet extends ActorSheet5eCharacter {
  get template() {
    if (!game.user.isGM && this.actor.limited && !game.settings.get('ocd-5e', 'expandedSheetEnabled'))
      return 'modules/ocd-5e/templates/actors/ocd5e-character-sheet-ltd.html';
    return 'modules/ocd-5e/templates/actors/ocd5e-character-sheet.html';
  }

  static get defaultOptions() {
    let defaultTab = game.settings.get('ocd-5e', 'defaultActionsTab') != 'default' ? 'attributes' : 'actions';
    if (!game.modules.get('character-actions-list-5e')?.active) defaultTab = 'description';

    return mergeObject(super.defaultOptions, {
      classes: ['ocd5e', 'sheet', 'actor', 'character'],
      blockFavTab: true,
      width: game.settings.get('ocd-5e', 'playerSheetWidth') ?? 740,
      height: 840,
      tabs: [{ navSelector: '.tabs', contentSelector: '.sheet-body', initial: defaultTab }],
    });
  }

  getData() {
    const data = super.getData();

    // Set the abbreviations for the abilities
    Object.keys(data.data.abilities).forEach((id) => {
      const Id = id.charAt(0).toUpperCase() + id.slice(1);
      data.data.abilities[id].abbr = game.i18n.localize(`DND5E.Ability${Id}Abbr`);
    });

    if (isObjectEmpty(data.senses)) {
      data.hasSenses = false;
    } else {
      data.hasSenses = true;
    }

    // Store the Sheet.appId in data.appId
    data.appId = this.appId;

    return data;
  }

  // TODO: what do you do?
  _createEditor(target, editorOptions, initialContent) {
    console.log('ocd-5e | _createEditor fired');
    editorOptions.min_height = 200;
    super._createEditor(target, editorOptions, initialContent);
  }

  // TODO: what do you do?
  // save all simultaneously open editor field when one field is saved
  async _onEditorSave(target, element, content) {
    console.log('ocd-5e | _onEditorSave fired');
    return this.submit();
  }

  // add actions module
  async _renderInner(...args) {
    console.log('ocd-5e | _renderInner fired');
    const html = await super._renderInner(...args);
    const actionsListApi = game.modules.get('character-actions-list-5e')?.api;
    let injectCharacterSheet;
    if (game.modules.get('character-actions-list-5e')?.active)
      injectCharacterSheet = game.settings.get('character-actions-list-5e', 'inject-characters');

    try {
      if (game.modules.get('character-actions-list-5e')?.active && injectCharacterSheet) {
        // Update the nav menu
        const actionsTabButton = $(
          '<a class="item" data-tab="actions">' + game.i18n.localize(`DND5E.ActionPl`) + '</a>',
        );
        const tabs = html.find('.tabs[data-group="primary"]');
        tabs.prepend(actionsTabButton);

        // Create the tab
        const sheetBody = html.find('.sheet-body');
        const actionsTab = $(`<div class="tab actions" data-group="primary" data-tab="actions"></div>`);
        const actionsLayout = $(`<div class="list-layout"></div>`);
        actionsTab.append(actionsLayout);
        sheetBody.prepend(actionsTab);

        const actionsTabHtml = $(
          await actionsListApi.renderActionsList(this.actor, { rollIcon: '<i class="fa fa-dice-d20"></i>' }),
        );
        actionsLayout.html(actionsTabHtml);
      }
    } catch (e) {
      // log(true, e);
    }

    return html;
  }

  async activateListeners(html) {
    console.log('ocd-5e | Activate Listeners');

    const actor = this.actor;
    let position = 0;

    ocd5eListeners(html, actor);
    ocd5eContextMenu(html);
    ocd5eSearchFilter(html, actor);
    ocd5eShowActorArt(html, actor);
    await ocd5eItemCard(html, actor);
    ocd5eAmmoSwitch(html, actor);

    // store Scroll Pos
    const attributesTab = html.find('.tab.attributes');
    attributesTab.scroll(function () {
      position = this.scrollPos = { top: attributesTab.scrollTop() };
    });
    const tabNav = html.find('a.item:not([data-tab="attributes"])');
    tabNav.click(function () {
      this.scrollPos = { top: 0 };
      attributesTab.scrollTop(0);
    });

    // toggle inventory layout
    html.find('.toggle-layout.inventory-layout').click(async (event) => {
      event.preventDefault();

      if ($(event.currentTarget).hasClass('spellbook-layout')) {
        if (actor.getFlag('ocd-5e', 'spellbook-grid')) {
          await actor.unsetFlag('ocd-5e', 'spellbook-grid');
        } else {
          await actor.setFlag('ocd-5e', 'spellbook-grid', true);
        }
      } else {
        if (actor.getFlag('ocd-5e', 'inventory-grid')) {
          await actor.unsetFlag('ocd-5e', 'inventory-grid');
        } else {
          await actor.setFlag('ocd-5e', 'inventory-grid', true);
        }
      }
    });

    // set exhaustion level with portrait icon
    html.find('.exhaust-level li').click(async (event) => {
      event.preventDefault();
      const target = event.currentTarget;
      const value = Number(target.dataset.elvl);
      const data = actor.data.data;
      await actor.update({ 'data.attributes.exhaustion': value });
    });

    // allow collapsing the inventory list sections
    $("li[data-toggle='toggle-header']").click((event) => {
      $(event.currentTarget).next("ul.item-list[data-toggle='collapse']").toggle();
    });

    // changing item qty and charges values (removing if both value and max are 0)
    html.find('.item:not(.items-header) input').change((event) => {
      const value = event.target.value;
      const itemId = $(event.target).parents('.item')[0].dataset.itemId;
      const path = event.target.dataset.path;
      const data = {};
      data[path] = Number(event.target.value);
      actor.items.get(itemId).update(data);
    });

    // creating charges for the item
    html.find('.inventory-list .item .addCharges').click((event) => {
      const itemId = $(event.target).parents('.item')[0].dataset.itemId;
      const item = actor.items.get(itemId);

      item.data.uses = { value: 1, max: 1 };
      const data = {};
      data['data.uses.value'] = 1;
      data['data.uses.max'] = 1;

      actor.items.get(itemId).update(data);
    });

    // toggle empty traits visibility in the traits list
    html.find('.traits .toggle-traits').click(async (event) => {
      console.log('ocd-5e | .traits .toggle-traits: traitsExpanded');
      if (actor.getFlag('ocd-5e', 'traitsExpanded')) {
        await actor.unsetFlag('ocd-5e', 'traitsExpanded');
      } else {
        await actor.setFlag('ocd-5e', 'traitsExpanded', true);
      }
    });

    // NOTE: i think this should be deprecated.
    // toggle traits
    // html.find('.toggle-traits').click(async (event) => {
    //   console.log("ocd-5e | toggle-traits: traits-compressed");
    //   event.preventDefault();

    //   if (actor.getFlag('ocd-5e', 'traits-compressed')) {
    //     await actor.unsetFlag('ocd-5e', 'traits-compressed');
    //   } else {
    //     await actor.setFlag('ocd-5e', 'traits-compressed', true);
    //   }
    // });

    // update item attunement

    html.find('.item-control.item-attunement').click(async (event) => {
      event.preventDefault();
      const li = $(event.currentTarget).closest('.item'),
        item = actor.items.get(li.data('item-id')),
        count = actor.data.data.attributes.attunement.value;

      if (item.data.data.attunement == 2) {
        actor.items.get(li.data('item-id')).update({ 'data.attunement': 1 });
      } else {
        if (count >= actor.data.data.attributes.attunement.max) {
          ui.notifications.warn(`${game.i18n.format('OCD5E.AttunementWarning', { number: count })}`);
        } else {
          actor.items.get(li.data('item-id')).update({ 'data.attunement': 2 });
        }
      }
    });
    // Do our stuff first, then this!
    super.activateListeners(html);
  }
}
