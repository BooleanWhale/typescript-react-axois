import apiClient from "./api-client";

// Not all object properties need to be included
interface Item {
  id: number;
}

// <T> is a placeholder type
// Types are used in calls as getAll<MyUser>
class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal
    })
    return { request, cancel: () => controller.abort() }
  }

  // T extends from the Item interface
  delete<T extends Item>(item: T) {
    return apiClient.delete(this.endpoint + '/' + item.id);
  }

  add<T extends Item>(item: T) {
    return apiClient.post(this.endpoint , item);
  }

  update<T extends Item>(item: T) {
    return apiClient.patch(this.endpoint + '/' + item.id, item)
  }
}

// A function is need instead of a straight export of the class
// This allows custom endponts
const create = (endpoint: string) => {
  return new HttpService(endpoint); 
}

export default create; 