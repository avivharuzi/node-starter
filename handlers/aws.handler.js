const AWS = require('aws-sdk');

const Promise = require('bluebird');

const S3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY
});

class AwsHandler {
    static getFileFromS3(filename) {
        if (filename.constructor === Array) {
            filename = filename[0];
        }

        return new Promise((resolve, reject) => {
            let params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: filename
            };

            S3.getObject(params, (err, data) => {
                if (err) {
                    reject(['There was problem to get files']);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static getMultipleFilesFromS3(filenames) {
        if (filenames.constructor !== Array) {
            return Promise.reject(['You need to provide multiple filenames']);
        } else {
            return Promise.all(filenames.map((filename) => {
                return AwsHandler.getFileFromS3(filename);
            }));
        }
    }

    static uploadFileToS3(file, folder = null) {
        if (file.constructor === Array) {
            file = file[0];
        }

        return new Promise((resolve, reject) => {
            const fileExt = file.name.split('.');
            const fileActualExt = fileExt[fileExt.length - 1];
            const uid = Date.now().toString();
            let newFileName = uid + '.' + fileActualExt;

            if (folder) {
                newFileName = folder + '/' + newFileName;
            }

            let params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: newFileName,
                Body: file.data
            };

            S3.upload(params, (err, data) => {
                if (err) {
                    reject(['There was problem by uploading this file']);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static uploadMultipleFilesToS3(files) {
        if (files.constructor !== Array) {
            return Promise.reject(['You need to provide multiple files']);
        } else {
            return Promise.all(files.map((file) => {
                return AwsHandler.uploadFileToS3(file);
            }));
        }
    }

    static deleteFileFromS3(filename) {
        if (filename.constructor === Array) {
            filename = filename[0];
        }

        return new Promise((resolve, reject) => {
            let params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: filename
            };
    
            S3.deleteObject(params, (err, data) => {
                if (err) {
                    reject(['There was problem while deleting this file']);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static deleteMultipleFilesFromS3(filenames) {
        if (filenames.constructor !== Array) {
            return Promise.reject(['You need to provide multiple filenames']);
        } else {
            return Promise.all(filenames.map((filename) => {
                return AwsHandler.deleteFileFromS3(filename);
            }));
        }
    }
}

module.exports = AwsHandler;
