import React from "react";
import Button from "../button/Button";
import "./todoItem.css";

const TodoItem = ({ label }) => {
  const style = {
    // color: important ? 'steelblue' : 'black',
    // fontWeight: important ? 'bold' : 'normal'
  };

  return (
    <div className="todoItemWrapper">
      <div className="todoItem" style={style}>
        {label}
        <div className="itemButtons">
          <Button className={"itemButton"} type="button" />
          <Button className={"itemButton"} type="button" />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
