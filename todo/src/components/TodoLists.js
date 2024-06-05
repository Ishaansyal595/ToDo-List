import React, { useState, useEffect } from "react";

function TodoLists() {
  const [activity, setActivity] = useState("");
  const [priority, setPriority] = useState("Low");
  const [listData, setListData] = useState([]);
  function addActivity() {
    setListData((listData) => {
      const newTask = { activity, priority };
      const updatedList = [newTask, ...listData];
      console.log(updatedList);
      setActivity("");
      setPriority("low");
      return updatedList;
    });
  }

  useEffect(() => {
    const storedListData = localStorage.getItem("listData");
    if (storedListData) {
      setListData(JSON.parse(storedListData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("listData", JSON.stringify(listData));
  }, [listData]);

  function removeActivity(i) {
    const updatedListData = listData.filter((elem, id) => {
      return i != id;
    });
    setListData(updatedListData);
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      default:
        return "green";
    }
  }

  function removeAllActivity() {
    setListData([]);
  }

  return (
    <>
      <div className="container">
        <div className="header">TODO LIST</div>
        <div className="input">
          <input
            type="text"
            placeholder="Add Your Todo"
            value={activity}
            onChange={(e) => {
              setActivity(e.target.value);
            }}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button onClick={addActivity}>Add</button>
        </div>
        <p className="list-heading">Here's your List</p>
        {listData.length > 0 &&
          listData.map((data, i) => {
            return (
              <>
                <span key={i}>
                  <div className="listData">
                    {data.activity}:-
                    <span style={{ color: getPriorityColor(data.priority) }}>
                      {data.priority}
                    </span>
                  </div>
                  <div className="remove-btn">
                    <button onClick={() => removeActivity(i)}>Remove</button>
                  </div>
                </span>
              </>
            );
          })}
        {listData.length >= 1 && (
          <button className="removeAll-btn" onClick={removeAllActivity}>
            Remove All{" "}
          </button>
        )}
      </div>
    </>
  );
}

export default TodoLists;
