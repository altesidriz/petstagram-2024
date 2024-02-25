const Photo = require('../models/Photo');

exports.getAll = () => Photo.find().populate('owner');

exports.create = (photoData) => Photo.create(photoData);

exports.getOne = (photoId) => Photo.findById(photoId).populate('owner');