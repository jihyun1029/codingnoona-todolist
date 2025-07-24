import {useEffect, useState} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from './utils/api';

function App() {
    const [todoList, setTodoList] = useState([]);
    const [todoValue, setTodoValue] = useState('');

    const getTask = async () => {
        const response = await api.get('/tasks'); // api 가져오기
        console.log('rrrr', response);
        setTodoList(response.data.data);
    };

    const addTask = async () => {
        try {
            const response = await api.post('/tasks', { // 어떤 내용을 생성하고 싶은지도 전달해줘야 한다.
                task:todoValue,
                isComplete: false
            });
            if (response.status === 200) {
                console.log('성공')
                // 1. 입력한 값이 안 사라짐
                setTodoValue('');
                // 2. 추가한 값이 안 보임
                getTask()
            } else {
                throw new Error('task can not be added')
            }
        } catch (err) {
            console.log('error', err)
        }
    }

    const toggleComplete = async (id) => {
        try {
            const task = todoList.find((item) => item._id === id);
            const response = await api.put(`/tasks/${id}`, {
                isComplete: !task.isComplete,
            });
            if (response.status === 200) {
                getTask();
            }
        } catch (err) {
            console.log('error', err)
        }
    }

    const deleteItem = async (id) => {
        try {
            const response = await api.delete(`/tasks/${id}`);
            if (response.status === 200) {
                getTask();
            }
        } catch (err) {
            console.log('error', err);
        }
    }

    useEffect(() => {
        getTask()
    }, []);
  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event)=>setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>

      <TodoBoard
          todoList={todoList}
          deleteItem={deleteItem}
          toggleComplete={toggleComplete}
      />
    </Container>
  );
}

export default App;
