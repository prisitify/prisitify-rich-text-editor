
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
        const selected: Selection = window.getSelection();
        if (selected.anchorOffset == selected.focusOffset) {
            return;
        }

        var range: Range = selected.getRangeAt(0);
        // range.commonAncestorContainer.parentNode.normalize();

        // const walker = document.createTreeWalker(range.commonAncestorContainer.getRootNode(), NodeFilter.SHOW_TEXT, null)

        const nodes = this.getRangeTextNodes(range)
        // const wrap= this.createWrapperFunction(document.createElement("strong"), range);




        // let node : Node = null;

        let startNode = range.startContainer;
        let endNode = range.endContainer;
        let startOffset = range.startOffset;
        let endOffset = range.endOffset;


        nodes.forEach((node) => {
            const nodeRange = this.createRangeFromNode(node);




            const wrapper = document.createElement('strong');

            if (this.rangesIntersect(range, nodeRange) && node.textContent.length > 0) {

                if (node === startNode) {
                    console.log("start");
                    nodeRange.setStart(node, startOffset);
                }
                if (node === endNode) {
                    console.log("end");
                    nodeRange.setEnd(node, endOffset);

                }


                if (node.parentNode.nodeName !== "STRONG") {
                    console.log(nodeRange);
                    nodeRange.surroundContents(wrapper);
                    if (endNode === startNode) {
                        range.selectNode(wrapper);
                    }
                }
                range.commonAncestorContainer.parentNode.normalize();
                // selected.setPosition(nodeRange.ser);
            }






        })





        // console.log(selected);
        // var range = selected.getRangeAt(0);

        // console.log(strong);


        // var strong = document.createElement("strong");
        // range.surroundContents(strong);
        // range.commonAncestorContainer.normalize();




        // strong.classList.add('fancy-text');

        // wrapRange(strong, range)




        // wrapRange(selection)


        // selection.surroundContents(strong);
        // strong.getRootNode().normalize();
        // selection.setStart(strong.firstChild, 0);
        // selection.setEnd(strong.lastChild, strong.lastChild.textContent.length);



    }

    public createWrapperFunction(wrapperEl, range) {
        var startNode = range.startContainer
            , endNode = range.endContainer
            , startOffset = range.startOffset
            , endOffset = range.endOffset

        return function wrapNode(node) {
            var currentRange = document.createRange()
                , currentWrapper = wrapperEl.cloneNode()

            currentRange.selectNodeContents(node)

            if (node === startNode && startNode.nodeType === 3) {
                currentRange.setStart(node, startOffset)
                startNode = currentWrapper
                startOffset = 0
            }
            if (node === endNode && endNode.nodeType === 3) {
                currentRange.setEnd(node, endOffset)
                endNode = currentWrapper
                endOffset = 1
            }

            currentRange.surroundContents(currentWrapper)
            return currentWrapper
        }
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

    public removeBold() {

        const el: Selection = document.getSelection();

        if (el.anchorOffset == el.focusOffset) {
            return;
        }

        console.log(el);




        // const jq = globalThis.$;

        // console.log(el);

        // // if(selection.commonAncestorContainer.nodeName === "STRONG") {
        // //   const selected = selection.commonAncestorContainer;
        // //   const childs = selected.childNodes;
        // //   jq(childs).unwrap();
        // //   el.setPosition(selected);
        // // }
        // // else {
        //   const selected = selection.commonAncestorContainer;
        //   jq(selected).unwrap();

        // //

        //   el.selectAllChildren(selection.commonAncestorContainer.childNodes[0]);
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


        // selected.getRootNode().normalize();
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
