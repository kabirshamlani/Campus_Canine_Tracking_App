const express = require('express');
const multer = require('multer');
const path = require('path');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.split('/')[1] === 'png' || file.mimetype.split('/')[1] === 'jpg' || file.mimetype.split('/')[1] === 'jpeg' || file.mimetype.split('/')[1] === 'gif'){
        cb(null, true);
    } else{
        cb(new Error('Not an Image!!'), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

module.exports = upload;