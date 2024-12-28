import axios, {AxiosResponse} from "axios"
import {BACKEND_URL} from "../config.ts";
import {TaskResponse} from "../types/task-response.ts";

const API_URL=`${BACKEND_URL}/api/v1/task`;

export const getAllTasks =() : Promise<AxiosResponse<TaskResponse[]>> =>{
    return axios.get<TaskResponse[]>(API_URL);
};

export const getTask=(id:string):Promise<AxiosResponse<TaskResponse>> =>{
    return axios.get<TaskResponse>(`${API_URL}/${id}`);
};

export const createTask=(data:Partial<TaskResponse>):Promise<AxiosResponse<TaskResponse>> =>{
    return axios.post<TaskResponse>(API_URL ,data);
};

export const updateTask=(id:string , data:Partial<TaskResponse>):Promise<AxiosResponse<TaskResponse>> =>{
    return axios.put<TaskResponse>(`${API_URL}/${id} `, data);
};

export const deleteTask=(id:string):Promise<AxiosResponse<TaskResponse>> =>{
    return axios.delete<TaskResponse>(`${API_URL}/${id}`);
};

