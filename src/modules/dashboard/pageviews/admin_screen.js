import { Close } from "@mui/icons-material";
import { Button, Container, FormControl, Grid, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";


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
    topHolder: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: "30px",
        fontWeight: "700",
        color: "black"
    },
    adminTab: {
        color: "#F1FDFF",
        padding: theme.spacing(1),
        width: "100%"
    }
}))


const columns = [
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
    },
    {
        field: 'email',
        headerName: 'EMAIL',
        flex: 1,
    },
    {
        field: 'role',
        headerName: 'ROLE',
        flex: 1,
    }
];


const AdminScreen = () => {

    const classes = useStyle();

    const [open, setOpen] = useState(false);
    const [admin, setNewAdmin] = useState(
        {
            email: '',
            name: '',
            role: '',
            password: ''
        }
    );

    function addAdmin() {

        if (admin.email === "") {
            alert("Please enter an email to continue");
            return;
        }

        if (admin.name === "") {
            alert("Please enter a name to continue");
            return;
        }

        if (admin.password === "") {
            alert("Please enter a password to continue");
            return;
        }

        if (admin.role === "") {
            alert("Please select a role to continue");
            return;
        }

        const fd = new FormData();
        fd.append('email', admin.email);
        fd.append('name', admin.name);
        fd.append('password', admin.password);
        fd.append('role', admin.role);
        
        axios.post('http://biwta-db.000webhostapp.com/admin/add_admin.php', fd)
        .then(res=> {
            console.log("Data:" + res.data);

            setNewAdmin({
                email: '',
                name: '',
                role: '',
                password: ''
            }); 

            setOpen(false);
        
            if(res.data === "success"){
                alert("Data updated successfully")
            } else {
                alert("Error.");
            }

        })
        .catch(error => {
            console.log("Error:" + error.response);
            alert("Error:" + error.response);
            setOpen(false);
        });


    }


    const [rows, setRows] = useState([]);

    useEffect(() => {
        getAllAdmin();
    })

    
    function getAllAdmin() {

        var url = "http://biwta-db.000webhostapp.com/admin/get_admin.php";

        axios.get(url)
            .then((response) => {
                console.log(response);
                var tempRows = new Array();
                response.data.map((data, index) => (
                    tempRows.push({ id: index, name: data.name, email: data.email, password: data.password, role: data.role})
                ));
                setRows(tempRows);
            });
        }


    function displayData () {

        if (rows.length === 0)
            return <div style={{ width: "100%", display: "flex", justifyContent: "center", padding:"20px" }}>
                <h3>No admin in the server</h3>
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



    return <>

        <Modal open={open}>

            <Container className={classes.addUserContainer}>

                <div style={{ width :"100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography style={{ fontSize: "24px", fontWeight: "700", }}>Edit Request</Typography>
                    <div style={{ color: "black", cursor: "pointer" }} onClick={() => { setOpen(false); }}><Close /></div>
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
                            value={admin.email}
                            onChange={(e)=>{setNewAdmin({ ...admin, email: e.target.value })}}
                        />
                    </FormControl>
                    <div className={classes.spacerSmall} />

                    <FormControl fullWidth>
                        <TextField
                            className={classes.input}
                            size="small" 
                            placeholder="Name"
                            label="Name"
                            value={admin.name}
                            onChange={(e)=>{setNewAdmin({ ...admin, name: e.target.value })}}
                        />
                    </FormControl>
                    <div className={classes.spacerSmall} />

                    <FormControl fullWidth>
                        <TextField
                            className={classes.input}
                            size="small" 
                            type="password"
                            placeholder="Password"
                            label="Password"
                            value={admin.password}
                            onChange={(e)=>{setNewAdmin({ ...admin, password: e.target.value })}}
                        />
                    </FormControl>
                    <div className={classes.spacerSmall} />                    

                    <FormControl fullWidth>
                        <TextField
                            select
                            id="demo-simple-select"
                            value={admin.role}
                            label="Role"
                            size="small"
                            onChange={(e)=>{setNewAdmin({ ...admin, role: e.target.value })}}
                        >
                            <MenuItem value="Super Admin">Super Admin</MenuItem>
                            <MenuItem value="Hydrographer Admin">Hydrographer Admin</MenuItem>
                            <MenuItem value="Cartographer Admin">Cartographer Admin</MenuItem>
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
                            setOpen(false);
                        }}
                    >
                        Cancel
                    </div>
                    <div className={classes.spacerSmall} />
                    <div 
                        className={classes.saveButton}
                        onClick={(e)=>{
                            addAdmin();
                        }}
                    >
                        Add
                    </div>
                </div>

            </Container>

        </Modal>


        <div className={classes.holder}>
            
            <div className={classes.topHolder}>
                <div className={classes.title}>Admin</div>
                <Button variant="contained" onClick={(e)=>{setOpen(true);}}>Add New Admin</Button>
            </div>

            <div className={classes.spacerSmall} />
            <div className={classes.spacerSmall} />
            <div className={classes.spacerSmall} />

            {displayData()}

        </div>

    </>;
}

export default AdminScreen;