const mongoose= require('mongoose')
const UserSchema = new mongoose.Schema({
    districtName: String,
    tehsilName: String,
    longitude: Number,
    latitude: Number,
    siteName: String,
    may22: String,
    aug22: String,
    nov22: String,
    jan23: String,
    pzDW: String
});

const UserModel = mongoose.model("users",UserSchema)
module.exports = UserModel