import { useState } from "react"

// function to format the dates in DDMMYYY
 export  const formatDateToDDMMYYYY = (date) => {
  if (!date || isNaN(date.getTime())) { // Handle invalid date objects
    return '';
  }
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Main component to be rendered
function InputField({setTasks,setNewTaskBool}){
          
  const [formValue,setFormValue]=useState({todo:"",date:""});

  // Input field change handler
  const changeHandler=(e)=>{
         const {name,value}=e.target;
       setFormValue((prev)=>({...formValue,[name]:value}))
       console.log(formValue)
  }

   const submitHandler=(e)=>{
    e.preventDefault();
    //  setNewTaskBool(false)

    // !Input validation ,that empty task can't be created
    if(formValue.todo.trim() && formValue.date){
          const today=new Date();
          today.setHours(0,0,0,0)
              if(today <= new Date(formValue.date)){
                           const task={
                  id:Date.now(),
                  ...formValue,
                  date:formatDateToDDMMYYYY(new Date(formValue.date)),

                  isDone:false
                  
                }
               
                setTasks((prev)=>([...prev,task]));

                setFormValue({todo:"",date:""})
                setNewTaskBool(true)
                
              }
               else{
                alert("Please Enter a valid date")
               }
    }
    else{
      alert('Please ensure all fields are filled') //alert If any field value is missing
    }
   }
  return (
       <form className="input_box"  onSubmit={submitHandler}>
      
        <input className="input text" value={formValue.todo} placeholder="Add a Task, Multiply the Stress" type="text" name="todo" onChange={changeHandler} />
       {
        formValue?.todo &&  <div className="internalDiv">
          <label  htmlFor="date" >Enter Deadline</label>
          <input className={`input  `} placeholder="Deadline" id="date" value={formValue.date}  type="date"  name="date" onChange={changeHandler}/>
        </div>
       }
           <button   type="submit" className="input__btn">
        Add Task
      </button>

       </form>
  )
}


export default InputField