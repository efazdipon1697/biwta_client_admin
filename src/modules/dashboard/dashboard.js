import { Button, Grid } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";
import Sidebar from "./components/sidebar";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux";
import AdminScreen from "./pageviews/admin_screen";
import HydrographicSurveyChartRequest from "./pageviews/hydrographic_survey_chart_request";
import RiverMilageRequest from "./pageviews/river_milage_request";
import TidalDataRequest from "./pageviews/tidal_data_request";
import TidalTableBookRequest from "./pageviews/tidal_table_book_request";
import MapRequest from "./pageviews/map_request";
import PurchaseRequest from "./pageviews/purchase_request";


const usesStyle = makeStyles((theme)=>({
    sidebarContainer: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    toolbar: {
        backgroundColor: "#F1FDFF",
    }
}));


const DashboardScreen = () => {

    const classes = usesStyle();

    const myTab = useSelector((state) => state.changeAppTab);


    return (
        <Grid container>


            <Grid item  xs={0} sm={3}  lg={3} xl={2.5}  className={classes.sidebarContainer}>
                <Sidebar />
            </Grid>
            
            <Grid item  xs={12} sm={9}  lg={9} xl={9.5}>
                
                <div>

                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static" elevation={0}>
                            <Toolbar className={classes.toolbar}>
                                <Typography style={{color: "#1e1e1e", fontSize: "16px", fontWeight: "500"}}>
                                    Welcome  to BIWTA Hydrographic resources.
                                </Typography>

                            </Toolbar>
                        </AppBar>
                    </Box>

                    {
                        myTab == "Admin" ? <AdminScreen />
                        : myTab == "Hydrographic Survey Chart" ? <HydrographicSurveyChartRequest />
                        : myTab == "Tidal Data" ? <TidalDataRequest />
                        : myTab == "Tidal Table Book" ? <TidalTableBookRequest />
                        : myTab == "River Milage" ? <RiverMilageRequest />
                        : myTab == "Map" ? <MapRequest />
                        : myTab == "Purchase request" ? <PurchaseRequest />
                        : <AdminScreen />
                    }

                </div>

            </Grid>
            
        </Grid>
    );
}

export default DashboardScreen;