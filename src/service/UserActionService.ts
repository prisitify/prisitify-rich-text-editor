
export class UserActionService  {
    editor: HTMLDivElement;

    init(myEditor: HTMLDivElement){
       this.editor = myEditor;
    }

    public bold () {

        const h1 = document.createElement("h1") as HTMLHeadingElement;
        h1.textContent = "hello world";

        const el:Selection = window.getSelection();
        // console.log(el.basNode);

        // el.focusNode.appendChild(h1);
        var selection = el.getRangeAt(0);
        var selectedText = selection.extractContents();
        // console.log(selectedText);

        var span = document.createElement("strong");
        span.appendChild(selectedText);
        selection.insertNode(span);


    }

    public italic () {

      const h1 = document.createElement("h1") as HTMLHeadingElement;
      h1.textContent = "hello world";

      const el:Selection = window.getSelection();
      // console.log(el.basNode);

      // el.focusNode.appendChild(h1);
      var selection = el.getRangeAt(0);
      var selectedText = selection.extractContents();
      // console.log(selectedText);

      var span = document.createElement("i");
      span.appendChild(selectedText);
      selection.insertNode(span);


  }

    public removeBold () {

        // const h1 = document.createElement("h1") as HTMLHeadingElement;
        // h1.textContent = "hello world";

        const el:Selection = window.getSelection();
        // // console.log(el.basNode);

        // // el.focusNode.appendChild(h1);
        var selection = el.getRangeAt(0);
        console.log(selection);

        // var selectedText = selection.extractContents();
        // console.log(selectedText);

        // var span = document.createElement("strong");
        // span.appendChild(selectedText);
        // selection.insertNode(span);
        var strongElement = document.createElement("h1");
        el.getRangeAt(0).surroundContents(strongElement)
    }

}

export default new UserActionService();
