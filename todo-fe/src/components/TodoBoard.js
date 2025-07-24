import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({todoList, deleteItem, toggleComplete}) => {
  return (
    <div>
      <h2>Todo List</h2>
      {todoList.length > 0 ? ( // todoList 보여줄 것이 있다면
          todoList.map((item) => (
              <TodoItem key={item._id} item={item} deleteItem={deleteItem} toggleComplete={toggleComplete} />
          ))
      ) : (
          <h2>There is no Item to show</h2>
      )}
      {/* <TodoItem/> will be here once we get the todoList */}
      {/*<h2>There is no Item to show</h2>*/}
    </div>
  );
};

export default TodoBoard;
