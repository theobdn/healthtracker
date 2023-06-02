import React from 'react';
import {Box, TextField} from "@mui/material";

interface SearchBarInterface {
    onSearchQuery?: (input: string) => void
    placeholder?: string
}

const SearchBar = (props: SearchBarInterface) => {
    const {onSearchQuery, placeholder} = props

    const handleChange = (value: string) => {
        if (onSearchQuery) {
            onSearchQuery(value)
        }
    }
    return (
        <Box sx={{width: "100%", display: "flex", alignItems: "center"}}>
            <TextField
                onChange={(e) => handleChange(e.target.value)}
                label="Enter an aliment name"
                variant="filled"
                placeholder={placeholder ? placeholder : "Search..."}
                size="small"
                fullWidth
            />
        </Box>
    )
}

export default SearchBar;