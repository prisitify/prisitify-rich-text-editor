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
        const el:Selection = window.getSelection();
        if(el.anchorOffset == el.focusOffset){
            return;
        }
        // console.log(el.basNode);

        // el.focusNode.appendChild(h1);
        var selection = el.getRangeAt(0);
        var selectedText = selection.extractContents();
        // console.log(selectedText);

        var span = document.createElement("strong");
        span.appendChild(selectedText);
        selection.insertNode(span);

        console.log(document.activeElement);
         
        ;
        // document.getSelection().empty();

    }

    public italic () {

      const el:Selection = window.getSelection();

      if(el.anchorOffset == el.focusOffset){
        return;
    }
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

        var evt = new MouseEvent("mouseup", {
            view: window,
            bubbles: true,
            cancelable: true
            /* whatever properties you want to give it */
        });
        
        const el:Selection = document.getSelection();

        console.log(el);
        
        
        
        if(el.anchorOffset == el.focusOffset){
            return;
        }

        var selection : Range = el.getRangeAt(0);
        
        const container : Node = selection.commonAncestorContainer;
        const parentNode : HTMLElement = container.parentElement;

        const allChildres = parentNode.childNodes;
        console.log(el, container, parentNode);
        const childs: Node[] =[];
        allChildres.forEach(element => {
            childs.push(element);
        });


        parentNode.replaceWith(...childs);
       

        // parent.removeChild(parentNode);
    }

    public mouseup() {
        const el:Selection = window.getSelection();
        if(el.anchorOffset == el.focusOffset){
            return;
        }

        this.actions.forEach(e => {
            e.inactive();
        })
        var selection = el.getRangeAt(0);
        const actionName = selection.commonAncestorContainer.parentNode.nodeName;
        const action: Action = this.actions.get(actionName);
        
        if(action){
            action.active();
        }
      
    }

}

export default new UserActionService();
