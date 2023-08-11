import { makeStyles } from '@mui/styles';
import logo from "../../../assets/logo1.png";
import { useDispatch, useSelector } from "react-redux";
import {changeAppTab} from '../../../redux/actions';
import { Link } from 'react-router-dom';

const usesStyle = makeStyles((theme)=>({
    sidebarContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        backgroundColor: "#00A7DA",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    siddebarHeader: {
        display: "flex",
        padding: "10px 10px",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F1FDFF",
    },
    activeSidebarMenu: {
        padding: "10px",
        margin: "5px 10px",
        borderRadius: "10px",
        backgroundColor: "#023E8A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        cursor: "pointer",
        textAlign: "center"
    },
    inactiveSidebarMenu: {
        padding: "10px",
        margin: "5px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        cursor: "pointer",
        textAlign: "center"
    }
}));


const Sidebar = () => {

    const classes = usesStyle();

    return (
        <div className={classes.sidebarContainer}>
        
            <div className={classes.siddebarHeader}>
                <img src={logo} />
            </div>

            <div>


                <SidebarMenu 
                    title="Admin" 
                />

                <SidebarMenu 
                    title="Hydrographic Survey Chart" 
                />

                <SidebarMenu 
                    title="Tidal Data" 
                />

                <SidebarMenu 
                    title="Tidal Table Book" 
                />

                <SidebarMenu 
                    title="River Milage" 
                />

                <SidebarMenu 
                    title="Map" 
                />

                <SidebarMenu 
                    title="Purchase request" 
                />


                
                <div 
                    className={classes.inactiveSidebarMenu}
                    
                >
                    <Link
                        exact 
                        to="/authentication"
                        onClick={()=> {
                            alert("You are logged out of the system");
                            window.localStorage.removeItem("email");
                            window.localStorage.removeItem("isLoggedIn");
                            window.location.href="/";
                        }}
                        style={{textDecoration: "none", color: "white"}} 
                    >
                        Log Out
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default Sidebar;


const SidebarMenu = (props) => {

    const classes = usesStyle();
    const myTab = useSelector((state) => state.changeAppTab);

    const dispatch = useDispatch();

    return (
        <div 
            className={myTab === props.title ? classes.activeSidebarMenu : classes.inactiveSidebarMenu}
            onClick={()=>{
                dispatch(changeAppTab(props.title));
                console.log(props.title);
            }}
        >
            {props.title}
        </div>
    );
}