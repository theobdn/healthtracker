import React from 'react';
import {TextField} from "@mui/material";

interface SearchBarInterface {
    onSearchQuery: (input: string) => void
}

const SearchBar = (props: SearchBarInterface) => {
    const {onSearchQuery} = props
    return (
        <TextField
            onChange={(e) => {
                onSearchQuery(e.target.value)
            }}
            label="Enter an aliment name"
            variant="filled"
            placeholder="Search..."
            fullWidth
        />
    )
}

export default SearchBar;