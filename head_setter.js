/**
 * Created by cevo on 06.10.15.
 */
'use strict';

// faviconType: string, is the type of the favicon, such as link, meta, etc.
//faviconId id of the favicon
// faviconDict: hash table containing the attributes of the relevant favicon

let constructHeadElement = function(elementType, elementId, elementAttributes) {
    console.log('setfavicon invoked');
    var head = (document.head || document.getElementsByTagName('head')[0]);
    var element = document.createElement(elementType);
    var oldElement = document.getElementById(elementId);
    try {
        for (let k in elementAttributes){
            console.log('Setting ', k, elementAttributes[k]);
            element.setAttribute(k, elementAttributes[k]);
        }
    }
    catch(e){
        console.log(e.message());
    }
    if (oldElement) {
        head.removeChild(oldElement);
    }
    head.appendChild(element);
    return this;
};

// Accepts a dictionary of dictionaries which comprises a part or all of html head part
// {link : {id1: {rel: ... }}}
// traverses a tree of depth 3 (no backtracking)
export function constructHead(headObject){
    console.log('Going to set all favicons');
    console.log(headObject);
    for (let k in headObject){
        let favicons = headObject[k];
        for (let f in favicons){
            constructHeadElement(k, f, favicons[f]);
        }
    }
}
