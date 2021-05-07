const express = require('express');
const router = express.Router();
const Place = require('../models/place');

// Getting all
router.get('/', async (req, res) => {
    try {
        const places = await Place.find();
        res.json(places);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One
router.get('/:id', getPlace, (req, res) => {
    res.json(res.place);
});

// Creating one
router.post('/', async (req, res) => {
    const place = new Place({
        name: req.body.name,
        location: req.body.location,
        description: req.body.description
    });

    try {
        const newPlace = await place.save();
        res.status(201).json(newPlace);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating one
router.patch('/:id', getPlace, async (req, res) => {
    if (req.body.name != null) {
        res.place.name = req.body.name;
    }
    if (req.body.location != null) {
        res.place.location = req.body.location;
    }
    if (req.body.description != null) {
        res.place.description = req.body.description;
    }

    try {
        const updatedPlace = await res.place.save();
        res.json(updatedPlace);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting one
router.delete('/:id', getPlace, async (req, res) => {
    try {
        await res.place.remove();
        res.json({ message: 'Deleted place' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getPlace(req, res, next) {
    let place 
    try {
        place = await Place.findById(req.params.id);
        if (place == null) {
            return res.status(404).json({ message: 'Cannot find place' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.place = place;
    next();
}

module.exports = router;