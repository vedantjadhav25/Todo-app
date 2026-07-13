import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user:{
    type:mongoose.Schema.Types.ObjectId , 
    ref:"User", //referencing user model to connect to users collecting in MONGO db.
    required:true,
  }
});

const Todo = mongoose.model("Todo" , todoSchema);
export default Todo; 