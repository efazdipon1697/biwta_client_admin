import { Delete } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

const useStyle = makeStyles((theme)=>({
    holder: {
        padding: theme.spacing(2),
    }
}))


const columns = [
    {
        field: 'email',
        headerName: 'EMAIL',
        flex: 1
    },{
        field: 'area',
        headerName: 'AREA',
        flex: 1
    },
    {
        field: 'river',
        headerName: 'RIVER',
    },
    {
        field: 'latitude',
        headerName: 'LATITUDE',
        flex: 1,
        renderCell: (props) => LatitudeComponent(props),
    },
    {
        field: 'longitude',
        headerName: 'LONGITUDE',
        flex: 1,
        renderCell: (props) => LongitudeComponent(props),
    },
    {
        field: 'scale',
        headerName: 'SCALE',
    },
    {
        field: 'purpose',
        headerName: "PURPOSE",
    },
    {
        field: 'period',
        headerName: "PERIOD",
    }
];


const HydrographicSurveyChart = () => {
    
    const classes = useStyle();
    
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getMyHydrographicSurveyChartRequest();
    })

    
    function getMyHydrographicSurveyChartRequest() {

        var url = "http://biwta-db.000webhostapp.com/admin/purchase_request/hydrographic_survey_data.php";

        axios.get(url)
            .then((response) => {
                console.log(response);
                var tempRows = new Array();
                response.data.map((data, index) => (
                    tempRows.push({ id: index, email: data.email, area: data.area, river: data.river, latitude: data, longitude: data, scale: data.scale, purpose: data.purpose, period: data.period})
                ));
                setRows(tempRows);

            });

        }


    function displayData () {

        if (rows.length === 0)
            return <div style={{ width: "100%", display: "flex", justifyContent: "center", padding:"20px" }}>
                <h3>No Request in the server</h3>
            </div>;
        
        return (
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                  }}
                pageSizeOptions={[10, 25, 50]}
                autoHeight
            />
        );

    };

    return <div style={{ overflow: "auto" }} className={classes.holder}>
        {displayData()}
    </div>;

}

export default HydrographicSurveyChart;


const LatitudeComponent = (props) => {

    const classes = useStyle();

    return (
        <div className={classes.tabTitle}>{props.value['fromLat'] + " - " + props.value['toLat']}</div>
    );
}


const LongitudeComponent = (props) => {

    const classes = useStyle();

    return (
        <div className={classes.tabTitle}>{props.value.fromLong + " - " + props.value.toLong}</div>
    );
}

