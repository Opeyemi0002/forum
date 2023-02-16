import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type:String,
        required:[true, "first name required"]
    },
    lastname: {
        type:String,
        required:[true, "last name required"]
    },
    email: {
        type:String,
        required:[true, "email required"]
    },
    password: {
        type:String,
        required:[true, "password required"]
    },
    profilephoto: {
        type:String    
    },
    isBlock: {
        type:Boolean,
        default: false
    },
    isAdmin: {
        type:Boolean,
        default: false
    },
    role: {
        type:String,
        enum: ["Admin", "Editor", "Guest"]
    },
    views: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    Blocked: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    followers: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    award: {
        type:String,
        enum:["Bronze", "Silver", "Gold"],
        default: "Bronze"
    },
    
}, {timestamp: true,
    toJSON:{virtuals: true}
    }
);

const User = mongoose.model ("User", userSchema);

export default User;