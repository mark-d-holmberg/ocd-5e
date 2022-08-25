import { settingsList } from './settings';

export class Ocd5eUserSettings extends FormApplication {
  static init() {
    game.settings.registerMenu('ocd-5e', 'userMenu', {
      name: '',
      label: game.i18n.localize('OCD5E.Settings.SheetMenu.label'),
      icon: 'fas fa-cog',
      type: Ocd5eUserSettings,
      restricted: false,
    });

    settingsList();
  }

  // settings template
  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      template: 'modules/ocd-5e/templates/settings.html',
      height: 500,
      title: game.i18n.localize('OCD5E.Settings.SheetMenu.title'),
      width: 600,
      classes: ['ocd5e', 'settings'],
      tabs: [
        {
          navSelector: '.tabs',
          contentSelector: 'form',
          initial: 'Players',
        },
      ],
      submitOnClose: true,
    };
  }

  constructor(object = {}, options) {
    super(object, options);
  }

  _getHeaderButtons() {
    const btns = super._getHeaderButtons();
    btns[0].label = 'Close';
    return btns;
  }

  getSettingsData() {
    const settings = [
      'ammoEquippedOnly',
      'activeEffectsMarker',
      'classListDisabled',
      'contextRollButtons',
      'defaultActionsTab',
      'editGmAlwaysEnabled',
      'editEffectsGmOnlyEnabled',
      'editTotalLockEnabled',
      'exhaustionEffectsEnabled',
      'exhaustionEffectIcon',
      'exhaustionEffectCustom',
      'exhaustionEffectCustomTiers',
      'exhaustionOnHover',
      'exhaustionDisabled',
      'expandedSheetEnabled',
      'hideIfZero',
      'hiddenDeathSavesEnabled',
      'hpBarDisabled',
      'hpBarDisabledNpc',
      'hpBarDisabledVehicle',
      'hpOverlayDisabled',
      'hpOverlayDisabledNpc',
      'hpOverlayDisabledVehicle',
      'hpOverlayBorder',
      'hpOverlayBorderNpc',
      'hpOverlayBorderVehicle',
      'inspirationAnimationDisabled',
      'inspirationDisabled',
      'inspirationOnHover',
      'itemCardsAreFloating',
      'itemCardsDelay',
      'itemCardsFixKey',
      'itemCardsForAllItems',
      'journalTabDisabled',
      'linkMarkerNpc',

      'playerNameEnabled',
      'portraitStyle',
      'quantityAlwaysShownEnabled',
      'restingForNpcsEnabled',
      'restingForNpcsChatDisabled',
      'rightClickDisabled',
      'skillsAlwaysShownNpc',

      'playerSheetWidth',
      'npsSheetWidth',
      'vehicleSheetWidth',

      'traitLabelsEnabled',
      'traitsAlwaysShownNpc',
      'traitsMovedBelowResource',
      'traitsMovedBelowResourceNpc',
      'traitsAlwaysShowSpecialButton',
      'traitsTogglePc',
    ];

    const data = {};
    settings.forEach((setting) => {
      data[setting] = { value: game.settings.get('ocd-5e', setting) };
    });
    return data;
  }

  getData() {
    const data = super.getData();
    data.settings = this.getSettingsData();
    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);

    const exhaustionEffectSelect = html.find('select#exhaustionEffectsEnabled');
    const exhaustionSelected = $(exhaustionEffectSelect).val();
    switch (exhaustionSelected) {
      case 'default':
        html.find('input#exhaustionEffectIcon').closest('.setting').hide();
        html.find('input#exhaustionEffectCustom').closest('.setting').hide();
        break;
      case 'ocd5e':
        html.find('input#exhaustionEffectCustom').closest('.setting').hide();
        break;
      case 'custom':
        html.find('input#exhaustionEffectIcon').closest('.setting').hide();
        break;
    }

    exhaustionEffectSelect.on('change', function (e) {
      html.find('input#exhaustionEffectIcon').closest('.setting').hide();
      html.find('input#exhaustionEffectCustom').closest('.setting').hide();

      const value = e.target.value;
      if (value == 'ocd5e') {
        html.find('input#exhaustionEffectIcon').closest('.setting').show();
      } else if (value == 'custom') {
        html.find('input#exhaustionEffectCustom').closest('.setting').show();
      }
    });

    html.find('input#exhaustionEffectIcon').on('change', function (e) {
      if (e.target.value == '' || e.target.value == null) {
        e.target.value = 'modules/ocd-5e/images/exhaustion.svg';
      }
    });
  }

  redrawOpenSheets() {
    game.actors.filter((a) => a.sheet.rendered).forEach((a) => a.sheet.render(true));
  }

  _updateObject(ev, formData) {
    const data = expandObject(formData);
    let settingsUpdated = false;
    for (const key in data) {
      const oldSetting = game.settings.get('ocd-5e', key);
      const newSetting = data[key];
      if (oldSetting == newSetting) continue;
      game.settings.set('ocd-5e', key, data[key]);
      settingsUpdated = true;
    }

    if (settingsUpdated) {
      this.redrawOpenSheets();
    }
  }
}
