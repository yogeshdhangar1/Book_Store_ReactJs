import React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./RegistrationForm.css"
import UserService from '../../services/UserService';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Button } from '@mui/material';

export default function RegistrationForm() {

    const [date, setDate] = React.useState(null);

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

  
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    let [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        address: "",
        dateOfBirth: "",
        phoneNumber: "",
        email: "",
        password: "",
        isVerified: false,
    });

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserDetails({ ...userDetails,
            [name]: value,
         
        });
        console.log(userDetails);
    };
    

    const registration = (event) => {
        event.preventDefault();
        let userData = {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            address: userDetails.address,
            dateOfBirth: userDetails.dateOfBirth,
            phoneNumber: userDetails.phoneNumber,
            email: userDetails.email,
            password: userDetails.password,
        };

        UserService.userRegistration(userData).then((response) => {
            console.log("created" + response);
            alert("Registred successfully...Please check your mail for verification");
        }).catch((response) => {
            alert(response.response.data.data);
        });

    };

    return (
        <div className="form-content">
            <form action="#" className="form" onSubmit={registration} >
                <div className="form-head">
                    <h3 className="head-text">USER REGISTRATION</h3>
                    <div className="cancel-button" >
                        <a href="/home"><ClearOutlinedIcon color='error' /></a>
                    </div>
                </div>

                <div className="row-content">
                    <TextField
                        style={{ margin: '10px' }}
                        className="input-reg"
                        type="text"
                        id="fname"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={userDetails.firstName}
                        onChange={handleInput}
                        label="First Name"
                        required
                    />
                    <TextField
                        style={{ margin: '10px' }}
                        className="input-reg"
                        type="text"
                        id="lname"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={userDetails.lastName}
                        onChange={handleInput}
                        label="Last Name"
                        required
                    />
                </div>

                <div className="row-content">
                    <TextField
                        style={{ margin: '10px' }}
                        className="input-reg"
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email Id"
                        required
                        label="Email"
                        value={userDetails.email}
                        onChange={handleInput}
                    />
                    <TextField
                        style={{ margin: '10px' }}
                        id="address"
                        type="text"
                        className="input-reg"
                        name="address"
                        placeholder="ADDRESS"
                        label="address"
                        required
                        value={userDetails.kyc}
                        onChange={handleInput}
                    />
                </div>

                <div className="row-content">
                    <FormControl sx={{ width: '29ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            style={{ margin: '10px' }}
                            id="outlined-adornment-password"
                            name="password"
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
                            label="Password"
                        />
                    </FormControl>
                    <TextField
                        style={{ margin: '10px' }}
                        className="input-reg"
                        type="text"
                        name="phoneNumber"
                        id="phone"
                        placeholder="Phone Number"
                        label="Phone number"
                        required
                        value={userDetails.phoneNumber}
                        onChange={handleInput}
                    />
                </div>

                <div className="date">
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DatePicker
                            className="input-reg"
                            label="Date of Birth"
                            value={date}
                            onChange={(newValue) => {
                                setDate(newValue);
                            }}
                            renderInput={(params) => <TextField className="input-reg-date"{...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <div className="button">
                    <Button variant='contained' size='medium' color='inherit' type="submit" className="button" id="button"  >Sign Up </Button>
                </div>

                <div className="link">
                    <Link to="/login" className="link"> Click here to Login </Link>
                </div >

            </form>
        </div>

    )
}