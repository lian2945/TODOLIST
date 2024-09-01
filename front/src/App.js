import "./App.css"
import doneImage from "./done.png"
import notdoneImage from "./notdone.png"
import deleteImage from "./delete.png"
import axios from "axios";
import {useState, useEffect} from "react";
const url = "http://localhost:4000";

function ToDoListApp() {
  const [ToDoList, setToDoList] = useState([]);
  
  const GetToDoList = async () => { //eslint-disable-line no-unused-vars
    try {
      const response = await axios.get(url);
      setToDoList(response.data);
    }
    catch {
      alert("Error");
    }
  };

  const PostToDoList = async (event) => {
    event.preventDefault();
    if (event.target.Task.value.length>20) {
      alert("ToDo 내용이 너무 깁니다.")
      event.target.Task.value="";
      return;
    }
    else if(event.target.Task.value.length<1) {
      alert("ToDo 내용이 없습니다.")
      return;
    }
    try {
      await axios.post(url, { "name": event.target.Task.value, "done": "notdone" });
      event.target.Task.value="";
      GetToDoList();
    }
    catch {
      alert("ToDoList에 추가할 것을 다시 적어주세요.");
    }
  };

  const PutToDoList = async (event) => { //eslint-disable-line no-unused-vars
    try {
      await axios.put(url, {"name": event.target.dataset.todoid, "done": event.target.alt==="done"?"notdone":"done"});
      GetToDoList();
    }
    catch {
      alert("Error")
    }
  };

  const DeleteToDoList = async (event) => { //eslint-disable-line no-unused-vars
    try {
      await axios.delete(url, {data: {"name":event.target.dataset.todoid}});
      GetToDoList();
    }
    catch {
      alert("Error");
    }
  };

  function ToDoElement({ donealt, done, name }) {
    return (
      <div key={name} className="ToDoElement">
        <img data-todoid={name} onClick={PutToDoList} className="imageToDoElement" alt={donealt} src={done}/>
        <p data-done={donealt} className="pToDoElement">{name}</p>
        <img data-todoid={name} onClick={DeleteToDoList} className="deleteToDoElement" src={deleteImage} alt="Delete"/>
      </div>
    )
  }

  useEffect(() => {
    GetToDoList()
  }, []);

  return (
    <div className="ToDoList">
      <h2 id="Text">To-Do List</h2>
      <form onSubmit={PostToDoList} id="FormToDo">
        <input name="Task" id="addTask" placeholder="Add your task"/>
        <input value="ADD" type="submit" id="addTaskBtn"/>
        {
          ToDoList.map(( element ) => (
            <ToDoElement key={element.name} donealt={element.done} done={element.done === "done" ? doneImage : notdoneImage} name={element.name} />
          ))
        }
      </form>
    </div>
  );
}

export default ToDoListApp;