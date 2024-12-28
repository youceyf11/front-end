import { CategorieResponse } from "../types/categorie-response.ts";
import {BACKEND_URL} from "../config.ts";
import axios, { AxiosResponse } from "axios";

const API_URL = `${BACKEND_URL}/api/v1/categorie`;

export const getAllCategories = (): Promise<AxiosResponse<CategorieResponse[]>> => {
    return axios.get<CategorieResponse[]>(API_URL);
};

export const createCategorie=(data:Partial<CategorieResponse>):Promise<AxiosResponse<CategorieResponse>> => {
    return axios.post<CategorieResponse>(API_URL,data);
};

export const updateCategorie=(id: string, data:Partial<CategorieResponse>):Promise<AxiosResponse<CategorieResponse>> => {
    return axios.put<CategorieResponse>(`${API_URL}/${id}`, data);
};

export const deleteCategorie=(id:string):Promise<AxiosResponse<CategorieResponse>> =>{
    return axios.delete<CategorieResponse>(`${API_URL}/${id}`);
};

export const getCategorie=(id:string):Promise<AxiosResponse<CategorieResponse>> =>{
    return axios.get<CategorieResponse>(`${API_URL}/${id}`);
}

