import SparkMD5 from 'spark-md5';

/**
 * Takes a file, computes the MD5 hash and returns a promise that will resolve with the hash.
 * Adapted from https://github.com/satazor/js-spark-md5
 *
 * @param  {File}    file Javascript File object
 * @return {Promise}      Promise that resolves with the hash of the file as a string
 */
export default function computeFileHash(file) {
    return new Promise((resolve, reject) => {
        const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        const chunkSize = 2097152; // Read in chunks of 2MB
        const chunks = Math.ceil(file.size / chunkSize);
        const spark = new SparkMD5.ArrayBuffer();
        const fileReader = new FileReader();
        const startTime = new Date();
        let currentChunk = 0;

        fileReader.onload = ({ target: { result } }) => {
            if (process.env.NODE_ENV !== 'production') {
                // eslint-disable-next-line no-console
                console.info(`Hashing chunk ${currentChunk + 1} of ${chunks}`);
            }

            spark.append(result); // Append array buffer
            currentChunk++;

            if (currentChunk < chunks) {
                loadNext();
            } else {
                const fileHash = spark.end();

                if (process.env.NODE_ENV !== 'production') {
                    const hashTime = (new Date() - startTime) / 1000 % 60;

                    /* eslint-disable no-console */
                    console.info(`Computing hash of ${file.name} took ${hashTime}s`);
                    console.info(`Computed hash: ${fileHash}`);
                    /* eslint-enable no-console */
                }

                resolve(fileHash);
            }
        };

        fileReader.onerror = reject;

        function loadNext() {
            const start = currentChunk * chunkSize;
            const nextEnd = start + chunkSize;
            const end = nextEnd >= file.size ? file.size : nextEnd;

            fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        }

        loadNext();
    });
}
