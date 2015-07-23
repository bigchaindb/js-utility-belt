'use strict';

import SparkMD5 from 'spark-md5';

/**
 * Takes a string, creates a text file and returns the URL
 *
 * @param  {string} text regular javascript string
 * @return {string}      regular javascript string
 */
export function makeTextFile(text) {
    let data = new Blob([text], {type: 'text/plain'});
    return window.URL.createObjectURL(data);
}

/**
 * Takes a file Object, computes the MD5 hash and returns the URL of the textfile with the hash
 *
 * @param  {File}   file javascript File object
 * @return {string}      regular javascript string
 */
export function computeHashOfFile(file) {
    let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
        chunkSize = 2097152,                             // Read in chunks of 2MB
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        spark = new SparkMD5.ArrayBuffer(),
        fileReader = new FileReader();

    let startTime = new Date();
    fileReader.onload = function (e) {
        //console.log('read chunk nr', currentChunk + 1, 'of', chunks);
        spark.append(e.target.result);                   // Append array buffer
        currentChunk++;

        if (currentChunk < chunks) {
            loadNext();
        } else {
            let fileHash = spark.end();
            console.info('computed hash %s (took %d s)',
                fileHash,
                Math.round(((new Date() - startTime) / 1000) % 60));  // Compute hash
            let hashFile = this.makeTextFile(fileHash);
            console.info('hash: ', hashFile);
            return hashFile;
        }
    }.bind(this);

    fileReader.onerror = function () {
        console.warn('oops, something went wrong.');
    };
    function loadNext() {
        var start = currentChunk * chunkSize,
            end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }

    loadNext();

}