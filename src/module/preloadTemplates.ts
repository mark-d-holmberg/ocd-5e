export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] = [
    // Add paths to "modules/ocd-5e/templates"
  ];

  return loadTemplates(templatePaths);
}
