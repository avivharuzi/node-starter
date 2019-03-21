const fs = require('fs');

const ErrorHandler = require.main.require('./utils/error-handler');

class FileService {
  static isFileType(file, type) {
    let filetypes;

    switch (type) {
      case 'image':
        {
          filetypes = /^(jpg|jpeg|png|(image)\/jpg|(image)\/jpeg|(image)\/png)$/;
          break;
        }
      case 'audio':
        {
          filetypes = /^(mp3|MP3|mp3|MP3|(audio)\/mpeg|(audio)\/mp3|(audio)\/MP3)$/;
          break;
        }
      default:
        {
          return false;
        }
    }

    const fileExt = file.name.split('.');
    const fileActualExt = fileExt[fileExt.length - 1].toLowerCase();
    const mimetype = file.mimetype.toLowerCase();

    if (filetypes.test(fileActualExt) && filetypes.test(mimetype)) {
      return true;
    } else {
      return false;
    }
  }

  static hasFileSize(file, size) {
    const maxSize = size * 1000000;
    const fileSize = file.data.toString().length;

    if (fileSize < maxSize) {
      return true;
    } else {
      return false;
    }
  }

  static validateFiles(files, type, size) {
    let errors = [];

      if (files) {
        if (files.constructor !== Array) {
          files = [files];
        }

        for (let file of files) {
          if (!FileService.isFileType(file, type)) {
            errors.push(`File ${file.name} type is not supported`);
          }

          if (!FileService.hasFileSize(file, size)) {
            errors.push(`File ${file.name} is too big`);
          }
        }
      } else {
        errors.push(`You need to provide at least one ${type} to upload`);
      }

      if (errors.length) {
        throw new ErrorHandler(ErrorHandler.TYPE_VALIDATION, 'Files validation was failed', errors);
      } else {
        return files;
      }
  }

  static moveFiles(files, path = process.env.IMAGES_PATH) {
    return new Promise((resolve, reject) => {
      let newFileNames = [];
      let i = 0;

      if (files.constructor !== Array) {
        files = [files];
      }

      for (let file of files) {
        const fileExt = file.name.split('.');
        const fileActualExt = fileExt[fileExt.length - 1];
        const uid = Date.now() + i;
        const newFileName = uid + '.' + fileActualExt;

        file.mv(path + '/' + newFileName, (err) => {
          if (err) {
            reject(err);
          }
        });
        newFileNames.push(newFileName);
        i++;
      }

      resolve(newFileNames);
    });
  }

  static deleteFile(filePath) {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static fileExists(filePath) {
    try {
      return fs.statSync(filePath).isFile();
    } catch (e) {
      return false;
    }
  }

  static convertToBase64(path, image) {
    let bitmap = fs.readFileSync(path + image);
    return new Buffer(bitmap).toString('base64');
  }

  static convertFileToName(file) {
    let lastIndex = file.lastIndexOf('.');
    let name = file.substr(0, lastIndex);

    return name;
  }
}

module.exports = FileService;
