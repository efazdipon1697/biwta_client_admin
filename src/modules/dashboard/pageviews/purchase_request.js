import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {changeResourceTab} from '../../../redux/actions';

import HydrographicSurveyChart from '../pageviews/purchase_request_pageviews/hydrographic_survey_chart';
import RiverMilage from '../pageviews/purchase_request_pageviews/river_milage';
import TidalData from '../pageviews/purchase_request_pageviews/tidal_data';
import TidalTableBook from '../pageviews/purchase_request_pageviews/tidal_table_book';
import MapRequest from '../pageviews/purchase_request_pageviews/map';

const usesStyle = makeStyles((theme)=>({
    tabHolder: {
        display: "flex",
        justifyContent: "space-evenly"
    },
    activeTopbarMenu: {
        padding: "10px",
        margin: "5px 10px",
        borderRadius: "10px",
        backgroundColor: "#2D3653",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        cursor: "pointer",
        textAlign: "center",
        textTransform: "uppercase"
    },
    inactiveTopbarMenu: {
        padding: "10px",
        margin: "5px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#5E5E5E",
        cursor: "pointer",
        textAlign: "center",
        textTransform: "uppercase"
    }
}));


const PurchaseRequest = () => {

    const classes = usesStyle();
    const myTab = useSelector((state) => state.changeResourceTab);


    return (
        <div>
            
            <div className={classes.tabHolder}>

                <TopbarMenu
                    title= "Hydrographic Survey Chart" 
                />

                <TopbarMenu
                    title= "Tidal Data" 
                />

                <TopbarMenu
                    title= "Tide Table Book" 
                />

                <TopbarMenu
                    title= "River Milage" 
                />

                <TopbarMenu
                    title= "Map" 
                />

            </div>

            {
                myTab === "Hydrographic Survey Chart" ? <HydrographicSurveyChart /> 
                    : myTab === "Tidal Data" ? <TidalData />
                        : myTab === "Tide Table Book" ? <TidalTableBook />
                            : myTab === "River Milage" ? <RiverMilage />
                                : myTab === "Map" ? <MapRequest />
                                    : <HydrographicSurveyChart />

            }

        </div>
    );
}

export default PurchaseRequest;


const TopbarMenu = (props) => {

    const classes = usesStyle();
    const myTab = useSelector((state) => state.changeResourceTab);

    const dispatch = useDispatch();

    return (
        <div 
            className={myTab === props.title ? classes.activeTopbarMenu : classes.inactiveTopbarMenu}
            onClick={()=>{
                dispatch(changeResourceTab(props.title));
                console.log(props.title);
            }}
        >
            {props.title}
        </div>
    );
}