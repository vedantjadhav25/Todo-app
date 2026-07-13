import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function Home() {

  const [todos,setTodos] = useState([]) //atta usestate cha vapar kela ahe ani tyachytla array empty thevla ahe krn survatila kaich input naslyvr array emptych asto.yachyat sagle todo add hotil update hotil
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false);
  const [newTodo,setNewTodos] = useState("");

  useEffect(() => { //arrow function
    const fetchtodos = async()=>{
      try {
        setLoading(true) //dara fetch vaychya adhi loading chi value hi true asel 
          const response  = await axios.get("http://localhost:4001/todo/fetch" , {
            withCredentials : true,
            headers:{
              "Content-Type":"application/json",
            }
          })
          console.log(response.data.todos);
          setTodos(response.data.todos);
          setError(null) //data successfully fetch zala ae mhnun null
      } catch (error) {
        setError("Failed to fetch todos")
      }finally{
        setLoading(false)
      }
    };
    fetchtodos(); 
  } ,[]) //EMPTY DEPENDENCY ARRAY
  //apan fetchtodos wal useeffect madhe ghetla krn yachyat deta change hot rahil 

  const todoCreate=async ()=>{
    if(!newTodo)return; //mhanje jr new todo create ch nahi zal tr kahich honr nahi
    try {
      const response = await axios.post("http://localhost:4001/todo/create" , {
        title:newTodo,
        completed:false, //jo postman madhe status hota to ithe lihnn ghetla ahe
      },
      {
        withCredentials:true,
      })
      console.log(response.data.newTodo)
      setTodos([...todos,response.data.newTodo]);//aplyala ithe sagle todos paije ahe mhanun apan survatila const [todos,setTodos] he ghetla hota te prt lihaychy
      setNewTodos("");
    } catch (error) {
      setError("Failed to create todos")
    }
  };

  const todoStatus = async (id) =>{ //parameter madhe id pass keli karan todo update kartanna id lagtech
    const todo = todos.find((t)=>t._id===id)
    try {
      const response = await axios.put(`http://localhost:4001/todo/update/${id}`,{
        ...todo,
        completed:!todo.completed
        },{
          withCredentials:true
        })
        console.log(response.data.todo)
        setTodos(todos.map((t)=>t._id===id?response.data.todo:t))//yacha artha jr apn dileli id ani seettodos madli id jr same zali tr response madhe to data update krun settodos madhe save hoil ani jar id equal nasle tr te updatech nahi honar
    } catch (error) {
      setError("Failed to finde todo status");
    }
  };

  const todoDelete = async (id) =>{
    try {
      await axios.delete(`http://localhost:4001/todo/delete/${id}` , {withCredentials:true})
      setTodos(todos.filter((t)=>t._id!==id))//yacha artha delete zalyavr tya id cha equal konta pn todo asel settodo madhe tr to remove krycha 
    } catch (error) {
      setError("Failed to Delete Todo");  
    }
  };
  const navigateTo = useNavigate();//yachyamule dusrya route vr navigate hota yeta ex aplayala login vr jaychya signup vrun

  const logout=async ()=>{
    try {
      await axios.get("http://localhost:4001/user/logout" ,{
        withCredentials:true ,
      });
      toast.success("User logged out successfully");
      navigateTo("/Login")
      localStorage.removeItem("jwt");
    } catch (error) {
      toast.error("Error logging out")
    }
  }

  const remainingTodos = todos.filter((todo)=>!todo.completed).length;

  //UI DESIGN
  return (
    <div className=' my-10 bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6'>
      <h1 className='text-2xl font-semibold text-center'>Todo App </h1>
      <div className='flex mb-4 '>
        <input value={newTodo} onChange={(e)=>setNewTodos (e.target.value)} onKeyPress={(e)=> e.key === "Enter" && todoCreate()} type="text" placeholder='Add a new Todo' className="flex-grow p-2 border rounded-l-md focus:outline-none"/>
        <button onClick={todoCreate} className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-800 duration-300">Add</button>
      </div>
      {loading?(
        <div className='text-center justify-center'>
          <span className='text-gray-500'>Loading...</span>
        </div>
        ):error?(
        <div className='text-center text-red-600 font-semibold'>{error}</div>
      ):(
        <ul className="space-y-2"> {/* je todos ahet te list madhe pahije ahe tyamule ul ani li tag cha use karto */}
        {/*ithe map function use kela ahe karan todos array chya format madhe ahe ani tya todos la map function mdhe todo nav dilay */}
         {todos.map((todo,index) => ( 
          <li key = {todo._id || index } className="flex items-center justify-between p-3 bg-gray-100 rounded-md ">
          <div className='flex items-center'>
            <input type="checkbox" className='mr-2' checked={todo.completed} onChange={()=>todoStatus(todo._id)} />
            <span className={`${todo.completed?"line-through text-gray-800 font-semibold":""}`} >{todo.title}</span>
          </div>
          <button onClick={()=> todoDelete(todo._id)} className='text-red-500 hover:text-red-800 duration-300'>Delete</button>
          </li>
      ))}
        </ul>
      )} 
      <p className='mt-4 text-center text-sm text-gray-700'>{remainingTodos} todos remaining</p>
      <button onClick={()=> logout()} className='mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block'>Logout</button>
    </div>
  )
}
