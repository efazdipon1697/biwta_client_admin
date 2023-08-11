import { Close, Edit } from "@mui/icons-material";
import { Container, FormControl, Grid, IconButton, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

const useStyle = makeStyles((theme)=>({
    holder: {
        padding: theme.spacing(2),
    },
    input: {
        width: "100%",
        backgroundColor: "white",
    },
    saveButton: {
        backgroundColor: "#24459c",
        padding: "10px 35px",
        color: "white",
        cursor: "pointer",
        borderRadius: "25px",
        fontSize: "14px"
    },
    cancelButton: {
        backgroundColor: "#F6F6F6",
        padding: "10px 35px",
        color: "#959596",
        cursor: "pointer",
        borderRadius: "25px",
        fontSize: "14px"
    },
    spacerSmall: {
        width: "10px",
        height: "10px",
    },
    addUserContainer: {
        padding: theme.spacing(2),
        backgroundColor: "white",
        width: "400px",
        height: "450px",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
            height: "100vh",
            width: "100vw",
        }
    },

}))


const columns = [
    {
        field: 'tidalDataType',
        headerName: 'DATA TYPE',
        flex: 1
    },
    {
        field: 'district',
        headerName: 'DISTRICT',
        flex: 1
    },
    {
        field: 'river',
        headerName: 'RIVER',
        flex: 1
    },
    {
        field: 'station',
        headerName: 'STATION',
        flex: 1
    },
    {
        field: 'from',
        headerName: 'FROM',
        flex: 1
    },
    {
        field: 'to',
        headerName: "TO",
        flex: 1
    },
    {
        field: 'purpose',
        headerName: "PURPOSE",
        flex: 1
    },
    {
        field: 'action',
        headerName: "",
        renderCell: (props) => ActionComponent(props),
    }
];


const TidalDataRequest = () => {
    const classes = useStyle();
    
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getTidalDataRequest();
    })

    
    function getTidalDataRequest() {

        var url = "http://biwta-db.000webhostapp.com/admin/get_tidal_data_request.php";

        axios.get(url)
            .then((response) => {
                console.log(response);
                var tempRows = new Array();
                response.data.map((data, index) => (
                    tempRows.push({ id: index, tidalDataType: data.tidalDataType, district: data.district, river: data.river, station: data.station, from: data.fromDate, to: data.toDate, purpose: data.purpose, action: data})
                ));
                setRows(tempRows);
            });

        }


    function displayData () {

        if (rows.length === 0)
            return <div style={{ width: "100%", display: "flex", justifyContent: "center", padding:"20px" }}>
                <h3>No pending request in the server</h3>
            </div>;
        
        return (
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                  }}
                pageSizeOptions={[5, 10, 25]}
                autoHeight
            />
        );

    };

    return <div style={{ overflow: "auto" }} className={classes.holder}>
        {displayData()}
    </div>;

}

export default TidalDataRequest;

