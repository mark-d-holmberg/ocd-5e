export const ocd5eShowActorArt = function (html, actor) {
  const portrait = html.find('.portrait'),
    portraitMenu = html.find('.portrait-menu'),
    portraitButton = html.find('.showActorArt');

  portrait.mousedown(async (e) => {
    switch (e.which) {
      case 3:
        portraitMenu.toggleClass('hidden');
        break;
    }
  });

  portraitButton.click(function (e) {
    e.preventDefault();
    portraitMenu.addClass('hidden');
    const id = $(this).attr('id'),
      portraitImg = actor.data.img,
      tokenImg = actor.data.token.img;
    if (id == 'showPortrait') {
      new ImagePopout(portraitImg, {
        title: 'Portrait: ' + actor.name,
        shareable: true,
        uuid: actor.uuid,
      }).render(true);
    } else {
      new ImagePopout(tokenImg, {
        title: 'Token: ' + actor.name,
        shareable: true,
        uuid: actor.uuid,
      }).render(true);
    }
  });
};
