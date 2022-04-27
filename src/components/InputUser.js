import React, { useState } from "react";

const InputUser = ({ user: userList, setUser }) => {
  const [user, createUser] = useState({
    name: "",
    age: "",
    // buyin: '',
    // ending: '',
  });

  const handleChange = (event) => {
    if (event.target.name === "age") {
      createUser({
        ...user,
        [event.target.name]: Number(event.target.value),
      });
    } else {
      createUser({
        ...user,
        [event.target.name]: event.target.value,
      });
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const url = "http://localhost:1234";
    const endpoint = "/users";

    try {
      // const body = { user };
      console.log("client request", user);
      const response = await fetch(`${url}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "Application/JSON" },
        body: JSON.stringify(user),
      });

      const res = await response.json();
      alert(
        `
        Response from server:
        ${JSON.stringify(res)}
        `
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="input-container">
      <h3>Add Player</h3>
      <form className="input-form" onSubmit={onSubmitForm}>
        <div className="input-row">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={user.age}
            onChange={handleChange}
          />
          <button className="addButton">Create</button>
        </div>
        {/* <div className='input-row'>
          <input
            type='text'
            placeholder='Buy In'
            name='buyin'
            value={user.buyin}
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='Ending'
            name='ending'
            value={user.ending}
            onChange={handleChange}
          />
        </div> */}
      </form>
    </div>
  );
};

export default InputUser;
