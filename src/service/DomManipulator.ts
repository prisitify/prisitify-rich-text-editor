
import { log } from "console";
import UserActionService from "./UserActionService";
import PristifyNode from "./NodeToUnwrap";
import { Fragment } from "@stencil/core";

export class DomManipulator {


  public wrap(el, wrapper) {
    if (el && el.parentNode) {
      el.parentNode.insertBefore(wrapper, el);
      wrapper.appendChild(el);
    }
  }

  public wrapAll(ary, wrapper) {
    if (ary && ary.length) {
      ary[0].parentNode.insertBefore(wrapper, ary[0]);
      for (var i in ary) {
        wrapper.appendChild(ary[i]);
      }
    }
  }

  public unwrap(el) {
    if (el && el.parentNode) {
      // move all children out of the element
      while (el.firstChild) {
        el.parentNode.insertBefore(el.firstChild, el);
      }
      // remove the empty element
      el.parentNode.removeChild(el);
    }
  }

  public unwrapRange1(range, type) {

  }


  public splitElement(selectedSpan, parentParagraph) {
    let nextSibling = selectedSpan.nextSibling;
    // Create a new element to contain the second part of the parent tag
    const newElement = document.createElement(parentParagraph.nodeName);
    while (nextSibling) {
      newElement.appendChild(nextSibling);
      nextSibling = selectedSpan.nextSibling;
    }

    // Remove the selected element
    parentParagraph.removeChild(selectedSpan);

    // Insert the new element after the parent tag
    parentParagraph.parentNode.insertBefore(selectedSpan, parentParagraph.nextSibling);
    parentParagraph.parentNode.insertBefore(newElement, selectedSpan.nextSibling);
    newElement.normalize();
    // document.createRange().selectNodeContents(selectedSpan);



  }

  public unwrapRange4(range) {

    const parentElement = range.commonAncestorContainer.parentElement;

    if (parentElement !== null) {
      const contents = range.extractContents();
      parentElement.parentNode.insertBefore(contents, parentElement);
      parentElement.parentNode.removeChild(parentElement);
    }

  }


  public checkTag(nodes: Node[], tag): boolean {
    let is = false;
    nodes.forEach((node) => {
      if (node.nodeName === tag) {
        is = true;
      }
    });

    return is;
  }

  public unwrapChildContainer(container, tag) {
    container.childNodes.forEach((node) => {
      if (node.nodeName === tag) {
        this.unwrap(node);
      }
    });
  }

  public removeText(range: Range, tag) {
    // console.log("range name: ",range.commonAncestorContainer.parentNode.nodeName);

    // if(range.commonAncestorContainer.nodeType === Node.TEXT_NODE) {
    //   return;
    // }

    // console.log(range.commonAncestorContainer.nodeName);

    // const container = document.createElement(range.commonAncestorContainer.nodeName);
    // container.appendChild(range.extractContents());
    // console.log("container : ", container);

    // range.insertNode(container);
    // this.unwrapChildContainer(container, tag);
    // const parents = [];

    // this.getParentOne(container, parents);

    // console.log("parents", parents);


    // if (this.checkTag(parents, tag) === true) {
    //   parents.every((node) => {
    //     if (node.nodeName === tag) {
    //       this.splitElement(container, node);

    //       return false;
    //     }
    //     this.splitElement(container, node);
    //     return true;
    //   })
    // }



  }


  public remove(range: Range, tag) {
    // console.log(range.commonAncestorContainer);
    // if (["I", "STRONG", "S", "U"].includes(range.commonAncestorContainer.nodeName)) {
    //   const container = document.createElement(range.commonAncestorContainer.nodeName);
    //   container.appendChild(range.extractContents());
    //   range.insertNode(container);
    //   this.unwrapChildContainer(container, tag);
    //   const parents = [];

    //   this.getParentOne(container, parents);

    //   console.log(parents);

    //   if (this.checkTag(parents, tag) === true) {
    //     parents.every((node) => {
    //       if (node.nodeName === tag) {
    //         this.splitElement(container, node);
    //         range.selectNodeContents(container);
    //         if (container.nodeName === tag) {
    //           document.createRange().selectNodeContents(container)
    //           this.unwrap(container);
    //         }

    //         return false;
    //       }
    //       this.splitElement(container, node);


    //       document.createRange().selectNodeContents(container)
    //       return true;
    //     })
    //   }

    // }

    let parents : Node[] = [];
    this.findParent(range.commonAncestorContainer, parents)

    let parent = parents.find((e) => e.nodeName === tag);


    let nodes: Node[] = [];
    if (range.commonAncestorContainer.nodeType === Node.TEXT_NODE) {
      nodes = UserActionService.getRangeTextNodes(range);
    } else {
      nodes = UserActionService.getTextNodes(parent ? parent : range.commonAncestorContainer);
    }



    console.log("parent range  : ", range.commonAncestorContainer);
    console.log("nodes : ", nodes);

    let startNode = range.startContainer;
    let endNode = range.endContainer;
    let startOffset = range.startOffset;
    let endOffset = range.endOffset;

    let isStarted: 0 | 1 | 2 | 3 = 0;
    const nodesToKeep: PristifyNode[] = [];
    const nodesToUpdate: PristifyNode[] = [];

    let isTrue;

    nodes.forEach(node => {

      const nodeRange: Range = UserActionService.createRangeFromNode(node);


      let myNodes:Node[] = [];
      UserActionService.getParentOne(node, myNodes);

      console.log("mynodes", myNodes, isTrue);


      if (UserActionService.rangeIntersectsNode(range, node) && isTrue) {
        if (node === startNode) {
          isStarted = 1;
          nodeRange.setStart(node, startOffset);
        }

        if (node === endNode) {
          nodeRange.setEnd(node, endOffset);
          const endNode: PristifyNode = { node: node, range: null }
          nodesToKeep.push(endNode);
          isStarted = 3;
        }


        // this.move(node, nodeRange, tag)
        const pristifyNode: PristifyNode = { node: node, range: nodeRange }
        nodesToUpdate.push(pristifyNode);
      } else {
        if (isStarted > 2) {
          const endNode: PristifyNode = { node: node, range: null }
          nodesToKeep.push(endNode);
        }

      }


    });

    let beforeElement = undefined;

    beforeElement = parent ? parent : isTrue;


    console.log("nodesToUpdate : ", nodesToUpdate);
    console.log("nodesToKeep : ", nodesToKeep);

    nodesToUpdate.forEach((nodeToUpdate) => {

      const content = this.extractUnUnwrap(nodeToUpdate.node, nodeToUpdate.range, tag);

      const parent = this.findParentElementTag(nodeToUpdate.node, tag);

      let inserted = parent.insertAdjacentElement('afterend', content)

      nodeToUpdate.range.deleteContents();

      beforeElement = inserted;

    });





    nodesToKeep.forEach((nodeTokeep) => {

      let range = UserActionService.createRangeFromNode(nodeTokeep.node);

      const content = this.extractUnUnwrap(nodeTokeep.node, range, tag, true);

      let inserted = beforeElement.insertAdjacentElement('afterend', content);

      range.deleteContents();

      beforeElement = inserted;
    });
  }



