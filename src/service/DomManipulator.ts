import { log } from "console";

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
      el.remove();
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
    // parentParagraph.removeChild(selectedSpan);

    // Insert the new element after the parent tag
    parentParagraph.parentNode.insertBefore(selectedSpan, parentParagraph.nextSibling);
    parentParagraph.parentNode.insertBefore(newElement, selectedSpan.nextSibling);
    document.normalize();
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

  public remove(range: Range, tag) {
    console.log(range.commonAncestorContainer);
    if (["I", "STRONG", "S", "U"].includes(range.commonAncestorContainer.nodeName)) {
      const container = document.createElement(range.commonAncestorContainer.nodeName);
      container.appendChild(range.extractContents());
      range.insertNode(container);
      this.unwrapChildContainer(container, tag);
      const parents = [];

      this.getParentOne(container, parents);

      console.log(parents);
      
      if (this.checkTag(parents, tag) === true) {
        parents.every((node) => {
          if (node.nodeName === tag) {
            this.splitElement(container, node);
            range.selectNodeContents(container);
            if (container.nodeName === tag) {
              document.createRange().selectNodeContents(container)
              this.unwrap(container);
            }

            return false;
          }
          this.splitElement(container, node);

    
          document.createRange().selectNodeContents(container)
          return true;
        })
      }
      
    }


    else {
    //        nodes.forEach((node) => {
    //         const nodeRange = this.createRangeFromNode(node);
    //        if ( node.textContent.length > 0) {

    //             if (node === startNode) {
    //                 nodeRange.setStart(node, startOffset);
    //             }

    //             if (node === endNode) {
    //                 nodeRange.setEnd(node, endOffset);
    //             }

    //             if (endNode === startNode) {
    //                 range.selectNode(node);
    //             }

    //             DomManipulator.remove(nodeRange, type);
    //         }
    //     }
    //     );
    //    }
    }

    /*
   if (range.commonAncestorContainer.nodeType === 1) {
     const parents = [];
     // parents.push(range.commonAncestorContainer);
    console.log(range.commonAncestorContainer);
    
     this.getParentOne(range.commonAncestorContainer, parents);


     let previousNode;
     console.log(parents);
    
     parents.every((node) => {

       if (node.nodeName === tag ) {
         // this.unwrapRange4(range, node);
         // this.removeTag(previousNode, tag);
         // if(previousNode.parentElement.nodeName === tag) {
           // this.unwrap(node);
         // }

        
         // this.splitElement(span, node);
         return false;
       }

       const content = range.extractContents();
       
       const nodeName = document.createElement(node.nodeName);
       nodeName.appendChild(content);
       globalThis.$(nodeName).wrap("<span></span>");
    
       
       range.insertNode(nodeName)
       //
       // this.unwrap(nodeName)
     
       // this.splitElement(span, node) 

       return true;
     });
   } */


    // let content = range.extractContents();

    // console.log(range);






    //   range.insertNode(newNode);
    // this.getParentOne(range.commonAncestorContainer, parents)

    // console.log(parents);


    // this.removeTag(range, tag)



    // let newNode = undefined;
    // parents.every((node) => {



    //   if(node.nodeName === tag) {


    //     this.unwrapRange(range, tag);
    //     return false;
    //   }      
    //   if(node.nodeType === Node.TEXT_NODE) {
    //     newNode = document.createTextNode("");
    //     newNode.appendChild(content)
    //   }else {
    //     newNode = document.createElement(node.nodeName);
    //     newNode.appendChild(content);
    //   }

    //   range.insertNode(newNode);
    //   this.splitElement(newNode, node);

    //   return true;     
    // });

    // while (parent) {
    //   if (parents[0].nodeName === tag || range.commonAncestorContainer.nodeType === Node.TEXT_NODE) {
    //     const content = range.extractContents();
    //     const span = document.createElement('span');
    //     span.appendChild(content);
    //     range.insertNode(span);
    //     let parent = span.parentNode;

    //     this.splitElement(span, parent);
    //     parent = parent.parentNode;
    //     if (parent.nodeName === tag) {
    //       return;
    //     }
    //   }
    // }

    // this.unwrap(span);
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