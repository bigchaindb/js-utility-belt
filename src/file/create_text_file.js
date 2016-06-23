/**
 * Takes a string, creates a text file and returns its File representation
 *
 * @param  {string} text     Text to put in file
 * @param  {string} fileName Name of the new file
 * @param  {object} options  Options object for creating the new file. Shares the same properties as
 *                           a File object, so you can pass in another file.
 * @param  {number} options.lastModified     Last modified date of the file as a number
 * @param  {Date}   options.lastModifiedDate Last modified date of the file as a date
 *
 * @return {File}            File object representation of the new text file
 */
export default function createTextFile(text, fileName, { lastModified, lastModifiedDate } = {}) {
    const textFileBlob = new Blob([text], { type: 'text/plain' });
    const textFile = new File([textFileBlob], fileName, {
        lastModified,
        lastModifiedDate,
        type: 'text/plain'
    });

    return textFile;
}
