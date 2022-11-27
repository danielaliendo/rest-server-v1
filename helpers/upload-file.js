const {v4: uuidv4} = require("uuid");
const path = require("path");

const uploadFile = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

  return new Promise((resolve, reject) => {

    const {file} = files;

    const fileName = file.name.split('.');
    const extension = fileName[fileName.length - 1]

    // Validate extension
    if (!validExtensions.includes(extension)) {
      return reject(`The ${extension} extension is invalid. The file was expected to have one of these extensions: ${validExtensions.toString()}`)
    }

    const nameTemp = uuidv4() + '.' + extension

    const uploadPath = path.join(__dirname, `../uploads/`, folder, nameTemp)

    file.mv(uploadPath, (err) => {
      if (err) {
        console.log(err)
        return reject(err)
      }

      resolve(nameTemp);
    });

  })

}

module.exports = {
  uploadFile
}