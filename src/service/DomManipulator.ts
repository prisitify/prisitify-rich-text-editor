
import { log } from "console";
import UserActionService from "./UserActionService";
import NodeToUnwrap from "./NodeToUnwrap";

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
    console.log("range : ", range.cloneContents());
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

    let nodes: Node[] = [];
    if (range.commonAncestorContainer.nodeType === Node.TEXT_NODE) {
      nodes = UserActionService.getRangeTextNodes(range);
    } else {
      nodes = UserActionService.getTextNodes(range.commonAncestorContainer);
      console.log(nodes);

    }


    console.log("childs: ", range.commonAncestorContainer, nodes);
    let startNode = range.startContainer;
    let endNode = range.endContainer;
    let startOffset = range.startOffset;
    let endOffset = range.endOffset;

    let isStarted: 0 | 1 | 2 | 3 = 0;
    const endEndOfNodes: NodeToUnwrap[] = [];
    const nodesToUnwrap: NodeToUnwrap[] = [];
    nodes.forEach(node => {
      const nodeRange: Range = UserActionService.createRangeFromNode(node)
      if (UserActionService.rangeIntersectsNode(range, node)) {
        if (node === startNode) {
          isStarted = 1;
          nodeRange.setStart(node, startOffset);
        }

        if (node === endNode) {
          nodeRange.setEnd(node, endOffset);

          const endNode: NodeToUnwrap = { node: node, range: null }
          endEndOfNodes.push(endNode);
          isStarted = 3;
        }


        // this.move(node, nodeRange, tag)
        const nodeToUnewrap: NodeToUnwrap = { node: node, range: nodeRange }
        nodesToUnwrap.push(nodeToUnewrap);
      } else {
        if (isStarted > 2) {
          const endNode: NodeToUnwrap = { node: node, range: null }
          endEndOfNodes.push(endNode);
        }

      }


    });

    let beforeElement = undefined;
    const parent = range.commonAncestorContainer;
    console.log("node to be unwraped", nodesToUnwrap, parent);
    beforeElement = parent;
    nodesToUnwrap.forEach((nodew) => {

      const content = this.extractUnUnwrap(nodew.node, nodew.range, tag);


      let inserted;

      // if(content.nodeType === Node.TEXT_NODE) {
      //   inserted =  beforeElement.insertAdjacentText('afterend', content)
      // }else {
      inserted = beforeElement.insertAdjacentElement('afterend', content)
      // }

      // const inserted = this.insertPile(parent, content, beforeElement);

      nodew.range.deleteContents();
      // inserted.replaceWith(...inserted.childNodes)
      beforeElement = inserted;
    });


    console.log(endEndOfNodes);


    // endEndOfNodes.forEach((nodew) => {
    //   // const content = this.extractUnUnwrap(nodew.node, nodew.range, tag);
    //   const range : Range = UserActionService.createRangeFromNode(nodew.node);
    //   const content = document.createElement(tag);
    //   range.surroundContents(content);

    //   if (beforeElement) {
    //     beforeElement = parent.nextSibling;
    //   }

    //   console.log("to keep " , parent, content, beforeElement);
    //   const inserted = this.insertPile(parent, content, beforeElement);
    //   beforeElement = inserted;
    // });




  }



  public extractUnUnwrap(node: Node, nodeRange: Range, tag, withTag = false) {
    let content = nodeRange.cloneContents();

    let htmlElement: HTMLElement;

    let parents = []

    UserActionService.getParentOne(node, parents);

    parents.every((p) => {
      let wrapper;
      console.log(p.nodeName);
      
      if (!withTag && p.nodeName === tag) {
        wrapper = document.createElement("span");
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

  public getParentOne(node: Node, parents: Array<Node>) {
    if (node?.parentElement?.hasChildNodes()) {
      parents.push(node?.parentNode);
      if (node.parentElement.getAttribute("class") !== "pristify-editor-content") {
        return this.getParentOne(node?.parentNode, parents);
      }
    }
    return null;
  }

  public getParentOne2(node: Node, parents: Array<Node>) {
    if (node?.parentElement) {
      parents.push(node?.parentNode);
      if (node.parentElement.getAttribute("class") !== "pristify-editor-content") {
        return this.getParentOne(node?.parentNode, parents);
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
    console.log(range);

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
