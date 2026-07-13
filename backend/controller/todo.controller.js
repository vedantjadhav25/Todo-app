import Todo from "../model/todo.model.js";

export const createTodo = async (req, res) => {
    const todo = new Todo({
        title:req.body.title,
        completed:req.body.completed,
        user:req.user._id   //Associated todo with logged in user
    })
    try {
        const newTodo = await Todo.create({
            title: req.body.title,
            completed: req.body.completed,
            user: req.user._id,
        });
        res.status(201).json({
            message: "Todo created successfully",
            newTodo,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Error creating todo",
        });
    }
};

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({user:req.user._id}); //fetch todos only for logged in users
        res.status(200).json({
            message: "Todos fetched successfully",
            todos,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Error fetching todos",
        });
    }
};

export const updateTodo = async (req , res)=>{
    try{
        const todo = await Todo.findByIdAndUpdate(req.params.id , req.body , {new : true})
        res.status(200).json({
            message: "Todo updated successfully",todo});
    }catch(error){
        console.log(error);
        res.status(400).json({
            message: "Error updating todo",
        });
    }
};

export const deleteTodo = async(req , res) => {
    try{
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if(!todo){
            res.status(404).json({message:"Todo not found"}); 
        }
        res.status(200).json({message : "Todo deleted succcessfully"})
    }catch(error){
        console.log(error);
        res.status(400).json({
            message: "Error deleting todo",
        });
    }
};