import axios from 'axios';

// const usersUrl = 'http://localhost:3003/users';
const usersUrl = 'https://localhost:7029/api/User';

const coursesUrl = 'http://localhost:8080/courses';

const employeeUrl = 'http://localhost:8080/employees/staff';
export const getEmployee = async () => {
    return await axios.get(employeeUrl);
}

export const getCourses = async () => {
    return await axios.get(coursesUrl);
};
export const signUp= async (id) => {
    id = id || '';
    return await axios.get(`${usersUrl}/${id}`);
}

export const addUser = async (user) => {
    return await axios.post(`${usersUrl}/add`, user);
}

export const deleteUser = async (id) => {
    return await axios.delete(`${usersUrl}/${id}`);
}

export const editUser = async (id, user) => {
    return await axios.put(`${usersUrl}/${id}`, user)
}

