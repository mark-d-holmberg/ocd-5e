export class OcdSettingsConfig extends SettingsConfig {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      title: game.i18n.localize('SETTINGS.Title'),
      id: 'client-settings',
      template: 'modules/ocd-5e/templates/sidebar/apps/settings-config.html',
      width: 600,
      height: 'auto',
      tabs: [{ navSelector: '.tabs', contentSelector: '.content', initial: 'core' }],
    });
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Collapse/Expand the child element and update the app position
    html.find('h2.module-header.module-header-collapse i.hamburger-hide').click((event) => {
      $(event.target).parent('h2').next('.module-child-section').toggle();
      game.settings.sheet.setPosition();
    });
  }
}
