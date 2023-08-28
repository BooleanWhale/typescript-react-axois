import React, { useEffect, useState } from 'react'
import UserService, { MyUser } from '../services/user-service';
import useUsers from '../hooks/useUsers';
import { CanceledError } from 'axios';

type Props = {}

export default function AxiosFetch({}: Props) {
  // custom hook for loading users
  const { users, setUsers, errorMessage, setErrorMessage, loading } = useUsers();

  const deleteUser = (user:MyUser):void => {
    const backupUsers = [...users];
    setUsers(users.filter(u => u.id !== user.id));
    
    UserService.delete(user)
      .catch(error => {
        if (error instanceof CanceledError) return;
        setErrorMessage(error.message);
        setUsers(backupUsers);
      })
  }

  const addUser = (newUser:MyUser):void => {
    const backupUsers = [...users];
    setUsers([newUser, ...users]);
    UserService.add(newUser)
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
    UserService.update(updatedUser)
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