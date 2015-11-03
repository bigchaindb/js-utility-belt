'use strict';

import Q from 'q';

import AppConstants from '../constants/application_constants';

// TODO: Create Unittests that test all functions

export function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throw new Error(response.json());
}

export function getCookie(name) {
    let parts = document.cookie.split(';');

    for(let i = 0; i < parts.length; i++) {
        if(parts[i].indexOf(AppConstants.csrftoken + '=') > -1) {
            return parts[i].split('=').pop();
        }
    }
}

/*

    Given a url for an image, this method fetches it and returns a promise that resolves to
    a blob object.
    It can be used to create a 64base encoded data url.

    Taken from: http://jsfiddle.net/jan_miksovsky/yy7zs/

    CURRENTLY NOT USED...

 */
export function fetchImageAsBlob(url) {
    return Q.Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);

        // Ask for the result as an ArrayBuffer.
        xhr.responseType = 'arraybuffer';

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status >= 400) {
                reject(xhr.statusText);
            }
        };

        xhr.onload = function() {
            // Obtain a blob: URL for the image data.
            let arrayBufferView = new Uint8Array(this.response);
            let blob = new Blob([arrayBufferView], {type: 'image/jpeg'});
            resolve(blob);
        };

        xhr.send();
    });
}