  public extractUnUnwrap(node: Node, nodeRange: Range, tag, withTag = false) {
    let content = nodeRange.cloneContents();

    let htmlElement: HTMLElement;

    let parents = []

    UserActionService.getParentOne(node, parents);

    parents.every((p) => {
      let wrapper;

      if (!withTag && p.nodeName === tag) {
        wrapper = document.createElement("span");
        // if(parents[0].nodeName === tag) {
        //   htmlElement = content;
        // }

      } else {
        wrapper = document.createElement(p.nodeName);
      }


      if (htmlElement) {
        wrapper.append(htmlElement);
      }
      else {
        wrapper.append(content);
      }

      htmlElement = wrapper;

      return p.nodeName !== tag;
    })

    return htmlElement;
  }


  public insertPile(parent: Node, content: DocumentFragment | Node, element: Node) {
    return parent.insertBefore(content, element);
  }

  public findParent(node: Node, parents: Array<Node>) {
    if (node?.parentElement?.hasChildNodes()) {
      parents.push(node?.parentNode);
      if (node.parentElement.getAttribute("class") !== "pristify-editor-content") {
        return this.findParent(node?.parentNode, parents);
      }
    }
    return null;
  }


  public findParentTag(node: Node, tag: string) : Node{
      const parents : Array<Node> = [];
      this.findParent(node, parents);
      return parents.find(e => e.nodeName === tag);
  }

  public getParentOne2(node: Node, parents: Array<Node>) {
    if (node?.parentElement) {
      parents.push(node?.parentNode);
      if (node.parentElement.getAttribute("class") !== "pristify-editor-content") {
        return this.findParent(node?.parentNode, parents);
      }
    }
    return null;
  }


  public findParentElementTag(node: Node, tag: string) : HTMLElement{
    const parents : Array<HTMLElement> = [];
    this.findParentElement(node, parents);
    return parents.find(e => e.nodeName === tag);
  }

  public findParentElement(node: Node, parents: Array<HTMLElement>) {
    if (node?.parentElement?.hasChildNodes()) {
      parents.push(node?.parentElement);
      if (node.parentElement.getAttribute("class") !== "pristify-editor-content") {
        return this.findParent(node?.parentNode, parents);
      }
    }
    return null;
  }


  public removeTag(container, tag) {

    // const container = document.createElement('span');
    // container.appendChild(range.extractContents());



    // // Remove the <strong> tag from the cloned contents
    const strongElements = container.getElementsByTagName(tag);
    while (strongElements.length > 0) {
      const strongElement = strongElements[0];
      const parentElement = strongElement.parentNode;
      while (strongElement.firstChild) {
        parentElement.insertBefore(strongElement.firstChild, strongElement);
      }
      parentElement.removeChild(strongElement);
    }

    // Replace the selected range with the modified contents

    this.unwrap(container);

  }



  public unwrapRange(range, type) {

    const span = document.createElement('SPAN');
    range.surroundContents(span);


    const i = document.createElement(type);


    span.insertAdjacentElement('beforebegin', i)

    let navigation = span.previousSibling.previousSibling;
    while (navigation) {

      const old = navigation.parentNode.nodeName !== type ? navigation.parentNode : navigation;
      navigation = navigation.previousSibling;
      i.appendChild(old);

    }

    const ii = document.createElement(type);
    span.insertAdjacentElement('afterend', ii)

    // navigation = span.nextSibling.nextSibling;
    // while (navigation) {
    //     const old = navigation;
    //     navigation = navigation.nextSibling;
    //     ii.appendChild(old);
    // }
    this.unwrap(span.parentElement);
    this.unwrap(span);

    range.commonAncestorContainer.normalize();
  }
}


export default new DomManipulator();
