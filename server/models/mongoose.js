var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    _lists: [{type: Schema.Types.ObjectId, ref: 'listdb'}]
},{timestamps:true});

mongoose.model('userdb', UserSchema);

var ListSchema = new mongoose.Schema({
    title: String,
    description: String,
    _videos: [{type: Schema.Types.ObjectId, ref: 'videodb'}],
    _user: {type: Schema.Types.ObjectId, ref: 'userdb'}
},{timestamps:true});

mongoose.model('listdb', ListSchema);

var VideoSchema = new mongoose.Schema({
    title: String,
    description: String,
    url: String,
    rating: [],
    _list: {type: Schema.Types.ObjectId, ref: 'listdb'},
    position: Number
},{timestamps:true});

mongoose.model('videodb', VideoSchema);
// Validations
// MongooseSchema.path('color').required(true, 'Color cannot be blank');
// MongooseSchema.path('weight').required(true, 'Weight cannot be blank');
// MongooseSchema.path('name').required(true, 'Name cannot be blank');