import React from 'react';
import { Box, Button } from '@material-ui/core';
import Fish from './Fish';

function FishyContent(props: any){

    let fish = props.fish;

    let fishElement = <Fish colour={fish.colour} eye={fish.eye} key={"main-fish"} />

    return(
        <Box>
            {fishElement}

            <h3>
                {fish.title}
            </h3>

            <p>
                {fish.item}
            </p>
        </Box>
    )
}

export default FishyContent;