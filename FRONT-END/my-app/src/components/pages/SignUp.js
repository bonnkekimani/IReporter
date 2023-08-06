// import React from 'react';
// import '../../App.css';

// export default function SignUp() {
//   return <h1 class='sign-up'>LIKE & SUBSCRIBE</h1>;
// }
import React, {useState} from "react";
import { Form,Button,Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useForm} from 'react-hook-form';
import '../pages/main.css'

const SignUpPage=()=>{
  
    const{register,watch,handleSubmit,formState:{errors}}=useForm();
    const[show, setShow]=useState(true);
    const[serverResponse, setServerResponse]=useState('');

    const submitForm=(data)=>{
        console.log(data)
        if(data.password===data.confirmPassword){
            
            const body={
                firstName:data.firstName,
                lastName:data.lastName,
                email:data.email,
                gender:data.gender,
                password:data.password,
                phoneNumber:data.phoneNumber
            }
            const requestOptions={
                method: "POST",
                headers:{
                    'content-Type': 'application/json; charset=UTF-8'
                },
                body:JSON.stringify(body)
            }

            fetch("/signup",requestOptions)
            .then(response=>response.json())
            .then(data=>{
                setServerResponse(data.message)
                console.log(serverResponse)

                setShow(true)
            })
            .catch(errors=>console.log(errors))

            // reset()

            }
        else{
            alert('passwords do not match')
        }
    }
    // console.log(watch("firstName"))

    return(
        <div class="container">
            <div class="form">
            {show?
              <>
               <Alert variant="Success" style={{background:"#89d9d9"}} onClose={() => setShow(false)} dismissible>
                <Alert.Heading>success and Welcome!</Alert.Heading>
                <p style={{color:"black"}}>
                        {serverResponse}
                </p>
             </Alert>
            <h1>SignUp Page</h1>  
          </>
        :<h1>SignUp Page</h1>
        }
                
            <form>
                <Form.Group>
                    <Form.Label>firstName</Form.Label>
                    <Form.Control type="text" placeholder="Your firstName "
                    {...register("firstName",{required:true,maxLength:25})}/>
                </Form.Group>
                {errors.firstName && <span style={{color:"red"}}>firstName is required</span>}
                <br></br>
                <Form.Group>
                    <Form.Label>lastName</Form.Label>
                    <Form.Control type="text" placeholder="Your lastName"
                    {...register("lastName",{required:true,maxLength:25})}/>
                </Form.Group>
                {errors.lastName && <span style={{color:"red"}}>lastName is required</span>}
                <br></br>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Your email"
                   {...register("email",{required:true,maxLength:50})}/>
                </Form.Group>
                {errors.email && <span style={{color:"red"}}>Email is required</span>}
                <br></br>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Your password"
                    {...register("password",{required:true,minLength:6})}/>   
                </Form.Group>
                {errors.password && <span style={{color:"red"}}>put your password</span>}
               <br></br>
               
                <br></br>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm your password"
                    {...register("confirmPassword",{required:true,minLength:6})}/> 
                </Form.Group>
                {errors.confirmPassword && <span style={{color:"red"}}>please confirm your password</span>}
                <br></br>
                {errors.confirmPassword?.type==="minLength" && <span style={{color:"red"}}>atleast 6 characters required</span>}
                <br></br>
                <Form.Group>
                    <Form.Label>Gender</Form.Label>
                    <Form.Control type="text" placeholder="Your gender"
                    {...register("gender",{required:true,minLength:2})}/>   
                </Form.Group>
                {errors.gender && <span style={{color:"red"}}>put your gender</span>}
                <br></br>
               {errors.gender?.type==="minLength" && <span style={{color:"red"}}>atleast 2 characters required</span>}
               <br></br>
                <Form.Group>
                    <Form.Label>phoneNumber</Form.Label>
                    <Form.Control type="text" placeholder="Your phonenumber"
                    {...register("phonenumber",{required:true,minLength:6})}/>   
                </Form.Group>
                {errors.phonenumber && <span style={{color:"red"}}>put your phonenumber</span>}
                <br></br>
                <Form.Group>
                    <Button type="sub" variant="primary" onClick={handleSubmit(submitForm)}>SignUp</Button>
                </Form.Group>
                <Form.Group>
                    <small>Already have an account?<Link to='/login'>Login</Link></small>
                </Form.Group>
            </form>
            </div>
        </div>
    )
}
export default SignUpPage;