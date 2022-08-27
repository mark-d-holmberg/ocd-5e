// import ItemSheet5e from "../../../systems/dnd5e/module/item/sheet";
import ItemSheet5e from '/Users/markholmberg/Library/Application Support/FoundryVTT/Data/systems/dnd5e/module/item/sheet.js';

export class Ocd5eItemSheet extends ItemSheet5e {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['ocd5e', 'dnd5ebak', 'sheet', 'item'],
    });
  }
}
