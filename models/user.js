var mongoose=require('mongoose');
var bcrypt =require('bcrypt');

mongoose.connect('mongodb://localhost/nodeismail');

var db =mongoose.Connection;



var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String ,
        required: true,
        bcrypt:true
    },
    email: {
        type: String
    },
    name: {
        type: String
    }

});

var User = module.exports = mongoose.model('User', UserSchema);


module.exports.comparePassword = function(candidatePassowrd, hash, callback){
    bcrypt.compare(candidatePassowrd, hash, function(err, isMatch){
        if(err) return callback(err);
        callback(null, isMatch);
    });
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}




module.exports.createUser = function(newuser,callback){

    bcrypt.hash(newuser.password,10,function(err,hash){
        if(err) throw err;

        //encrypte
        newuser.password=hash;

        //creat user
        newuser.save(callback);
    });
    
}