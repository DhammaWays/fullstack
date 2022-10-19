// Favorite List Model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Our Favorite Model Schema is as follows:
// Favorite:
//     user: new ObjectId("634b0314424ab9198be8e84a"),
//     dishes: [{ _id: new ObjectId("634f18b7b2ccc315f5eae88c") }]
//
const favoriteSchema = new Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [{
        _id: { // Mongoose populate only works if key is "_id" (same as "_id" key given at input time)
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dish'
        }
}]
}, {
    timestamps: true
});

// Create the model based on schema and export it
var Favorites = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorites;
