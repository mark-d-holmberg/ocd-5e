export function registerSettings(): void {
  // Register any custom module settings here
}

export function settingsList() {
  // General Settings
  const MODULE_ID = 'ocd-5e';

  // Color Theme
  game.settings.register(`${MODULE_ID}`, 'colorScheme', {
    name: `${game.i18n.localize('OCD5E.Settings.SheetTheme.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.SheetTheme.hint'),
    scope: 'user',
    config: true,
    type: String,
    choices: {
      default: game.i18n.localize('OCD5E.Settings.SheetTheme.default'),
      dark: game.i18n.localize('OCD5E.Settings.SheetTheme.dark'),
    },
    default: 'default',
    onChange: (data) => {
      data === 'dark' ? document.body.classList.add('ocd5eDark') : document.body.classList.remove('ocd5eDark');
    },
  });

  const colorScheme = game.settings.get(`${MODULE_ID}`, 'colorScheme');
  if (colorScheme === 'dark') {
    document.body.classList.add('ocd5eDark');
  }

  // Classic Item Controls
  game.settings.register(`${MODULE_ID}`, 'classicControlsEnabled', {
    name: `${game.i18n.localize('OCD5E.Settings.ClassicControls.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.ClassicControls.hint'),
    scope: 'user',
    config: true,
    default: false,
    type: Boolean,
  });

  // Item Info Cards
  game.settings.register(`${MODULE_ID}`, 'itemCardsForAllItems', {
    name: `${game.i18n.localize('OCD5E.Settings.ItemCardsForAllItems.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.ItemCardsForAllItems.hint'),
    scope: 'user',
    config: true,
    default: true,
    type: Boolean,
  });

  game.settings.register(`${MODULE_ID}`, 'itemCardsForNpcs', {
    name: `${game.i18n.localize('OCD5E.Settings.ItemCardsForNpcs.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.ItemCardsForNpcs.hint'),
    scope: 'world',
    config: true,
    default: true,
    type: Boolean,
  });

  game.settings.register(`${MODULE_ID}`, 'itemCardsAreFloating', {
    name: `${game.i18n.localize('OCD5E.Settings.ItemCardsAreFloating.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.ItemCardsAreFloating.hint'),
    scope: 'user',
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(`${MODULE_ID}`, 'itemCardsDelay', {
    name: `${game.i18n.localize('OCD5E.Settings.ItemCardsDelay.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.ItemCardsDelay.hint'),
    scope: 'user',
    config: true,
    default: 300,
    type: Number,
  });

  game.settings.register(`${MODULE_ID}`, 'itemCardsFixKey', {
    name: `${game.i18n.localize('OCD5E.Settings.ItemCardsFixKey.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.ItemCardsFixKey.hint'),
    scope: 'world',
    config: false,
    default: 'x',
    type: String,
  });

  // Show Roll buttons in context Menu
  game.settings.register(`${MODULE_ID}`, 'contextRollButtons', {
    name: `${game.i18n.localize('OCD5E.Settings.RollButtonsToCard.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.RollButtonsToCard.hint'),
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });

  //Show trait labels
  game.settings.register(`${MODULE_ID}`, 'traitLabelsEnabled', {
    name: `${game.i18n.localize('OCD5E.Settings.TraitLabels.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.TraitLabels.hint'),
    scope: 'world',
    config: false,
    default: true,
    type: Boolean,
  });

  // Settings Menu

  // PC Sheet Settings
  game.settings.register(`${MODULE_ID}`, 'journalTabDisabled', {
    name: `${game.i18n.localize('OCD5E.Settings.JournalTab.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.JournalTab.hint'),
    scope: 'user',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(`${MODULE_ID}`, 'classListDisabled', {
    name: `${game.i18n.localize('OCD5E.Settings.ClassList.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.ClassList.hint'),
    scope: 'user',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(`${MODULE_ID}`, 'inspirationAnimationDisabled', {
    name: `${game.i18n.localize('OCD5E.Settings.InspirationAnimation.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.InspirationAnimation.hint'),
    scope: 'user',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(`${MODULE_ID}`, 'hideIfZero', {
    name: `${game.i18n.localize('OCD5E.Settings.HideIfZero.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.HideIfZero.hint'),
    scope: 'user',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(`${MODULE_ID}`, 'inspirationOnHover', {
    name: `${game.i18n.localize('OCD5E.Settings.InspirationOnHover.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.InspirationOnHover.hint'),
    scope: 'user',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(`${MODULE_ID}`, 'exhaustionOnHover', {
    name: `${game.i18n.localize('OCD5E.Settings.ExhaustionOnHover.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.ExhaustionOnHover.hint'),
    scope: 'user',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(`${MODULE_ID}`, 'hpBarDisabled', {
    name: `${game.i18n.localize('OCD5E.Settings.HpBar.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.HpBar.hint'),
    scope: 'user',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(`${MODULE_ID}`, 'hpOverlayDisabled', {
    name: `${game.i18n.localize('OCD5E.Settings.HpOverlay.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.HpOverlay.hint'),
    scope: 'user',
    config: false,
    default: false,
    type: Boolean,
  });

  // Show the Show/Hide empty traits button on the abilities sheet
  game.settings.register(`${MODULE_ID}`, 'traitsTogglePc', {
    name: `${game.i18n.localize('OCD5E.Settings.TraitsTogglePc.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.TraitsTogglePc.hint'),
    scope: 'user',
    config: false,
    default: false,
    type: Boolean,
  });

  // Always show Special Traits regardless of traitsTogglePc
  game.settings.register(`${MODULE_ID}`, 'traitsAlwaysShowSpecialButton', {
    name: `${game.i18n.localize('OCD5E.Settings.TraitsAlwaysShowSpecialButton.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.TraitsAlwaysShowSpecialButton.hint'),
    scope: 'user',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(`${MODULE_ID}`, 'traitsMovedBelowResource', {
    name: `${game.i18n.localize('OCD5E.Settings.TraitsMovedBelowResource.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.TraitsMovedBelowResource.hint'),
    scope: 'user',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(`${MODULE_ID}`, 'ammoEquippedOnly', {
    name: `${game.i18n.localize('OCD5E.Settings.AmmoEquippedOnly.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.AmmoEquippedOnly.hint'),
    scope: 'user',
    config: false,
    default: false,
    type: Boolean,
  });

  // NPC Sheet Settings

  game.settings.register(`${MODULE_ID}`, 'traitsMovedBelowResourceNpc', {
    name: `${game.i18n.localize('OCD5E.Settings.TraitsMovedBelowResource.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.TraitsMovedBelowResource.hint'),
    scope: 'user',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(`${MODULE_ID}`, 'hpBarDisabledNpc', {
    name: `${game.i18n.localize('OCD5E.Settings.HpBar.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.HpBar.hint'),
    scope: 'user',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(`${MODULE_ID}`, 'hpOverlayDisabledNpc', {
    name: `${game.i18n.localize('OCD5E.Settings.HpOverlay.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.HpOverlay.hint'),
    scope: 'user',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(`${MODULE_ID}`, 'traitsAlwaysShownNpc', {
    name: `${game.i18n.localize('OCD5E.Settings.TraitsAlwaysShown.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.TraitsAlwaysShown.hint'),
    scope: 'user',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(`${MODULE_ID}`, 'skillsAlwaysShownNpc', {
    name: `${game.i18n.localize('OCD5E.Settings.SkillsAlwaysShown.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.SkillsAlwaysShown.hint'),
    scope: 'user',
    config: false,
    default: false,
    type: Boolean,
  });

  // Vehicle Sheet Settings

  game.settings.register(`${MODULE_ID}`, 'hpBarDisabledVehicle', {
    name: `${game.i18n.localize('OCD5E.Settings.HpBar.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.HpBar.hint'),
    scope: 'user',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(`${MODULE_ID}`, 'hpOverlayDisabledVehicle', {
    name: `${game.i18n.localize('OCD5E.Settings.HpOverlay.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.HpOverlay.hint'),
    scope: 'user',
    config: false,
    default: false,
    type: Boolean,
  });

  //
  // GM Options
  //
  // Show Player Name
  game.settings.register(`${MODULE_ID}`, 'playerNameEnabled', {
    name: `${game.i18n.localize('OCD5E.Settings.PlayerName.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.PlayerName.hint'),
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });

  // Disable Right Click
  game.settings.register(`${MODULE_ID}`, 'rightClickDisabled', {
    name: `${game.i18n.localize('OCD5E.Settings.RightClick.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.RightClick.hint'),
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });

  // TODO: this is dumb. It shows the entire "owner view" minus the journal.
  // Expanded Sheet
  game.settings.register(`${MODULE_ID}`, 'expandedSheetEnabled', {
    name: `${game.i18n.localize('OCD5E.Settings.ExpandedSheet.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.ExpandedSheet.hint'),
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });

  // Portrait Settings
  // Portrait Style
  game.settings.register(`${MODULE_ID}`, 'portraitStyle', {
    name: `${game.i18n.localize('OCD5E.Settings.PortraitStyle.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.PortraitStyle.hint'),
    scope: 'world',
    config: false,
    type: String,
    choices: {
      default: game.i18n.localize('OCD5E.Settings.PortraitStyle.default'),
      pc: game.i18n.localize('OCD5E.Settings.PortraitStyle.pc'),
      npc: game.i18n.localize('OCD5E.Settings.PortraitStyle.npc'),
      all: game.i18n.localize('OCD5E.Settings.PortraitStyle.all'),
    },
    default: 'all',
    onChange: (data) => {
      if (data == 'npc' || data == 'all') {
        $('ocd-5e.ocd5e-npc .profile').addClass('roundPortrait');
        $('ocd-5e.ocd5e-vehicle .profile').addClass('roundPortrait');
      }
      if (data == 'pc' || data == 'all') {
        $('ocd-5e .profile').addClass('roundPortrait');
        $('ocd-5e.ocd5e-npc .profile').removeClass('roundPortrait');
        $('ocd-5e.ocd5e-vehicle .profile').removeClass('roundPortrait');
      }
      if (data == 'default') {
        $('ocd-5e .profile').removeClass('roundPortrait');
        $('ocd-5e.ocd5e-npc .profile').removeClass('roundPortrait');
        $('ocd-5e.ocd5e-vehicle .profile').removeClass('roundPortrait');
      }
    },
  });

  game.settings.register(`${MODULE_ID}`, 'hpOverlayBorder', {
    name: `${game.i18n.localize('OCD5E.Settings.HpOverlayBorder.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.HpOverlayBorder.hint'),
    scope: 'world',
    config: false,
    default: 0,
    type: Number,
    onChange: (data) => {
      $('.system-dnd5e')
        .get(0)
        .style.setProperty('--pc-border', game.settings.get(`${MODULE_ID}`, 'hpOverlayBorder') + 'px');
    },
  });

  game.settings.register(`${MODULE_ID}`, 'hpOverlayBorderNpc', {
    name: `${game.i18n.localize('OCD5E.Settings.HpOverlayBorder.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.HpOverlayBorder.hint'),
    scope: 'world',
    config: false,
    default: 0,
    type: Number,
    onChange: (data) => {
      $('.system-dnd5e')
        .get(0)
        .style.setProperty('--npc-border', game.settings.get(`${MODULE_ID}`, 'hpOverlayBorderNpc') + 'px');
    },
  });

  game.settings.register(`${MODULE_ID}`, 'hpOverlayBorderVehicle', {
    name: `${game.i18n.localize('OCD5E.Settings.HpOverlayBorder.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.HpOverlayBorder.hint'),
    scope: 'world',
    config: false,
    default: 0,
    type: Number,
    onChange: (data) => {
      $('.system-dnd5e')
        .get(0)
        .style.setProperty('--vehicle-border', game.settings.get(`${MODULE_ID}`, 'hpOverlayBorderVehicle') + 'px');
    },
  });

  // Total Edit Lock
  game.settings.register(`${MODULE_ID}`, 'editTotalLockEnabled', {
    name: `${game.i18n.localize('OCD5E.Settings.EditTotalLock.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.EditTotalLock.hint'),
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(`${MODULE_ID}`, 'editGmAlwaysEnabled', {
    name: `${game.i18n.localize('OCD5E.Settings.EditGmAlways.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.EditGmAlways.hint'),
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(`${MODULE_ID}`, 'editEffectsGmOnlyEnabled', {
    name: `${game.i18n.localize('OCD5E.Settings.EditEffectsGmOnly.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.EditEffectsGmOnly.hint'),
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });

  // Hidden Death Saves
  game.settings.register(`${MODULE_ID}`, 'hiddenDeathSavesEnabled', {
    name: `${game.i18n.localize('OCD5E.Settings.HiddenDeathSaves.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.HiddenDeathSaves.hint'),
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });

  // Item quantity
  game.settings.register(`${MODULE_ID}`, 'quantityAlwaysShownEnabled', {
    name: `${game.i18n.localize('OCD5E.Settings.QuantityAlwaysShown.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.QuantityAlwaysShown.hint'),
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });

  // Tracker Settings
  game.settings.register(`${MODULE_ID}`, 'exhaustionEffectsEnabled', {
    name: `${game.i18n.localize('OCD5E.Settings.ExhaustionEffects.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.ExhaustionEffects.hint'),
    scope: 'world',
    config: false,
    choices: {
      default: game.i18n.localize('OCD5E.Settings.ExhaustionEffects.default'),
      ocd5e: game.i18n.localize('OCD5E.Settings.ExhaustionEffects.default'),
      custom: game.i18n.localize('OCD5E.Settings.ExhaustionEffects.default'),
    },
    type: String,
    default: 'default',
  });

  game.settings.register(`${MODULE_ID}`, 'exhaustionEffectIcon', {
    name: `${game.i18n.localize('OCD5E.Settings.CustomExhaustionIcon.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.CustomExhaustionIcon.hint'),
    scope: 'world',
    config: false,
    type: String,
    default: 'modules/ocd-5e/images/exhaustion.svg',
  });

  game.settings.register(`${MODULE_ID}`, 'exhaustionEffectCustom', {
    name: `${game.i18n.localize('OCD5E.Settings.CustomExhaustionEffect.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.CustomExhaustionEffect.hint'),
    scope: 'world',
    config: false,
    default: 'Exhaustion',
    type: String,
  });

  game.settings.register(`${MODULE_ID}`, 'exhaustionEffectCustomTiers', {
    name: `${game.i18n.localize('OCD5E.Settings.CustomExhaustionEffect.tiers')}`,
    hint: game.i18n.localize('OCD5E.Settings.CustomExhaustionEffect.hint'),
    scope: 'world',
    config: false,
    default: 5,
    type: Number,
  });

  game.settings.register(`${MODULE_ID}`, 'exhaustionDisabled', {
    name: `${game.i18n.localize('OCD5E.Settings.ExhaustionDisabled.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.ExhaustionDisabled.hint'),
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(`${MODULE_ID}`, 'inspirationDisabled', {
    name: `${game.i18n.localize('OCD5E.Settings.InspirationDisabled.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.InspirationDisabled.hint'),
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });

  // NPC Resting
  game.settings.register(`${MODULE_ID}`, 'restingForNpcsEnabled', {
    name: `${game.i18n.localize('OCD5E.Settings.RestingForNpcs.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.RestingForNpcs.hint'),
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(`${MODULE_ID}`, 'restingForNpcsChatDisabled', {
    name: `${game.i18n.localize('OCD5E.Settings.RestingForNpcsChat.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.RestingForNpcsChat.hint'),
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });

  // Link Marker
  game.settings.register(`${MODULE_ID}`, 'linkMarkerNpc', {
    name: `${game.i18n.localize('OCD5E.Settings.LinkMarker.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.LinkMarker.hint'),
    scope: 'world',
    config: false,
    type: String,
    choices: {
      default: game.i18n.localize('OCD5E.Settings.LinkMarker.default'),
      unlinked: game.i18n.localize('OCD5E.Settings.LinkMarker.unlinked'),
      both: game.i18n.localize('OCD5E.Settings.LinkMarker.both'),
    },
    default: 'default',
  });

  // Show if item has active effects
  game.settings.register(`${MODULE_ID}`, 'activeEffectsMarker', {
    name: `${game.i18n.localize('OCD5E.Settings.ActiveEffectsMarker.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.ActiveEffectsMarker.hint'),
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });

  // Set default Tab for character actions list

  game.settings.register(`${MODULE_ID}`, 'defaultActionsTab', {
    name: `${game.i18n.localize('OCD5E.Settings.defaultActionsTab.name')}`,
    hint: game.i18n.localize('OCD5E.Settings.defaultActionsTab.hint'),
    scope: 'world',
    config: false,
    type: String,
    choices: {
      default: game.i18n.localize('OCD5E.Settings.defaultActionsTab.default'),
      attributes: game.i18n.localize('OCD5E.Settings.defaultActionsTab.attributes'),
    },
    default: 'default',
  });

  // Default width for player sheet

  game.settings.register(`${MODULE_ID}`, 'playerSheetWidth', {
    name: `${game.i18n.localize('OCD5E.Settings.playerSheetWidth')}`,
    scope: 'user',
    config: false,
    type: Number,
    default: 740,
  });

  // Default width for NPC sheet

  game.settings.register(`${MODULE_ID}`, 'npsSheetWidth', {
    name: `${game.i18n.localize('OCD5E.Settings.npsSheetWidth')}`,
    scope: 'user',
    config: false,
    type: Number,
    default: 740,
  });

  // Default width for vehicle sheet

  game.settings.register(`${MODULE_ID}`, 'vehicleSheetWidth', {
    name: `${game.i18n.localize('OCD5E.Settings.vehicleSheetWidth')}`,
    scope: 'user',
    config: false,
    type: Number,
    default: 740,
  });
}
