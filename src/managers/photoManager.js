const Photo = require('../models/Photo');

exports.getAll = () => Photo.find().populate('owner');

exports.create = (photoData) => Photo.create(photoData);

exports.getOne = (photoId) => Photo.findById(photoId).populate('owner');

exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);

exports.edit = (photoId, photoData) => Photo.findByIdAndUpdate(photoId, photoData);