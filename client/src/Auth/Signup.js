import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Authcontext } from "../Context/Authcontext";

const Signup = (props) => {
    const classes = useStyles();
    const [setUser] = useContext(Authcontext);
    const [input, setInput] = useState({
        name: '',
        email: '',
        password:'',
        create_at: new Date(),
        update_at: new Date(),
    });
    const [error, setError] = useState({name: '', email:'', password:''})

    const handleChange = (event) => {
        const newError = {...error}
        const newInput = {...input}
        const name = event.target.name;
        const value = event.target.value;

        switch(name) {
            case "name":
                if(!value) {
                    newError[name] = "Name Required!"
                }else{
                    newError[name] = "";
                }
                break;
                case "email":
                    if(!value) {
                        newError[name] = "Email required!";
                    }else{
                        newError[name] = "";
                    }
                    break;
                case "password":
                    if (!value) {
                        newError[name] = "Password required!";
                    }else{
                        newError[name] = "";
                    }
                    break;

                    default:
                    break;
                    
        }
        newInput[name] = value;
        setInput(newInput);
        setError(newError);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const{name, email, password} = input;

        if(!name && !email && !password){
            return setError({
                name: "name required!",
                username: "Username required!",
                password: "Password required!",
            })
        }
        if (!name){
            return setError({
                name: "Name required!";
            })
        }
        if (!email){
            return setError({
                email: "Email required!";
            })
        }
        if (!password){
            return setError({
                password: "Password required!"
            })
        }
        if (name && email && password){
            axios.post("", input)
            .then((res) => {
                if(res.data==="Username already exist!"){
                   return toast.error("Username already exist!", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    transition: Slide,
                   })
                }
            })
        }
    }
}