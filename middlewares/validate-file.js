const {response, request} = require('express');

const validateFile = ( req = response, res = request, next ) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({msg: 'No files were uploaded.', files: req.files});
  }

  next();

}

module.exports = {
  validateFile
}