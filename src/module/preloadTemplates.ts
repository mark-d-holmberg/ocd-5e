export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] = [
    // Add paths to "modules/ocd-5e/templates"
    `modules/ocd-5e/templates/item-info-card.html`,
    `modules/ocd-5e/templates/actors/ocd5e-character-sheet.html`,
    `modules/ocd-5e/templates/actors/parts/ocd5e-biography.html`,
    `modules/ocd-5e/templates/actors/parts/ocd5e-effects.html`,
    `modules/ocd-5e/templates/actors/parts/ocd5e-features.html`,
    `modules/ocd-5e/templates/actors/parts/ocd5e-inventory-footer.html`,
    `modules/ocd-5e/templates/actors/parts/ocd5e-inventory-grid.html`,
    `modules/ocd-5e/templates/actors/parts/ocd5e-inventory-header.html`,
    `modules/ocd-5e/templates/actors/parts/ocd5e-inventory.html`,
    `modules/ocd-5e/templates/actors/parts/ocd5e-journal.html`,
    `modules/ocd-5e/templates/actors/parts/ocd5e-npc-spellbook.html`,
    `modules/ocd-5e/templates/actors/parts/ocd5e-skills.html`,
    `modules/ocd-5e/templates/actors/parts/ocd5e-spellbook-footer.html`,
    `modules/ocd-5e/templates/actors/parts/ocd5e-spellbook-grid.html`,
    `modules/ocd-5e/templates/actors/parts/ocd5e-spellbook-header.html`,
    `modules/ocd-5e/templates/actors/parts/ocd5e-spellbook.html`,
    `modules/ocd-5e/templates/actors/parts/ocd5e-traits.html`,
  ];

  return loadTemplates(templatePaths);
}
