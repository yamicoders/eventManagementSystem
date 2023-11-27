const mongoose =require('mongoose');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        reuired: true
    },
    phone:{
        type: String,
        reuired: true
    },
    email:{
        type: String,
        reuired: true
    },
    password:{
        type: String,
        reuired: true
    },
    confirmpass:{
        type: String,
        reuired: true
    },
    tokens:[
        {
            token:{
                type:String,
                require:true
            }
        }
    ]

})

userSchema.pre('save',async function (next){
    if(this.isModified('password')){
        this.password = bcrypt.hash(this.password,12);
        this.confirmpass = bcrypt.hash(this.confirmpass,12);
    }
    next();
});


//generate AUth token
userSchema.methods.generateAuthToken = async function(){
    try{
        
        let token =jwt.sign({_id:this._id}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token});
        await this.save()
        return token;

    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model('REGISTRATION', userSchema);
module.exports = User;
