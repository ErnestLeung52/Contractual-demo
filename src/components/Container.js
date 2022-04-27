import React, { useState } from 'react';
import InputUser from './InputUser';
import UserList from './UserList';
import UpdateBalance from './UpdateBalance';

function Container() {
  const [user, setUser] = useState([]);

  return (
    <div className='sub-container'>
      <h1>
        Cali Hold'em
      </h1>
      <InputUser setUser={setUser} user={user} />
      <UpdateBalance setUser={setUser} user={user} />
      <UserList setUser={setUser} user={user} />
    </div>
  );
}

export default Container;
