import React from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core';
import Fish from './Fish';
import {
    EmailIcon,
    LineIcon,
    RedditIcon,
    EmailShareButton,
    LineShareButton,
    RedditShareButton
} from "react-share"
import Axios from 'axios';
import { urlBase } from './Globals';


function FishyContent(props: any){

    const [open, setOpen] = React.useState(false);
    const [spell, setSpell] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleSpell = (spell: string) => {
        setSpell(spell);
    };

    let fish = props.fish;

    let fishElement = <Fish colour={fish.colour} eye={fish.eye} key={"main-fish"} />

    let kill = (spell: string) => killFish(fish, spell);

    return(
        <Box>
            {fishElement}

            <div className="delete">
                <Button onClick={handleClickOpen}>
                    Kill Fishy
                </Button>
            </div>

            <h3 role="heading">
                {fish.title}
            </h3>

            <div className="social">
                <EmailShareButton children={<EmailIcon/>} url={window.location.href} />
                <RedditShareButton children={<RedditIcon/>} url={window.location.href} />
                <LineShareButton children={<LineIcon/>} url={window.location.href} />
            </div>

            <p role="date">
                <small>
                    {getDate(fish.created)}
                </small>
            </p>

            <p role="content">
                {fish.item}
            </p>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Kill this fishy?</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To kill this fish, please enter the delete spell (password).
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="delete-password"
                    label="Kill fishy spell"
                    type="password"
                    fullWidth
                    onChange={(e) => handleSpell(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {kill(spell); handleClose();}} color="primary">
                        Kill the fishy
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

function killFish(fish: any ,spell: string){

    const id = fish.fishID;

    const url = urlBase + id;

    fish.del = spell;

    Axios.put(url, fish)
        .then(() => {
            console.log("Fish killed?");
        })
        .catch(() => {
            console.error("Fish killing spell gone wrong");
        })

}

function getDate(str: string){
    let split = str.split('T');
    return split[0] + " " + split[1];
}

export default FishyContent;