const {Schema, model, Types} = require('mongoose') // get  schema and function model from mongoose

// basic db schema for the user
const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required:true},
    links: [{type: Types.ObjectId, ref: 'Link' }]
})

// export user model
module.exports = model('User', schema)