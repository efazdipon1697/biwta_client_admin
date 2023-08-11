import { Button, Grid, TextField, Typography, Modal, FormControl, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import "./authentication_screen.css";
import logo from "../../assets/logo1.png";
import { useState } from 'react';
import axios from 'axios';
import biwta_guideline from "../../assets/biwta_guideline.pdf";


const usesStyle = makeStyles((theme)=>({
    authenticationFormHolder: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        // border: "2px solid black",
        boxShadow: "2px 2px 2px 2px black",
        borderRadius: "25px",
        height: "90%",
        width: "90%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    infoHolder: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        height: "90%"
    },
    inputField: {
        display: "flex",
        width:"100%",
        padding: "10px 5px",
        border: "1px solid #cdcdcd",
        borderRadius: "5px",
        backgroundColor: "transparent"
    },
    spacer: {
        height: "10px",
        width: "10px",
    },

    formContainer: {
        margin: "25px",
        padding: "20px",
        borderRadius: "15px",
        border: "1px solid grey",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        overflow: "scroll",
    },

    form: {
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        width: "100%"
    },

    input: {
        display: "flex",
        width: "100%",
    },

    selectTag: {
        display: "flex",
        width: "100%",
        backgroundColor: "transparent",
        zIndex: 100,
    },

    signUpForm: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },

    loginContainer: {
        width: "600px",
        height: "600px",
        padding: theme.spacing(2),
        backgroundColor: "white",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        overflow: "auto",
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
            width: "100vw",
            height: "100vh",
        },
    },

    submitButton: {
        backgroundColor: "#2D3653",
        color: "white",
        fontSize: "18px",
        padding: "10px",
        border: "0px",
        borderRadius: "5px",
        cursor: "pointer",
    },
}));

const AuthenticationScreen = () => {

    const classes = usesStyle();


    return (

        <>

            <div className="background">
                    
                <div className={classes.authenticationFormHolder}>

                    <Grid container spacing={2} style={{display: "flex", alignItems: "center"}}>
                        <Grid item xs={0} sm={5}  lg={5} xl={6}  className={classes.signUpForm}>
                            <InformationScreen />
                        </Grid>
                        <Grid item xs={12} sm={7}  lg={7} xl={6} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>        
                            

                            <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "80%"}}>

                                <LoginFormHolder />
                            
                            </div>


                        </Grid>
                    </Grid>

                </div>

            </div>

        </>


);
}

export default AuthenticationScreen;


const InformationScreen = () => {

    const classes = usesStyle();

    return (
        <>
            <div className={classes.infoHolder}>
                <img src={logo} style={{width: "100px",}}/>
                <div className={classes.spacer} />
                <div className={classes.spacer} />
                <div className={classes.spacer} />
                <strong style={{fontSize: "20px", textAlign: "center"}}>WELCOME to BIWTA Hydrographic Resources</strong>
                <div className={classes.spacer} />
                <div className={classes.spacer} />
                <div className={classes.spacer} />
                <Typography style={{color: "black", fontSize: "16", fontWeight: "400", marginBottom: "10px", textAlign: "center"}}>
                    Please read BIWTA guidelines  from here
                </Typography>
                <a href={biwta_guideline} target="_blank"  style={{textDecoration: "none", color: "#2D3653", fontWeight: "700"}}>
                    BIWTA Guidelines.pdf
                </a>
                <div className={classes.spacer} />
                <div className={classes.spacer} />
                <div className={classes.spacer} />
                <Typography style={{color: "black", fontSize: "24", fontWeight: "400", marginBottom: "10px", textAlign: "center"}}>
                    Registration fee 200 TK
                </Typography>
                <div className={classes.spacer} />
                <Typography style={{color: "black", fontSize: "16", fontWeight: "400", marginBottom: "10px", textAlign: "center"}}>
                    For any help, please contact us:
                </Typography>
                <div className={classes.spacer} />
                <Typography style={{color: "black", fontSize: "16", fontWeight: "400", textAlign: "center"}}>
                    Email: biwta@email.com
                </Typography>
                <Typography style={{color: "black", fontSize: "16", fontWeight: "400", textAlign: "center"}}>
                    Telephone: 01000000000
                </Typography>
            </div>
        </>
    );
}



const LoginFormHolder = () => {

    const classes = usesStyle();

    const [newUser, setNewUser] = useState(
        {
            email: '',
            pass: '',
        }
    );

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    function loginUser(event) {

        event.preventDefault();

        if (newUser.email === "") {
            alert("Please type your email to continue");
            return;
        }
        if (newUser.pass === "") {
            alert("Password can not be empty");
            return;
        }

        const fd = new FormData();
        fd.append('email', newUser.email);
        fd.append('pass', newUser.pass); 
        
        axios.post('http://biwta-db.000webhostapp.com/admin/login.php', fd)
        .then(res=> {
            console.log("Data:" + res.data);

            setNewUser({
                email: '',
                pass: '',
            }); 
        
            if(res.data === "success"){
                alert("Login successfully.");
                window.localStorage.setItem("currentEmail", newUser.email);
                window.localStorage.setItem("isLoggedIn", true);
                window.location.href= "/dashboard";
            } else {
                alert("Error logging in. Please try again");
            }

        })
        .catch(error => {
            console.log("Error:" + error.response);
            alert("Error:" + error.response);
        });

    }

    return (
            <div className={classes.formContainer}>

                <Typography style={{color: "#2D3653", fontSize: "32px", fontWeight: "400"}}>
                    LOGIN
                </Typography>

                <form className={classes.form}>

                    <input
                        type="text"
                        label="Your Email"
                        name="email"
                        value={newUser.email}
                        placeholder="Your Email"
                        className={classes.inputField}
                        onChange={handleChange}
                    />
                    <div className={classes.spacer} />


                    <input
                        type="password"
                        label="Password"
                        name="pass"
                        value={newUser.pass} 
                        placeholder="Password"
                        className={classes.inputField}
                        onChange={handleChange}
                    />
                    <div className={classes.spacer} />
                    <div className={classes.spacer} />
                    <div className={classes.spacer} />

                    <Button variant="contained" style={{ backgroundColor: "#2D3653", color: "white" }} onClick={loginUser}>
                        Login
                    </Button>
                
                </form>

            </div>

    );
}
