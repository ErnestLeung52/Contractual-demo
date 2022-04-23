import React, { useEffect } from 'react';
import EditBalance from './EditBalance';
import TotalStat from './TotalStat';

const UserList = ({ user, setUser }) => {
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

  const getUserList = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user');
      const list = await response.json();
      setUser(list);
      //   console.log('list', list);
    } catch (error) {
      console.error(error.message);
    }
  };

  let equilibrium = 0;
  user.forEach((player) => {
    equilibrium += Number(player.profit);
  });

  // useEffect(() => {
  //   getUserList();
  // }, []);

  return (
    <>
      <div>
        <span>Check History</span>
        <button onClick={getUserList}>Check</button>
      </div>
      <table className='styled-table'>
        <thead>
          <tr>
            <th>Player</th>
            <th>History</th>
            {/* <th>Ending</th>
            <th>Profit</th>
            <th>Balance</th> */}
            {/* <th>Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {user.map((player, index) => (
            <tr key={index}>
              <td>{player.fullname}</td>
              <td>{player.history}</td>
              {/* <td>{player.ending}</td>
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
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <TotalStat total={equilibrium} /> */}
    </>
  );
};

export default UserList;
