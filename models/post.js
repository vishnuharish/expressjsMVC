let mongoose = require('mongoose');

let Schema = mongoose.Schema;

var Post = new Schema({
   title: { 
    
    type: String,
    required: [true, 'ttile is required'],
    lowercase: false
},

description: {
    type: String,
    required: [true, 'description is required'],
},

body: {
    type: String,
}
},{timestamps: true});


module.exports = mongoose.model('Post', Post);


