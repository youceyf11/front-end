import {BACKEND_URL} from "../config.ts";
import axios, {AxiosResponse} from "axios";
import {LoginRequest} from "../types/login-request.ts";
import {UserCreateRequest} from "../types/user-create-request.ts";

const API_URL= `${BACKEND_URL}/api/v1/auth` ;

export const login=(loginRequest:LoginRequest): Promise<AxiosResponse<boolean>> => {
    return axios.post<boolean>(API_URL+"/login",loginRequest);
}

export const register=(userCreateRequest : UserCreateRequest):Promise<AxiosResponse<void>> => {
    return axios.post<void>(API_URL+"/register",userCreateRequest);
}


