import React, { useEffect, useState } from "react";
import { employeeData } from "./EmployeeData";

const CrupOperation = () => {
  const [data, setData] = useState([]);
  // need a state step 5
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0); //
  const [isUpdated, setUpdated] = useState(false);

  // 3rd step take useEffect and setData eployeeData

  useEffect(() => {
    setData(employeeData);
  }, []);

  //function used to geting id for editing
  const handleEdit = (id) => {
    // how we can edit any id and get id
    const dt = data.filter((item) => item.id === id);
    if (dt !== undefined) {
      setUpdated(true);
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  };

  // getting a id for delete step
  // step 4

  const handleDelete = (id) => {
    // map all data and filter id and check not eqaul to id and update in setData
    // add a window for confirmation box for deletion
    if (window.confirm("Are you sure to delete this items")) {
      const deleteItem = data.filter((item) => item.id !== id); // delete id is very simple
      setData(deleteItem);
    }
  };

  const handleSave = () => {
    const dot = [...data];
    const newmemberAdd = {
      id: employeeData.length + 1,
      firstName: firstName,
      lastName: lastName,
      age: age,
    };
    dot.push(newmemberAdd);
    setData(dot);

    // const dt = [...data];
    // // save data after click on save
    // const newData = {
    //   id: employeeData.length + 1,
    //   firstName: firstName,
    //   lastName: lastName,
    //   age: age,
    // };
    // dt.push(newData);
    // setData(dt);
  };

  const handleClear = () => {
    setId(0);
    setFirstName("");
    setLastName("");
    setAge("");
    setUpdated(false);
  };

  const handleUpdate = () => {
    const index = data
      .map((item) => {
        return item.id;
      })
      .indexOf(id);

    const dt = [...data];
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;
    setData(dt);
    handleClear();
    // const index = data
    //   .map((item) => {
    //     return item.id;
    //   })
    //   .indexOf(id);
    // const dt = [...data];
    // dt[index].firstName = firstName;
    // dt[index].lastName = lastName;
    // dt[index].age = age;
    // setData(dt);
    // handleClear("");
  };

  return (
    <div className="App">
      <div style={{ justifyContent: "center", display: "flex", marginTop: "" }}>
        <div>
          <label>
            First Name:
            <input
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Age:
            <input
              type="text"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
        </div>
        <div>
          {!isUpdated ? (
            <button className="btn btn-primary" onClick={() => handleSave()}>
              Save
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => handleUpdate()}>
              Update
            </button>
          )}

          <button className="btn btn-danger" onClick={() => handleClear()}>
            Clear
          </button>
        </div>
      </div>
      <table className="table table-hove">
        <thead>
          <tr>
            <td>Sr.No</td>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>{" "}
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CrupOperation;
