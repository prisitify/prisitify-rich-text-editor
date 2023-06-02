
import { log } from "console";
import Action from "./Action";

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
    const wrapFn = () => { return document.createElement("strong"); }
    this.wrap(wrapFn);
  }


  public italic() {
    const wrapper = () => { return document.createElement('i') };
    this.wrap(wrapper);
  }

  underline() {
    const wrapper = () => { return document.createElement('u') };
    this.wrap(wrapper);
  }

  strikethrough() {
    const wrapper = () => { return document.createElement('s') };
    this.wrap(wrapper);
  }

  removeBold() {
    this.unwrapSelection("STRONG");
  }


  removeItalic() {
    this.unwrapSelection("I");
  }

  removeUnderline() {
    this.unwrapSelection("U");
  }

  removeStrikethrough() {
    this.unwrapSelection("S");
  }











  public rangesIntersect(rangeA, rangeB) {
    return rangeA.compareBoundaryPoints(Range.END_TO_START, rangeB) === -1 &&
      rangeA.compareBoundaryPoints(Range.START_TO_END, rangeB) === 1
  }

  // create and return a range that selects `node`
  public createRangeFromNode(node) {
    var range = node.ownerDocument.createRange()
    try {
      range.selectNode(node)
    } catch (e) {
      range.selectNodeContents(node)
    }
    return range
  }

  // return true if `node` is fully or partially selected by `range`
  public rangeIntersectsNode(range, node) {
    if (range.intersectsNode) {
      return range.intersectsNode(node);
    } else {
      return this.rangesIntersect(range, this.createRangeFromNode(node));
    }
  }

  public getRangeTextNodes(range) {
    var container = range.commonAncestorContainer
      , nodes = this.getTextNodes(container.parentNode || container)

    return nodes.filter((node) => {
      return this.rangeIntersectsNode(range, node) && this.isNonEmptyTextNode(node)
    })
  }

  public getTextNodes(el) {
    el = el || document.body

    var doc = el.ownerDocument || document
      , walker = doc.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false)
      , textNodes = []
      , node

    while (node = walker.nextNode()) {
      textNodes.push(node)
    }
    return textNodes
  }

  public isNonEmptyTextNode(node) {
    return node.textContent.length > 0
  }



  private unwrapSelection(type: string) {
    const el: Selection = document.getSelection();

    if (el.anchorOffset == el.focusOffset) {
      return;
    }



    var range = el.getRangeAt(0);
    console.log("range", range);
    console.log("range", range.commonAncestorContainer.parentNode.nodeName);

    if(range.commonAncestorContainer.parentNode.nodeName === type) {
      console.log(range.commonAncestorContainer.textContent);
      const span = document.createElement('SPAN')
      range.surroundContents(span);
      span.insertAdjacentHTML('beforebegin' , '</i>')

      console.log(span.previousSibling);
      console.log(span.nextSibling);
      console.log(range.commonAncestorContainer);


      // this.wrap();
      // this.wrap(span.previousSibling);
      // span.insertAdjacentHTML('afterend' , '<i>')
      range.commonAncestorContainer.parentNode.normalize();


    }else {
      const allTextNodes = this.getRangeTextNodes(range);
      allTextNodes.forEach(nodeText => {
        const parentNames = [];
        this.getParentOne(nodeText, parentNames)
        parentNames.forEach((node) => {
          this.unwrap(node, type);
        })

      });
    }


  }

  public mouseup() {
    this.actions.forEach(e => {
      e.inactive();
    })
    const el: Selection = window.getSelection();
    if (el.anchorOffset == el.focusOffset) {
      return;
    }



    var range = el.getRangeAt(0);


    const allTextNodes = this.getRangeTextNodes(range);

    allTextNodes.forEach(nodeText => {
      const parentNames = [];
      this.getParentOne(nodeText, parentNames)

      parentNames.forEach(node => {

        this.actions.get(node.nodeName)?.active();

      });
    });




  }

  public getParentOne(node: Node, parents: Array<Node>) {
    if (node?.parentElement?.hasChildNodes()) {
      parents.push(node?.parentNode);
      if (node.parentElement.getAttribute("class") !== "pristify-editor-content") {
        return this.getParentOne(node?.parentNode, parents);
      }
    }
    return null;
  }



  //APIiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
  public surroundNode(node, nodeRange, wrapper) {
    let ok = false;
    // if(node.parentNode.childNodes.length == 1) {
    //     if(node.parentNode.nodeName === "STRONG") {
    //         this.createRangeFromNode(node.parentNode).surroundContents(wrapper);
    //         ok = true;
    //     }
    // }

    if (!ok) {
      nodeRange.surroundContents(wrapper);
    }


  }

  wrap(wrapperTypeFn) {
    const selected: Selection = window.getSelection();
    if (selected.anchorOffset == selected.focusOffset) {
      return;
    }

    var range: Range = selected.getRangeAt(0);
    const nodes = this.getRangeTextNodes(range);

    let startNode = range.startContainer;
    let endNode = range.endContainer;
    let startOffset = range.startOffset;
    let endOffset = range.endOffset;


    nodes.forEach((node) => {
      const nodeRange = this.createRangeFromNode(node);
      const wrapper = wrapperTypeFn();

      if (this.rangesIntersect(range, nodeRange) && node.textContent.length > 0) {

        if (node === startNode) {
          console.log("start");
          nodeRange.setStart(node, startOffset);
        }
        if (node === endNode) {
          console.log("end");
          nodeRange.setEnd(node, endOffset);

        }


        if (node.parentNode.nodeName !== wrapper.nodeName) {
          // nodeRange.surroundContents(wrapper);
          this.surroundNode(node, nodeRange, wrapper)
          if (endNode === startNode) {
            range.selectNode(wrapper);
          }
        }
        range.commonAncestorContainer.parentNode.normalize();
      }
    });
  }

  unwrap(node: HTMLElement, unwrapNode: string) {
    if (node.nodeName === unwrapNode) {
      if (node && node.parentNode) {
        // move all children out of the element
        while (node.firstChild) {
          node.parentNode.insertBefore(node.firstChild, node);
        }
        node.getRootNode().normalize();
        node.remove();
      }
    }
  }

}

export default new UserActionService();
