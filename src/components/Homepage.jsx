import axios from 'axios';
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [task , setTask] = useState("");
  const [desctiption, setDescription] = useState("")
  const [allTask, setAllTask] = useState([])
  const [taskStatus, setTaskStatus] = useState("")
  const url = "http://localhost:3000/tasks";
  
  
  
  async function getTasks() {
    try {
      const response = await axios.get(url);
      setAllTask(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
   }
   useEffect(() => {
    getTasks();
   }, [])
   
  
  
  const payload = { task, desctiption, taskStatus }
  const handleSubmit = async(e) => {
     e.preventDefault();
     await axios.post(url , payload)
     setTask('')
     setDescription('')
     getTasks();
  }


  const handleDelete = async(id) => {
    try {
      await axios.delete(`${url}/${id}`);
      const response = await axios.get(url);
      setAllTask(response.data);
    } catch (error) {
      console.log(error)
    }
  }
  const handleStatusChange = async(id, status) => {
    try {
      await axios.patch(`${url}/${id}`, { taskStatus : status });
      const response = await axios.get(url);
      setAllTask(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  let renderTasks = <>No Tasks Added</>
  
  if (allTask && allTask.length > 0) {
    renderTasks = allTask.map((t) => {
      return <li key={t.id}>
                 <div className='grid grid-cols-4 gap-4 mb-5'>
                   <h4>{t.task}</h4>
                   <h5>{t.desctiption}</h5>
                   <select value={t.taskStatus}
                           onChange={(e)=> handleStatusChange(t.id, e.target.value)}
                           className='text-slate-700 h-10 px-1 py-2 align-bottom rounded-md'
                           >
                    <option value=''>select</option>
                    <option value='Pending'>Pending</option>
                    <option value='Processing'>Processing</option>
                    <option value='Completed'>Completed</option>
                    {t.taskStatus &&
                       <option>{taskStatus}</option>}
                   </select>
                   <button className='bg-slate-800 px-3 py-2 h-fit rounded-md'
                           onClick={() => handleDelete(t.id)}>DELETE</button>
                  </div>  
             </li>
    })
  }
  
 
  
  
  return (
    <>
     <main>
        <header>
          <h1 className='w-full p-3 text-4xl text-center font-bold bg-slate-800 text-slate-100 justify-evenly wrap relative'>
          Coders Todo List
          </h1>
          <button className='absolute top-4 right-3 py-1 px-3 rounded-md bg-slate-300'>Login</button>
        </header>
        
        <form onSubmit={handleSubmit}>
        <div className='gap-4 p-4 w-full flex flex-col md:flex md:flex-row'>
          <input type='text'
                  className='border border-slate-800 p-1'
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder = "Title Of Your Task"
                  required
                  />
          <textarea type='textarea'
                  className='border border-slate-800 p-2 '
                  value={desctiption}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Description of your task'
                  required> </textarea>
                  
          <button className='bg-slate-800 text-slate-100 py-1 px-4 rounded-md'>
                Add Task
          </button>
        </div>
        </form>
        
        <hr />
        <div className='w-full bg-slate-600 text-slate-200 h-auto p-4 flex flex-col'>
          <ul>
             {renderTasks}
          </ul>
        </div>
     </main>
    </>
    
  )
}

