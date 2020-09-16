import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel, Checkbox, TextField, Button } from '@material-ui/core';

function SortingTable(props: any){
    let attribute = props.attribute;
    let ascending: 'asc' | 'desc' = props.ascending ? 'asc' : 'desc';
    let noneHandle = props.clickHandler[0];
    let titleHandle = props.clickHandler[1];
    let dateHandle = props.clickHandler[2];
    let searchHandler = props.searchHandler;
    let narrow: boolean = props.narrow;
    if(narrow){
        return (
            <TableHead>
                <TableRow>
                    <TableCell>
                        No sorting
                    </TableCell>
                    <TableCell padding="checkbox">
                        <Checkbox
                            checked={attribute == 'none'}
                            onChange={noneHandle}
                        />
                    </TableCell>
                    <TableCell
                            key={"sortingTitle"}
                            align={'center'}
                            padding={'default'}
                            sortDirection={false}
                        >
                            <TableSortLabel
                                active={attribute == 'title'}
                                direction={ascending}
                                onClick={titleHandle}
                                >
                                Title
                            </TableSortLabel>
                    </TableCell>
                    <TableCell
                            key={"sortingDate"}
                            align={'center'}
                            padding={'default'}
                            sortDirection={false}
                        >
                            <TableSortLabel
                                active={attribute == 'created'}
                                direction={ascending}
                                onClick={dateHandle}
                                >
                                Date
                            </TableSortLabel>
                    </TableCell>
                </TableRow>
                <TableRow className="full-width">
                    <TableCell
                            key={"search"}
                            align={'center'}
                            padding={'default'}
                            sortDirection={false}
                            width="100%"
                        >
                            <TextField id="Search-fish" label="Search" variant="filled" fullWidth 
                                onChange={(e) => searchHandler(e.target.value)} />
                    </TableCell>
                </TableRow>
            </TableHead>
        )
    }
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    No sorting
                </TableCell>
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={attribute == 'none'}
                        onChange={noneHandle}
                    />
                </TableCell>
                <TableCell
                        key={"sortingTitle"}
                        align={'center'}
                        padding={'default'}
                        sortDirection={false}
                    >
                        <TableSortLabel
                            active={attribute == 'title'}
                            direction={ascending}
                            onClick={titleHandle}
                            >
                            Title
                        </TableSortLabel>
                </TableCell>
                <TableCell
                        key={"sortingDate"}
                        align={'center'}
                        padding={'default'}
                        sortDirection={false}
                    >
                        <TableSortLabel
                            active={attribute == 'created'}
                            direction={ascending}
                            onClick={dateHandle}
                            >
                            Date
                        </TableSortLabel>
                </TableCell>
                <TableCell
                        key={"search"}
                        align={'center'}
                        padding={'default'}
                        sortDirection={false}
                        width="60%"
                    >
                        <TextField id="Search-fish" label="Search" variant="filled" fullWidth 
                            onChange={(e) => searchHandler(e.target.value)} />
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default SortingTable;