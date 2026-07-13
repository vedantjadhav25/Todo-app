import User from "../model/user.model.js"; //yachyamuule user model import hoto jo user.model mdhe yeto
import {z} from "zod"; //yachyamuule zod library import hoto jo validation mdhe yeto
import bcrypt from "bcryptjs"; //yachyamuule bcryptjs library import hoto jo password hashing mdhe yeto
import {generateTokenandSaveinCookies} from "../jwt/token.js"; //yachyamuule generateTokenandSaveinCookies function import hoto jo token.js mdhe yeto

const userSchema = z.object({
    email:z.string().email({message:"Invalid email address"}), //yachyamuule email validation hot ahe ki email string ahe ki nahi ani email address valid ahe ki nahi
    username:z.string().min(3,{message:"Username must be at least 3 characters long"}), //yachyamuule username validation hot ahe ki username string ahe ki nahi ani username minimum 3 characters ahe ki nahi
    password:z.string().min(8,{message:"Password must be at least 8 characters long"}), //yachyamuule password validation hot ahe ki password string ahe ki nahi ani password minimum 8 characters  ahe ki nahi
});

export const register = async(req , res) =>{
    try{
        const{email , username , password} = req.body; //aplyaya req.body madhe email , username , password data yeto jo postman madhe yeto
        //console.log(email , username , password);

        if(!email || !username || !password){ //yachyamuule check hot ahe ki email , username , password data yeto ki nahi
            return res.status(400).json({message:"All feilds are required"});
        }
        const validation = userSchema.safeParse({email , username , password}); //yachyamuule email , username , password data validate hot ahe jo userSchema madhe define kel ahe
        if (!validation.success) {
            return res.status(400).json({
            errors: validation.error.issues.map(issue => issue.message)
            });
        }
        const user=await User.findOne({email}); //yachyamuule user model madhe email check hot ahe ki user already exist karto ki nahi
        if(user){
            return res.status(400).json({message:"User already exists"}); //yachyamuule user already exist karto tar 400 status code ani message return hoto
        }

        const hashPassword = await bcrypt.hash(password , 10); //yachyamuule password hash hot ahe jo bcryptjs library madhe yeto ani 10 salt rounds use karto
        
        const newUser = new User({email , username , password:hashPassword}); //yachyamuule user model madhe new user create hoto jo email , username , password data store karto 
        await newUser.save(); //yachyamuule new user database madhe save hoto
        if(newUser){
            const token = await generateTokenandSaveinCookies(newUser._id , res);//yachyamuule generateTokenandSaveinCookies function call hoto jo token.js madhe yeto ani new user id ani res object pass karto
            return res.status(201).json({message:"User created successfully" , newUser, token}); //yachyamuule user create zala tar 201 status code ani message return hoto
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Error registring user"}); //yachyamuule internal server error ahe tar 500 status code ani message return hoto
    }
}

export const login = async(req , res) =>{
    // console.log("Login Function called");
    const {email , password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message:"All feilds are required"});
        }

        const user = await User.findOne({email}).select("+password");//yachyamuule user model madhe email check hot ahe ki user exist karto ki nahi ani password select hot ahe jo database madhe store hot ahe

        if(!user || !(await bcrypt.compare(password , user.password)))//yachyamuule check hot ahe ki user exist karto ki nahi ani password match karto ki nahi jo database madhe store hot ahe
        {
            return res.status(400).json({message:"Invalid email or password"}); //yachyamuule user exist nahi karto tar 400 status code ani message return hoto
        }
        const token = await generateTokenandSaveinCookies(user._id , res);
        res.status(200).json({message:"User logged in successfully" , user, });
        
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Error logging in user"});
    }
}

export const logout = async(req , res) =>{
    // console.log("Logout Function called");
    try{
        res.clearCookie("jwt",{
            path:"/",
        })
        res.status(200).json({message:"User logged out successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Error logging out user"});
    }
}