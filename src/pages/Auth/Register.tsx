import React, {useState} from "react";
import {UserCreateRequest} from "../../types/user-create-request.ts";
import {register} from "../../services/authentification-service.ts";
import {Button, Container, TextField, Typography} from "@mui/material";

export default function RegisterPage(){
    const [user, setuser]= useState<Partial<UserCreateRequest>>({
        name:'',
        email:'',
        password:''
    });

    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value}=e.target;
        setuser(prevState => ({...prevState,[name] : value}));
    };

    const handleSubmit= async () => {
        const {name,email,password}= user;
        if( !name || !email || !password)
            return;
        const userCreateRequest: UserCreateRequest = {
            name,
            email,
            password
        };
        const response = await register(userCreateRequest);
        console.log(response);
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4"
                        component="h1"
                        align="center"
                        color="textPrimary"
                        gutterBottom>
                Register
            </Typography>

            <TextField
                fullWidth
                margin="normal"
                label="Name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
            />

            <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
            />

            <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                Register
            </Button>

        </Container>
    );
}
