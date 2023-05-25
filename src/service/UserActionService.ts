import Action from "./Action";

export class UserActionService  {
  init2(el: HTMLPristifyActionBoldElement): void {
    this.boldEl = el;
  }
  editor: HTMLDivElement;
  boldEl: HTMLPristifyActionBoldElement;
  actions: Map<string, Action> = new Map();

    add(action: Action,) {
     this.actions.set(action.getKey(), action);
    }


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

        const el:Selection = window.getSelection();

        var selection : Range = el.getRangeAt(0);

        const container : Node = selection.commonAncestorContainer;
        const parentNode : ParentNode = container.parentNode;

        const allChildres = parentNode.childNodes;
        console.log(container.parentElement,  parentNode.parentElement, container, allChildres)
        allChildres.forEach(element => {
          parentNode.parentNode.insertBefore(element, parentNode);
        });

        // parentNode.removeChild(container);
    }

    public mouseup() {

      this.actions.forEach(e => {
        e.inactive();
      })

      const el:Selection = window.getSelection();
      var selection = el.getRangeAt(0);
      const actionName = selection.commonAncestorContainer.parentNode.nodeName;
      const action: Action = this.actions.get(actionName);
      action.active();
    }

}

export default new UserActionService();
