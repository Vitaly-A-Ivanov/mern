const {Schema, model, Types} = require('mongoose') // get  schema and function model from mongoose

//  db schema for the links
const schema = new Schema({
  from: {type: String, required: true}, // link came from
  to: {type: String, required: true, unique: true}, // link going to - unique
  code: {type: String, required: true, unique: true},
  date: {type: Date, default: Date.now}, // date link was created
  clicks: {type: Number, default: 0}, // click counter - simple analytics
  owner: {type: Types.ObjectId, ref: 'User'} // link created by
})

// export user model
module.exports = model('Link', schema)