import React from 'react';
import {Grid, Paper, Typography} from "@mui/material";
import {profilesData} from "../../../Secondary/InMemory/data";
import Button from "@mui/material/Button";

interface JournalHeaderInterface {
    onButtonClick?: () => void
    disableHeaderButton: boolean
}

const JournalHeader = (props: JournalHeaderInterface) => {
    const {onButtonClick, disableHeaderButton} = props

    return (
        <Paper>
            <Grid container justifyContent="space-between" alignItems="center" p={1}>
                <Grid item>
                    <Grid container alignItems="center">
                        <Grid item>
                            <Typography variant="h4">Ajout d'un repas : </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" color="secondary"
                                        marginLeft="5px">{profilesData[0].name}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" color="secondary"
                                        marginLeft="5px">{profilesData[0].firstName}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {!disableHeaderButton && <Grid item>
                    <Button variant="contained" onClick={onButtonClick}>Previous step</Button>
                </Grid>}
            </Grid>
        </Paper>
    );
};

export default JournalHeader;