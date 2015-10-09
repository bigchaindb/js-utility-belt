'use strict';

// elementType: string, is the type of the element, such as link, meta, etc.
// elementId id of the element
// elementAttributes: hash table containing the attributes of the relevant element

function constructHeadElement(elementType, elementId, elementAttributes) {
    let head = (document.head || document.getElementsByTagName('head')[0]);
    let element = document.createElement(elementType);
    let oldElement = document.getElementById(elementId);
    element.setAttribute('id', elementId);
    for (let k in elementAttributes){
        try {
            element.setAttribute(k, elementAttributes[k]);
        }
        catch(e){
            console.log(e.message);
            console.log(elementAttributes);
            continue;
        }
    }
    if (oldElement) {
        head.removeChild(oldElement);
    }
    head.appendChild(element);
    return this;
}

// Accepts a dictionary of dictionaries which comprises a part or all of html head part
// {link : {id1: {rel: ... }}}
// traverses a tree of depth 3 (no backtracking)
export function constructHead(headObject){
    for (let k in headObject){
        let favicons = headObject[k];
        for (let f in favicons){
            constructHeadElement(k, f, favicons[f]);
        }
    }
}

export function setTitle(titleString){
    document.title = titleString;
}
