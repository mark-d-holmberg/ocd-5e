/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your module, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 * 					you may want to put a (link to a) license or copyright
 * 					notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 * 					 determines how others may use and modify your module.
 */

// Import TypeScript modules
import { registerSettings } from './settings';
import { preloadTemplates } from './preloadTemplates';
import { Ocd5eUserSettings } from './userSettings';
import { Ocd5eCharacterSheet } from './actor/sheets/ocd5eCharacterSheet';
import { Ocd5eItemSheet } from './ocd5eItemSheet';
import * as CharacterSheetHooks from './app/characterSheetHooks';
import { addFavorites } from './app/favorites';

// $(temp1.currentTarget).next("ul.item-list").show();

// Initialize module
Hooks.once('init', async () => {
  console.log('ocd-5e | Initializing ocd-5e');

  // Assign custom classes and constants here
  Ocd5eUserSettings.init();

  // Register custom module settings
  registerSettings();

  // Register Ocd5e Sheet and make default character sheet
  Actors.registerSheet('dnd5e', Ocd5eCharacterSheet, {
    types: ['character'],
    makeDefault: true,
  });

  // Register Ocd5e Item Sheet and make default
  Items.registerSheet('dnd5e', Ocd5eItemSheet, { makeDefault: true });

  // Preload Handlebars templates
  await preloadTemplates();

  // Register custom sheets (if any)
});

// Setup module
Hooks.once('setup', async () => {
  // Do anything after initialization but before
  // ready
});

// When ready
Hooks.once('ready', async () => {
  // Do anything once the module is ready
});

// Add any additional hooks if necessary

Hooks.on('renderOcd5eCharacterSheet', async (app, html, data) => {
  console.log('odc-5e | Hooks.renderOcd5eCharacterSheet fired');
  const position = 0;

  CharacterSheetHooks.setSheetClasses(app, html, data);
  CharacterSheetHooks.editProtection(app, html, data);
  CharacterSheetHooks.addClassList(app, html, data);
  CharacterSheetHooks.toggleTraitsList(app, html, data);
  CharacterSheetHooks.checkDeathSaveStatus(app, html, data);
  CharacterSheetHooks.abbreviateCurrency(app, html, data);
  CharacterSheetHooks.spellAttackMod(app, html, data);
  await addFavorites(app, html, data, position);
  CharacterSheetHooks.countAttunedItems(app, html, data);
  CharacterSheetHooks.countInventoryItems(app, html, data);
  CharacterSheetHooks.markActiveEffects(app, html, data);
});

Hooks.on('renderOcd5eUserSettings', () => {
  console.log('ocd-5e | renderOcd5eUserSettings');
  if (!game.user.isGM) {
    document.querySelectorAll('.ocd5e.settings .gm-only').forEach(function (el) {
      el.remove();
    });
  }
});

Hooks.on('renderOcd5eItemSheet', (app, html, data) => {
  addEditorHeadline(app, html, data);
});

async function addEditorHeadline(app, html, data) {
  html
    .find('.tab[data-tab=description] .editor')
    .prepend(`<h2 class="details-headline">${game.i18n.localize('OCD5E.ItemDetailsHeadline')}</h2>`);
}
