class SharedDataPopup extends Application {
  constructor() {
    super({
      title: "Shared Data",
      id: "shared-data-popup",
      template: "modules/shared-data/assets/popupTemplate.html",
      popOut: true,
      resizable: true,
      width: 500,
      height: 500,
    });
  }

  //Test: render an actor as an actor sheet inside popup
  openActor(actor: any) {
    //@ts-ignore
    const sheet = new game.dnd5e.applications.ActorSheet5eNPC(actor, {
      popOut: false,
      submitOnChange: true,
      editable: true,
    });

    Hooks.once(
      "renderActorSheet",
      (app: ActorSheet, actorSheetElement: JQuery<HTMLElement>) => {
        if (sheet.appId == app.appId) {
          const editorElement = this.element.find(".shared-data-editor");
          editorElement.empty();
          editorElement.append(actorSheetElement);

          actorSheetElement.on("submit", async (event) => {
            console.log(app.getData());
          });
        }
      }
    );
    sheet.render(true);
  }
}
