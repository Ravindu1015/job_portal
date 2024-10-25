import { Mongoose } from "mongoose";
import validator from 'validator'
import isEmail from './../node_modules/validator/es/lib/isEmail';

//schema
const userSchema = new Mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Please provide a name']
    },
    email:{
        type: String,
        required:[true, 'Please provide an email'],
        unique: true,
        validate:validator.isEmail
    },
    password:{
        type: String,
        required:[true, 'Please provide a password'],
        select: false
    },
    location:{
        type: String,
        default:"India"
    },

},
{
    timestamps: true
}
);

export default Mongoose.model('User', userSchema)