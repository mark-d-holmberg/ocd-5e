export const ocd5eListeners = function (html, actor) {
  console.log('ocd-5e | ocd5eListeners listening');

  // set input fields via editable elements
  html
    .find('[contenteditable]')
    .on('paste', function (e) {
      //strips elements added to the editable tag when pasting
      const $self = $(this);

      // set maxlength
      let maxlength = 40;
      if ($self[0].dataset.maxlength) {
        maxlength = parseInt($self[0].dataset.maxlength);
      }

      setTimeout(function () {
        let textString = $self.text();
        textString = textString.substring(0, maxlength);
        $self.html(textString);
      }, 0);
    })
    .on('keypress', function (e) {
      const $self = $(this);

      // set maxlength
      let maxlength = 40;
      if ($self[0].dataset.maxlength) {
        maxlength = parseInt($self[0].dataset.maxlength);
      }

      // only accept backspace, arrow keys and delete after maximum characters
      const keys = [8, 37, 38, 39, 40, 46];

      if ($(this).text().length === maxlength && keys.indexOf(e.keyCode) < 0) {
        e.preventDefault();
      }

      if (e.keyCode === 13) {
        $(this).blur();
      }
    });

  // submit on blur
  html.find('[contenteditable]').blur(async (event) => {
    const value = event.target.textContent;
    const target = event.target.dataset.target;
    html
      .find('input[type="hidden"][data-input="' + target + '"]')
      .val(value)
      .submit();
  });

  // actor size menu
  html.find('.actor-size-select .size-label').on('click', function () {
    const currentSize = $(this).data('size');
    $(this)
      .closest('ul')
      .toggleClass('active')
      .find('ul li[data-size="' + currentSize + '"]')
      .addClass('current');
  });
  html.find('.actor-size-select .size-list li').on('click', async (event) => {
    const value = event.target.dataset.size;
    actor.update({ 'data.traits.size': value });
    html.find('.actor-size-select').toggleClass('active');
  });

  // Modificator Ability Test Throw
  html.find('.ability-mod.rollable').click(async (event) => {
    event.preventDefault();
    const ability = event.currentTarget.parentElement.parentElement.dataset.ability;
    actor.rollAbilityTest(ability, { event: event });
  });

  // Modificator Ability Saving Throw
  html.find('.ability-save.rollable').click(async (event) => {
    event.preventDefault();
    const ability = event.currentTarget.parentElement.parentElement.dataset.ability;
    actor.rollAbilitySave(ability, { event: event });
  });

  // toggle item edit protection
  html.find('.toggle-allow-edit span').click(async (event) => {
    event.preventDefault();
    console.log('ocd-5e | .toggle-allow-edit span fired');

    if (actor.getFlag('ocd-5e', 'allow-edit')) {
      await actor.unsetFlag('ocd-5e', 'allow-edit');
    } else {
      await actor.setFlag('ocd-5e', 'allow-edit', true);
    }
  });
};
