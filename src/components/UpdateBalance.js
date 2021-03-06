import React, { useState } from "react";

const UpdateBalance = ({ user: userList, setUser }) => {
  const [user, createUser] = useState({
    fullname: "",
    change: "",
  });

  const handleChange = (event) => {
    // createUser({
    //   ...user,
    //   [event.target.name]: event.target.value,
    // });
    if (event.target.name === "change") {
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
    const endpoint = "/balance";

    // console.log(user);
    try {
      const response = await fetch(`${url}${endpoint}`, {
        method: "PATCH",
        headers: { "Content-Type": "Application/JSON" },
        body: JSON.stringify(user),
      });

      const res = await response.json();
      // const userAdded = data.user.rows[0];
      // console.log(data);
      // setUser([...userList, userAdded]);
      alert(`
      Successfully changed balance by ${user.change}.
      Current balance is ${JSON.stringify(res)}
      `);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="input-container">
      <h3>Update Balance</h3>
      <form className="input-form" onSubmit={onSubmitForm}>
        <div className="input-row">
          <input
            type="text"
            placeholder="Full Name"
            name="fullname"
            value={user.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Change"
            name="change"
            value={user.change}
            onChange={handleChange}
          />
          <button className="addButton">Update</button>
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

export default UpdateBalance;
