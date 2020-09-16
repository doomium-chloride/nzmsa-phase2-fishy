import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel, Checkbox } from '@material-ui/core';

function SortingTable(props: any){
    let attribute = props.attribute;
    let ascending: 'asc' | 'desc' = props.ascending ? 'asc' : 'desc';
    let noneHandle = props.clickHandler[0];
    let titleHandle = props.clickHandler[1];
    let dateHandle = props.clickHandler[2];
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
        </TableHead>
    )
}

export default SortingTable;