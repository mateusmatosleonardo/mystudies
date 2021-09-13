import React, { useState } from "react";
import './style/App.css'

function App(){

    const [tasks, setTasks] = useState([

    ]); // Estados para armazenar as tasks

    const [modal, setModal] = useState(false);

    const openModal = ()=>{
        setModal(!modal) // se tiver false coloca true e se tiver true coloca como false
    }

    const saveTask =()=>{
        var task = document.getElementById('content-task')
        setTasks([
            ...tasks,
            {
                id: new Date().getTime(),
                task: task.value,
                finalizada: false
            }
        ])

        setModal(false) // para fechar a modal depois que adicionar a tarefa
    }

    const mark = (id, opt)=>{
        let newTasks = tasks.filter((val)=>{
            if(val.id === id){
                val.finalizada = opt // parâmetro passado para marcar e desmarcar 
            }
            return val
        })

        setTasks(newTasks)
    }

    const delTasks = (id)=>{
        let newTasks = tasks.filter((val)=>{
            if(val.id !== id){
                return val
            }
        })
        setTasks(newTasks)
    }

    /* CLOCK */

    setInterval(()=>{
        var currentTime = new Date()
        let hours = currentTime.getHours()
        let minutes = currentTime.getMinutes()
        let seconds = currentTime.getSeconds()

        document.getElementById('clock').innerHTML = hours.toString() + ':' + minutes.toString() + ':' + seconds.toString()

    }, 1000)

    var today = new Date()
    var hour = today.getHours()
    var message;

    if(hour >= 18){
        message = 'Boa noite'
    }else if(hour > 12){
        message = 'Boa tarde'
    }else if(hour > 0){
        message = 'Bom dia'
    }else{
        message = 'Seja bem vindo!'
    }

    console.log(message)

    return(
        <div className="main">
            {/* MODAL */}
            {
                modal?
                <div className="modal">
                    <div className="container-modal">
                        <h3>Add task</h3>
                        <input id="content-task" type="text" placeholder="add a task"/>
                        <button onClick={()=>saveTask()}>Save</button>
                    </div>
                </div>
                :
                <div></div>
            }
            
            <div onClick={()=> openModal()} className="addTask">+</div>
            <div className="box">
                <h2>My Studies</h2>
                {
                    tasks.map((val)=>{ // para mapear as tarefas finalizadas e não finalizadas
                        if(!val.finalizada){
                            return(
                                <div className="single-task">
                                    <p onClick={()=> mark(val.id, true)}>{val.task}</p>
                                    <i onClick = {()=> delTasks(val.id)} style={{color: 'red'}} class="fa fa-times" aria-hidden="true"></i>
                                </div>
                            )
                        }else{
                            return(
                                <div className="single-task">
                                    <p onClick={()=> mark(val.id, false)} style={{textDecoration:'line-through'}}>{val.task}</p>
                                    <i onClick = {()=> delTasks(val.id)} style={{color: 'red'}} class="fa fa-times" aria-hidden="true"></i>
                                </div>
                            )   
                        }
                    })
                }
            </div>
            <div id="clock" className="clock"></div>
                <div className="message">
                    <p>{message}</p>
                </div>
        </div>
    );
};

export default App;