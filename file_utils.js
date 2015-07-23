'use strict';

import SparkMD5 from 'spark-md5';

import { getLangText } from './lang_utils';

/**
 * Takes a string, creates a text file and returns the URL
 *
 * @param  {string} text regular javascript string
 * @return {string}      regular javascript string
 */
function makeTextFile(text, file) {
    let textFileBlob = new Blob([text], {type: 'text/plain'});
    let textFile = new File([textFileBlob], 'hash-of-' + file.name + '.txt', {
        lastModifiedDate: file.lastModifiedDate,
        lastModified: file.lastModified,
        type: 'text/plain'
    });

    return textFile;
}

/**
 * Takes a file Object, computes the MD5 hash and returns the URL of the textfile with the hash
 *
 * @param  {File}   file javascript File object
 * @return {string}      regular javascript string
 */
export function computeHashOfFile(file) {
    return new Promise((resolve, reject) => {
        let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        let chunkSize = 2097152; // Read in chunks of 2MB
        let chunks = Math.ceil(file.size / chunkSize);
        let currentChunk = 0;
        let spark = new SparkMD5.ArrayBuffer();
        let fileReader = new FileReader();

        let startTime = new Date();

        // comment: We should convert this to es6 at some point, however if so please consider that
        // an arrow function will get rid of the function's scope...
        fileReader.onload = function(e) {
            //console.log('read chunk nr', currentChunk + 1, 'of', chunks);
            spark.append(e.target.result); // Append array buffer
            currentChunk++;

            if (currentChunk < chunks) {
                loadNext();
            } else {
                let fileHash = spark.end();

                console.info('computed hash %s (took %d s)',
                    fileHash,
                    Math.round(((new Date() - startTime) / 1000) % 60)); // Compute hash

                let blobTextFile = makeTextFile(fileHash, file);
                resolve(blobTextFile);
            }
        }.bind(this);

        fileReader.onerror = function () {
            reject(new Error(getLangText('We weren\'t able to hash your file locally. Try to upload it manually or consider contact us.')));
        };

        function loadNext() {
            var start = currentChunk * chunkSize,
                end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

            fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        }

        loadNext();
    });
}