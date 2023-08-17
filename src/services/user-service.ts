import apiClient from "./api-client";
import create from "./http-service";

// Not all object properties need to be included
export interface MyUser {
  id: number;
  name: string;
}

export default create('/users');