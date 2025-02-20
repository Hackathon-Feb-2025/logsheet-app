// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from backend API when component mounts
    axios.get('http://localhost:5063/api/User')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.userName}</li>
        ))}
      </ul>
    </div>
  );
}

export default GetUser;
