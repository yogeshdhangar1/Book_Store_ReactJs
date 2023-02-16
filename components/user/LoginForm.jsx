import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button } from '@mui/material';
import "./LoginForm.css"
import UserService from '../../services/UserService';

export default function LoginForm(props) {

    
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
    });

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserDetails({ ...userDetails, [name]: value });
        console.log(userDetails);
    };

    const login = (event) => {
        event.preventDefault();
        let loginData = {
            email: userDetails.email,
            password: userDetails.password,
        };

        UserService.userLogin(loginData).then((response) => {
            
            console.log("Login" + response.data.data)


            alert("Logined successfully");
            props.history.push({
                pathname: "/home",
            });

            let token = response.data.data.jwtToken;
            localStorage.setItem("jwtToken", token);
            
            let firstName = response.data.data.firstName;
            localStorage.setItem("firstName", firstName)

            let userId = response.data.data.userId;
            localStorage.setItem("userId", userId)
            
            window.location.reload();
        }).catch((response) => {
            alert(response.response.data.data);
        });

    };


    return (
        <div>

            <div className="form-content-login">

                <form className="form-login" action="#" onSubmit={login}>

                    <div className="form-head-content">
                        <div className="form-head-login">Book Store Login</div>
                    </div>

                    <div className="row-content-login">
                        <TextField
                            className="input-login"
                            id="outlined-helperText"
                            type="text"
                            name="email"
                            label="Email"
                            placeholder="Email"
                            required
                            onChange={handleInput}
                        />
                    </div>
                    <div className="row-content-login">

                        <FormControl sx={{ width: '24ch' }} variant="outlined">
                            <OutlinedInput
                                id="outlined-adornment-password"
                                name="password"
                                placeholder='Enter password'
                                type={values.showPassword ? 'text' : 'password'}
                                value={userDetails.password}
                                onChange={handleInput}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            required
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                className="password-login"
                            />
                        </FormControl>

                    </div>



                    <div className='button-login'>
                        <Button variant="contained" size="medium" color="inherit" className='button-login' type="login"> Login</Button>
                    </div>

                    <div className="link">
                        <Link to="/registration" className="link"> Click here to Register </Link>
                    </div>

                    <div className="link">
                        <Link to="/forgotpass" className="link"> Forgot password? </Link>
                    </div>
                </form>

            </div>
        </div>
    )
}