const ActionComponent = (props) => {

    const [editOpen, setEditOpen] = useState(false);
    const [editData, setEditData] = useState(
        {
            id: '',
            email: '',
            tidalDataType: '',
            district: '',
            river: '',
            station: '',
            fromDate: '',
            toDate: '',
            purpose: '',
            status: ''
        }
    );


    const classes = useStyle();


    function editStatus() {

        if (editData.status === "Pending") {
            alert("Please select the status of the request other than Pending to continue");
            return;
        }

        const fd = new FormData();
        fd.append('id', editData.id);
        fd.append('status', editData.status);
        
        axios.post('http://biwta-db.000webhostapp.com/admin/update_tidal_data_request.php', fd)
        .then(res=> {
            console.log("Data:" + res.data);

            setEditData({
                id: '',
                email: '',
                tidalDataType: '',
                district: '',
                river: '',
                station: '',
                fromDate: '',
                toDate: '',
                purpose: '',
                status: ''
            }); 

            setEditOpen(false);
        
            if(res.data === "success"){
                alert("Data updated successfully")
            } else {
                alert("Error.");
            }

        })
        .catch(error => {
            console.log("Error:" + error.response);
            alert("Error:" + error.response);
            setEditOpen(false);
        });


    }


    return (

        <>
            <Modal open={editOpen}>

                <Container className={classes.addUserContainer}>

                    <div style={{ width :"100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography style={{ fontSize: "24px", fontWeight: "700", }}>Edit Request</Typography>
                        <div style={{ color: "black", cursor: "pointer" }} onClick={() => { setEditOpen(false); }}><Close /></div>
                    </div>

                    <div>
                        <div className={classes.spacerSmall} />
                        <div className={classes.spacerSmall} />
                        <div className={classes.spacerSmall} />
                    </div>

                    <div style={{overflowY: "scroll", maxHeight: "65%"}}>

                        <div className={classes.spacerSmall} />
                        <FormControl fullWidth>
                            <TextField
                                className={classes.input}
                                size="small" 
                                placeholder="Email"
                                label="Email"
                                value={editData.email}
                                disabled
                            />
                        </FormControl>
                        <div className={classes.spacerSmall} />

                        <FormControl fullWidth>
                            <TextField
                                className={classes.input}
                                size="small" 
                                placeholder="Tidal Data Type"
                                label="Tidal Data Type"
                                value={editData.tidalDataType}
                                disabled
                            />
                        </FormControl>
                        <div className={classes.spacerSmall} />
                        
                        <FormControl fullWidth>
                            <TextField
                                className={classes.input}
                                size="small" 
                                placeholder="District"
                                label="District"
                                value={editData.district}
                                disabled
                            />
                        </FormControl>
                        <div className={classes.spacerSmall} />
                        
                        <FormControl fullWidth>
                            <TextField
                                className={classes.input}
                                size="small" 
                                placeholder="River"
                                label="River"
                                value={editData.river}
                                disabled
                            />
                        </FormControl>
                        <div className={classes.spacerSmall} />
                        
                        <FormControl fullWidth>
                            <TextField
                                className={classes.input}
                                size="small" 
                                placeholder="Station"
                                label="Station"
                                value={editData.station}
                                disabled
                            />
                        </FormControl>
                        <div className={classes.spacerSmall} />
                        
                        <div style={{display: "flex", width: "100%"}}>
                            <FormControl fullWidth>
                                <TextField
                                    className={classes.input}
                                    size="small" 
                                    placeholder="Date (From)"
                                    label="Date (From)"
                                    value={editData.fromDate}
                                    disabled
                                />
                            </FormControl>
                            <div className={classes.spacerSmall} />
                            <FormControl fullWidth>
                                <TextField
                                    className={classes.input}
                                    size="small" 
                                    placeholder="Date (To)"
                                    label="Date (To)"
                                    value={editData.toDate}
                                    disabled
                                />
                            </FormControl>            
                        </div>
                        <div className={classes.spacerSmall} />

                        
                        <FormControl fullWidth>
                            <TextField
                                className={classes.input}
                                size="small" 
                                placeholder="Purpose"
                                label="Purpose"
                                value={editData.purpose}
                                disabled
                            />
                        </FormControl>
                        <div className={classes.spacerSmall} />
                        
                        <FormControl fullWidth>
                            <TextField
                                select
                                id="demo-simple-select"
                                value={editData.status}
                                label="Status"
                                size="small"
                                onChange={(e)=>{setEditData({ ...editData, status: e.target.value })}}
                            >
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Available">Available</MenuItem>
                                <MenuItem value="Not Available">Not Available</MenuItem>
                            </TextField>
                        </FormControl>
                        <div className={classes.spacerSmall} />

                    </div>

                    <div className={classes.spacerSmall} />
                    <div className={classes.spacerSmall} />

                    <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "end"}}>
                        <div 
                            className={classes.cancelButton}
                            onClick={(e)=>{
                                setEditOpen(false);
                            }}
                        >
                            Cancel
                        </div>
                        <div className={classes.spacerSmall} />
                        <div 
                            className={classes.saveButton}
                            onClick={(e)=>{
                                editStatus();
                            }}
                        >
                            Save
                        </div>
                    </div>

                </Container>

            </Modal>

            <div>
                <IconButton onClick={()=>{
                    setEditData({
                        id: props.value.id,
                        email: props.value.email,
                        tidalDataType: props.value.tidalDataType,
                        district: props.value.district,
                        river: props.value.river,
                        station: props.value.station,
                        fromDate: props.value.fromDate,
                        toDate: props.value.toDate,
                        purpose: props.value.purpose,
                        status: props.value.status
                    });
                    setEditOpen(true);
                }}>
                    <Edit />
                </IconButton>
            </div>


        </>
    );
}
