import Action from "./Action";
import { getElement } from '@stencil/core';

export class UserActionService {
  init2(el: HTMLPristifyActionBoldElement): void {
    this.boldEl = el;
  }
  editor: HTMLDivElement;
  boldEl: HTMLPristifyActionBoldElement;
  actions: Map<string, Action> = new Map();

  add(action: Action,) {
    this.actions.set(action.getKey(), action);
  }


  init(myEditor: HTMLDivElement) {
    this.editor = myEditor;
  }

  public bold() {
    const el: Selection = window.getSelection();
    if (el.anchorOffset == el.focusOffset) {
      return;
    }





    console.log(el);
    var selection = el.getRangeAt(0);
    var strong = document.createElement("strong");



    selection.surroundContents(strong);
    strong.getRootNode().normalize();
    selection.setStart(strong.firstChild, 0);
    selection.setEnd(strong.lastChild, strong.lastChild.textContent.length);



  }



  public removeBold() {

    const el: Selection = document.getSelection();

    if (el.anchorOffset == el.focusOffset) {
      return;
    }

    console.log(el);

    var selection: Range = el.getRangeAt(0);
    const jq = globalThis.$;

    console.log(el);

    // if(selection.commonAncestorContainer.nodeName === "STRONG") {
    //   const selected = selection.commonAncestorContainer;
    //   const childs = selected.childNodes;
    //   jq(childs).unwrap();
    //   el.setPosition(selected);
    // }
    // else {
      const selected = selection.commonAncestorContainer;
      jq(selected).unwrap();

    //

      el.selectAllChildren(selection.commonAncestorContainer.childNodes[0]);
    // }




    // el.selectAllChildren(selection.commonAncestorContainer);

    // const container : Node = selection.commonAncestorContainer;
    // const parentNode : HTMLElement = container.parentElement;

    // const allChildres = parentNode.childNodes;
    // console.log(el, container, parentNode);
    // const childs: Node[] =[];
    // allChildres.forEach(element => {
    //     childs.push(element);
    // });


    // parentNode.replaceWith(...childs);


    // parent.removeChild(parentNode);


    selected.getRootNode().normalize();
  }

  public mouseup() {
    const el: Selection = window.getSelection();
    if (el.anchorOffset == el.focusOffset) {
      return;
    }



    this.actions.forEach(e => {
      e.inactive();
    })


    var selection = el.getRangeAt(0);

    console.log(el, selection);

    const actionName = selection.commonAncestorContainer.parentNode.nodeName;
    const action: Action = this.actions.get(actionName);

    if (action) {
      action.active();
    }

  }


  public italic() {

    const el: Selection = window.getSelection();

    if (el.anchorOffset == el.focusOffset) {
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

}

export default new UserActionService();
