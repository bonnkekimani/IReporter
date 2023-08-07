import React from "react";
import { Form,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useForm} from 'react-hook-form';
import { login } from "../auth";
import { useNavigate } from 'react-router-dom';

const LoginPage=()=>{

    const{register,handleSubmit,reset,formState:{errors}}=useForm()
    const navigate=useNavigate()

    const loginUser=(data)=>{
        console.log(data)

        const requestOption={
            method:"POST",
            headers:{
                'content-Type': 'application/json; charset=UTF-8'
            },
            body:JSON.stringify(data)
        }
    
    
        fetch("/auth/login", requestOption)
        .then(resp=> resp.json())
        .then(data=>{
            console.log(data.access_token)
            login(data.access_token)

            navigate('/')
        })
        reset()
    }

    return(
        <div className="container">
        <div className="form">
        <h1>Login Page</h1>
        <form>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Your email"
                {...register("email",{required:true,maxLength:25})}/>
            </Form.Group>
            {errors.email && <p style={{color:"red"}}><small>email required</small></p>}
            <br></br>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Your password"
                {...register("password",{required:true,minLength:6})}/>   
            </Form.Group>
            {errors.password && <p style={{color:"red"}}><small>your password is required</small></p>}
            {errors.password?.type === "minLength" && <p style={{color:"red"}}><small>password should be atleast 6 characters </small></p>}
            <br></br>
            <Form.Group>
                <Button type="sub" variant="primary" onClick={handleSubmit(loginUser)}>LOGIN</Button>
            </Form.Group>

            <Form.Group>
                <small>Do not have an account? <Link to='/signup'>Create account</Link></small>
            </Form.Group>
        </form>
        </div>
    </div>
    )
}
export default LoginPage;