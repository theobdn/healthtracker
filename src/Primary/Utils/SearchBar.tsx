import React from 'react';
import {Box, IconButton, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarInterface {
    onSearchQuery: (input: string) => void
}

const SearchBar = (props: SearchBarInterface) => {
    const {onSearchQuery} = props
    return (
        <Box sx={{width: "100%", display: "flex", alignItems: "center"}}>
            <TextField
                onChange={(e) => {
                    onSearchQuery(e.target.value);
                }}
                label="Enter an aliment name"
                variant="filled"
                placeholder="Search..."
                size="small"
                fullWidth
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{fill: "#2196f3"}}/>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    )
}

export default SearchBar;