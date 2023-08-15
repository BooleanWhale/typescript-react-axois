import React, { useEffect, useState } from 'react'
import apiClient, { CanceledError } from '../services/api-client';

type Props = {}

// Not all object properties need to be included
interface MyUser {
  id: number;
  name: string;
}

export default function AxiosFetch({}: Props) {
  const [users, setUsers] = useState<MyUser[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // cleanup function (function built into modern browsers)
    const controller = new AbortController();
    setLoading(true);

    apiClient
      .get<MyUser[]>('/users', {signal: controller.signal})
      .then(response => setUsers(response.data))
      .catch(error => {
        if (error instanceof CanceledError) return;
        setErrorMessage(error.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const deleteUser = (user:MyUser):void => {
    const backupUsers = [...users];
    setUsers(users.filter(u => u.id !== user.id));
    apiClient
      .delete('/users/' + user.id)
      .catch(error => {
        if (error instanceof CanceledError) return;
        setErrorMessage(error.message);
        setUsers(backupUsers);
      })
  }

  const addUser = (newUser:MyUser):void => {
    const backupUsers = [...users];
    setUsers([newUser, ...users]);
    apiClient
      .post('/users', newUser)
      .then(({ data }) => setUsers([data, ...users]))
      .catch(error => {
        if (error instanceof CanceledError) return;
        setErrorMessage(error.message);
        setUsers(backupUsers);
      })
  }

  const updateUser = (user:MyUser):void => {
    const backupUsers = [...users];
    const updatedUser = {...user, name: 'Miss ' + user.name};
    setUsers(users.map(u => u.id !== user.id ? u : updatedUser));
    apiClient
      .patch('/users/' + user.id, updatedUser)
      .catch(error => {
        if (error instanceof CanceledError) return;
        setErrorMessage(error.message);
        setUsers(backupUsers);
      })
  }

  const newUser = { id: 0, name: 'Jaqen' }

  return (
    <>
      {loading && 'loading...'}
      {errorMessage && errorMessage}
      <button className="btn btn-primary mb-3" onClick={() => addUser(newUser)}>Add User</button>
      <ul className="list-group">
        {users.map(user => <li key={user.id}
        className="list-group-item d-flex justify-content-between">
         {user.name}
          <div>
          <button className="btn btn-secondary"
              onClick={() => updateUser(user)}
            >Update</button>   
            <button className="btn btn-outline-danger"
              onClick={() => deleteUser(user)}
            >Delete</button> 
          </div>
        </li>)}
      </ul>
    </>
  )
}