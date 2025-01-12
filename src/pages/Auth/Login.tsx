import {useState} from "react";
import {LoginRequest} from "../../types/login-request.ts";
import {login} from "../../services/authentification-service.ts";
import {Button, Container, TextField, Typography} from "@mui/material";

export default function LoginPage(){
    const [user, setUser]= useState<Partial<LoginRequest>>({
        email: '',
        password: ''
    });

    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value}=e.target;
        setUser(prevState => ({...prevState, [name] : value}));
    };

    const handleSubmit= async () => {

        const {email, password} = user;
        if(!email || !password)
            return;
        const loginRequest:LoginRequest = {
            email,
            password
        };
        const response= await login(loginRequest);
        console.log(response);
    }


    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Login
            </Typography>
            <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleInputChange}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleInputChange}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Login
            </Button>
        </Container>
    );
}