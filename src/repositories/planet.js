'use strict';

const mongoose = require('mongoose');
const planets = mongoose.model('planets');

exports.get = async () => {
    const res = await planets.find({}, 'name climate terrain');
    
    return res;
}

exports.getByName = async (name) => {
    const res = await planets.findOne({ name: name }, 'name climate terrain');

    return res;
}

exports.getById = async (id) => {
    const res = await planets.findById(id);

    return res;
}

exports.create = async (data) => {
    let planet = new planets(data);
    
    const res = await planet.save();

    return res;
}

exports.put = async (data, id) => {
    const res = await planets.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
            terrain: data.terrain,
            climate: data.climate
        }
    });

    return res;
}

exports.destroy = async (id) => {
    const res = await planets.findOneAndRemove(id);

    return res;
}