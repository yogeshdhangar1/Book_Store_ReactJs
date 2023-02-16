
import axios from "axios";

class UserService {

    baseUrl = 'http://localhost:9094/bookstore'


    userRegistration = (user) => {
        return axios.post(`${this.baseUrl}`+ "/register", user);
    }

    userLogin = (user) => {
        console.log(user);
        return axios.post(`${this.baseUrl}` + "/login", user);
    }

    forgotPassword = (email) => {
        console.log(email);
        return axios.post(`${this.baseUrl}` + "/forgotpassword/?email="+ email);
    }

    resetPassword = (otp,password)=>{
        return axios.post(`${this.baseUrl}`+"/resetpassword/" + otp + "?password="+password)
    }
    
}

export default new UserService();