import apiClient from "./api-client";

// Not all object properties need to be included
export interface MyUser {
  id: number;
  name: string;
}

class UserService {
  getAllUsers() {
    const controller = new AbortController();
    const request = apiClient.get<MyUser[]>('/users', {
      signal: controller.signal
    })
    return { request, cancel: () => controller.abort() }
  }

  deleteUser(user:MyUser) {
    return apiClient.delete('/users/' + user.id);
  }

  addUser(user:MyUser) {
    return apiClient.post('/users', user);
  }

  updateUser(user:MyUser) {
    return apiClient.patch('/users/' + user.id, user)
  }
}

export default new UserService();