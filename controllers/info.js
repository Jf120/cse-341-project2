const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// const getAll = async (req, res) => {
//     const result = await mongodb.getDatabase().db().collection('info').find();
//     result.toArray().then((info) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(info);
//     });
// };

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('info').find();
        const info = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(info);
    } catch (error) {
        console.error('Error in getAll:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// const getSingle = async (req, res) => {
//     const userId = new ObjectId(req.params.id);
//     const result = await mongodb.getDatabase().db().collection('info').find({ _id: userId });
//     result.toArray().then((info) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(info[0]);
//     });
// };

const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ error: 'Invalid ID' });
        }
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('info').find({ _id: userId });
        const info = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(info[0]);
        
    } catch (error) {
        console.error('Error in getSingle:', error);
        res.status(500).json({ error: 'User information not found' });
    }
};

const createUserInfo = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: 'Invalid ID' });
    }

    const userId = new ObjectId(req.params.id);

    const info = {
        _id: userId,
        birthday: req.body.birthday,
        color: req.body.color,
        nickname: req.body.nickname,
        hairColor: req.body.hairColor,
        hobby: req.body.hobby,
        address: req.body.address,
        url: req.body.url,
        city: req.body.city
    };

    const response = await mongodb.getDatabase().db().collection('info').insertOne(info);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Unknown error while adding user information');
    }
};

const updateUserInfo = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const info = {
        _id: userId,
        birthday: req.body.birthday,
        color: req.body.color,
        nickname: req.body.nickname,
        hairColor: req.body.hairColor,
        hobby: req.body.hobby,
        address: req.body.address,
        url: req.body.url,
        city: req.body.city
    };

    const response = await mongodb.getDatabase().db().collection('info').replaceOne({ _id: userId }, info);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Unknown error while updating user information');
    }
};

const deleteUserInfo = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: 'Invalid ID' });
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('info').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Unknown error while deleting user');
    }
};


module.exports = {
    getAll,
    getSingle,
    createUserInfo,
    updateUserInfo,
    deleteUserInfo
};