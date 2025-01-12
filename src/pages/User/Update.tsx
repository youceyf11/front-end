import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {UserResponse} from "../../types/user-response.ts";

export default function UpdateUser(){
    const {id} = useParams<{ id: string }>();
    const [user, setUser] = useState<Partial<UserResponse>>({
        name: "",
        email: "" });
    const navigate = useNavigate();

    useEffect(() => {
        if(id){
            console.log('User fetched:', id);
        }else{
            console.error('User not found:', id);
        }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id) {
            console.log('User updated:', user);
            navigate('/user-list');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">User Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name || ''}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">User Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email || ''}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <button type="submit">Update User</button>
        </form>
    );

}