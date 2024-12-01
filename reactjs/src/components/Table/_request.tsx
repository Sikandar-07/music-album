// API Requests
import axios from "axios";
import { from } from "rxjs";

const BASE_URL = "http://localhost:7072";

export async function getEmployees$() {
  return from(axios.get(`${BASE_URL}/movies`));
}



export async function addEmployee$(id: number) {
  return from(axios.post(`${BASE_URL}/movies/${id}`));
}

export async function deleteEmployee$(id: number) {
  return from(axios.delete(`${BASE_URL}/movies/${id}`));
}
