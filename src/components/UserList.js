import React, { useEffect, useState } from "react";
import EditBalance from "./EditBalance";
import TotalStat from "./TotalStat";

// { user: userList, setUser }
const UserList = () => {
  const [user, createUser] = useState({
    name: "",
    history: [],
  });

  // const deletePlayer = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/user/${id}`, {
  //       method: 'DELETE',
  //       headers: { 'Content-Type': 'Application/JSON' },
  //     });
  //     setUser(user.filter((player) => player.user_id !== id));
  //     //   console.log(response);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // const getUserList = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5000/api/user');
  //     const list = await response.json();
  //     setUser(list);
  //     //   console.log('list', list);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const getHistory = async (e) => {
    e.preventDefault();

    const url = "http://localhost:1234";
    const endpoint = "/history";

    try {
      const response = await fetch(`${url}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "Application/JSON" },
        body: JSON.stringify({ name: user.name }),
      });

      const data = await response.json();
      console.log("res", data);
      // const userAdded = data.user.rows[0];
      createUser({ name: user.name, history: data });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (event) => {
    createUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  // useEffect(() => {
  //   getUserList();
  // }, []);

  return (
    <>
      {/* <div className='history-container'>
        <div className='check-input'>
          <input
            type='text'
            placeholder='Full Name'
            name='fullname'
            value={user.fullname}
            onChange={handleChange}
          />
          <button className='check-button' onClick={getHistory}>
            Check History
          </button>
        </div>
      </div> */}
      <form className="check-form" onSubmit={getHistory}>
        {/* <div className='input-row'> */}
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <button className="check-button">Get History</button>
        {/* </div> */}
      </form>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Player</th>
            <th>History</th>
            {/* <th>Ending</th>
            <th>Profit</th>
            <th>Balance</th>
            <th>Delete</th> */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.name}</td>
            <td>{JSON.stringify(user.history)}</td>
          </tr>
          {/* {user.map((player, index) => (
            <tr key={index}>
              <td>{player.fullname}</td>
              <td>{player.history}</td>
              <td>{player.ending}</td>
              <td>{player.profit}</td>
              <td>
                <EditBalance balance={player.balance} />
              </td>
              <td>
                <button
                  className='deleteButton'
                  onClick={() => deletePlayer(player.user_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
      {/* <TotalStat total={equilibrium} /> */}
    </>
  );
};

export default UserList;
