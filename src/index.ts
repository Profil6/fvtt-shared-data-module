const testData = {
  name: "New Test Actor",
  type: "character",
  img: "artwork/character-profile.jpg",
};

function open() {
  const popup = new SharedDataPopup();
  Hooks.once("render" + popup.constructor.name, () => {
    //Test: Render an actor sheet for testData

    //@ts-ignore
    game.dnd5e.entities.Actor5e.create(testData, {
      temporary: true,
    }).then((actor: any) => {
      if (actor) {
        console.log("created actor5e", actor);
        popup.openActor(actor);
      }
    });
  });
  popup.render(true);
}

Hooks.once("init", async () => {});

Hooks.on("renderSceneControls", (controls: any, html: JQuery<HTMLElement>) => {
  const sharedDataButton = $(
    `
      <li class="scene-control sd-scene-control" data-control="shared-data" title="Shared Data Library">
          <i class="fas fa-atlas"></i>
      </li>
    `
  );

  html.append(sharedDataButton);

  sharedDataButton[0].addEventListener("click", (ev) => open());
});
