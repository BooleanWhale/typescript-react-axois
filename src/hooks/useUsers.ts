import { useState, useEffect } from 'react';
import userService, { MyUser } from '../services/user-service';
import { CanceledError } from 'axios';

const useUsers = () => {
  const [users, setUsers] = useState<MyUser[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // cleanup function (function built into modern browsers)
    const controller = new AbortController();
    setLoading(true);

    const { request, cancel } = userService.getAll<MyUserer>();
      request
      .then(response => setUsers(response.data))
      .catch(error => {
        if (error instanceof CanceledError) return;
        setErrorMessage(error.message);
      })
      .finally(() => setLoading(false));

    return () => cancel();
  }, []);

  return { users, setUsers, errorMessage, setErrorMessage, loading, setLoading };
}

export default useUsers;