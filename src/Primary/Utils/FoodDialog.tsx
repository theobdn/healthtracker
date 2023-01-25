import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, {DialogProps} from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import {alimentsData} from "../../Secondary/InMemory/data";
import FolderIcon from '@mui/icons-material/Folder';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchBar from "./SearchBar";
import {useEffect, useState} from "react";
import {Delete} from "@mui/icons-material";
import {Aliment} from "../../Corelogic/Models/Aliment";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface MaxWidthDialogInterface {
    onConfirmClick: () => void
    onPreviousStepClick: () => void
}

export default function MaxWidthDialog(props: MaxWidthDialogInterface) {
    const {onConfirmClick, onPreviousStepClick} = props
    const [open, setOpen] = useState(true)
    const [fullWidth, setFullWidth] = useState(true)
    const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('xl')
    const [searchQuery, setSearchQuery] = useState("")
    const [alimentsList, setAlimentsList] = useState<Aliment[]>(alimentsData)
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    const handleAddAliment = (aliment: Aliment) => {
        console.log(aliment)
    }

    const handleDeleteAliment = (alimentId: number) => {
        const alimentToDelete = alimentsList.find(x => x.id === alimentId)
        const newAlimentList = alimentsList.filter(x => x.id === alimentId)
        if (alimentToDelete) {
            setAlimentsList([...newAlimentList])
        }
    }

    const handleConfirm = () => {
        onConfirmClick()
    }

    const handleReset = () => {
        console.log("reset")
    }

    const handlePreviousStep = () => {
        onPreviousStepClick()
    }

    return (
        <React.Fragment>
            <Button variant="contained">
                <AddCircleOutlineIcon sx={{marginRight: "10px"}}/>
                <Typography>Ajouter un aliment</Typography>
            </Button>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
            >
                <Box sx={{width: '100%'}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Add aliments" {...a11yProps(0)} />
                            <Tab label="See aliments" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <DialogTitle>Choisir un aliment</DialogTitle>
                        <DialogContent>
                            <DialogContentText sx={{display: "flex", alignItems: "center"}}>
                                <Box sx={{margin: "10px", width: "100%"}}>
                                    <SearchBar onSearchQuery={setSearchQuery}/>
                                </Box>
                            </DialogContentText>
                            <Paper style={{height: 350, overflow: 'auto'}}>
                                <List>
                                    {alimentsList.map(x => {
                                        return (
                                            <ListItem key={x.id}
                                                      sx={{borderBottom: "1px solid", borderBottomColor: "#1769aa"}}>
                                                <ListItemIcon>
                                                    <FolderIcon/>
                                                </ListItemIcon>
                                                <ListItemText secondaryTypographyProps={{color: "secondary.main"}}
                                                              primary={x.label}
                                                              secondary={x.weight + " grammes" + " - " + x.caloriesPerWeight + " calories"}
                                                />
                                                <ListItemIcon>
                                                    <Button variant="contained">
                                                        <AddCircleIcon sx={{marginRight: "10px"}}
                                                                       onClick={() => handleAddAliment(x)}/>
                                                        <Typography>Add</Typography>
                                                    </Button>
                                                </ListItemIcon>
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </Paper>
                        </DialogContent>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <DialogTitle>Résumé des aliments ajoutés</DialogTitle>
                        <DialogContent>
                            <DialogContentText sx={{display: "flex", alignItems: "center"}}>
                                <Box sx={{margin: "10px", width: "100%"}}>
                                    <SearchBar onSearchQuery={setSearchQuery}/>
                                </Box>
                            </DialogContentText>
                            <Paper style={{height: 350, overflow: 'auto'}}>
                                <List>
                                    {alimentsList.map(x => {
                                        return (
                                            <ListItem key={x.id}
                                                      sx={{borderBottom: "1px solid", borderBottomColor: "#1769aa"}}>
                                                <ListItemIcon>
                                                    <FolderIcon/>
                                                </ListItemIcon>
                                                <ListItemText secondaryTypographyProps={{color: "secondary.main"}}
                                                              primary={x.label}
                                                              secondary={x.weight + " grammes" + " - " + x.caloriesPerWeight + " calories"}
                                                />
                                                <ListItemIcon>
                                                    <Button variant="contained" color="secondary">
                                                        <Delete sx={{marginRight: "10px"}}
                                                                onClick={() => handleDeleteAliment(x.id)}/>
                                                        <Typography>Delete</Typography>
                                                    </Button>
                                                </ListItemIcon>
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </Paper>
                        </DialogContent>
                    </TabPanel>
                </Box>
                <DialogActions>
                    <Box sx={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                        <Button variant="outlined" onClick={handlePreviousStep}>Previous step</Button>
                        <Box sx={{display: "flex"}}>
                            <Button variant="outlined" color="error" onClick={handleReset}
                                    sx={{marginRight: "10px"}}>Cancel</Button>
                            <Button variant="outlined" onClick={handleConfirm}>Confirm</Button>
                        </Box>
                    </Box>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}