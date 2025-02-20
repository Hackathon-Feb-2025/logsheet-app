import axios from 'axios';

// const usersUrl = 'http://localhost:3003/users';
const usersUrl = 'https://localhost:5063/api/User';

// export const getUsers = async (id) => {
//     id = id || '';
//     return await axios.get(`${usersUrl}/${id}`);
// }

export const addUser = async (user) => {
    debugger;
    return await axios.post(`${usersUrl}/signup`, user);
}

// export const deleteUser = async (id) => {
//     return await axios.delete(`${usersUrl}/${id}`);
// }

// export const editUser = async (id, user) => {
//     return await axios.put(`${usersUrl}/${id}`, user)
// }

