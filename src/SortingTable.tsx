import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel, Checkbox, TextField, Button, Select, MenuItem, InputLabel, Table } from '@material-ui/core';

function SortingTable(props: any){
    let attribute = props.attribute;
    let ascending: 'asc' | 'desc' = props.ascending ? 'asc' : 'desc';
    let noneHandle = props.clickHandler[0];
    let titleHandle = props.clickHandler[1];
    let dateHandle = props.clickHandler[2];
    let searchHandler = props.searchHandler;
    let narrow: boolean = props.narrow;
    let limitHandler = props.limitHandler
    let limit = props.limit;
    if(narrow){
        return (
            <Table>
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
                    <TableCell>
                        <InputLabel>
                            Show Top
                        </InputLabel>
                        <Select
                            value={limit}
                            onChange={(e) => limitHandler(e.target.value)}
                            renderValue={(value: any) => valueRender(value)}
                            >
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={10}>Top 10</MenuItem>
                            <MenuItem value={20}>Top 20</MenuItem>
                            <MenuItem value={30}>Top 30</MenuItem>
                            <MenuItem value={40}>Top 40</MenuItem>
                            <MenuItem value={50}>Top 50</MenuItem>
                            <MenuItem value={100}>Top 100</MenuItem>
                        </Select>
                    </TableCell>
                </TableRow>
            </TableHead>
            </Table>
        )
    }
    return (
        <Table>
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
                <TableCell>
                        <InputLabel>
                            Show Top
                        </InputLabel>
                        <Select
                            value={limit}
                            onChange={(e) => limitHandler(e.target.value)}
                            renderValue={(value: any) => valueRender(value)}
                            >
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={10}>Top 10</MenuItem>
                            <MenuItem value={20}>Top 20</MenuItem>
                            <MenuItem value={30}>Top 30</MenuItem>
                            <MenuItem value={40}>Top 40</MenuItem>
                            <MenuItem value={50}>Top 50</MenuItem>
                            <MenuItem value={100}>Top 100</MenuItem>
                        </Select>
                    </TableCell>
            </TableRow>
        </TableHead>
        </Table>
    )
}

function valueRender(value: number){
    if(value == 0){
        return "All";
    } else {
        return `Top ${value}`;
    }
}

export default SortingTable;