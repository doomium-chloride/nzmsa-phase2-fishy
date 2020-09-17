import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import ColorPicker from 'material-ui-color-picker'
import { TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

function FishyForm(props: any){

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    let handleSpell = (e: any) => props.spellHandler(e.target.value) || (() => console.error("No spell handler in fishy form"))

    let release = props.buttonHandler || (() => alert("release"))

    let parent = props.parent || null;

    return(
        <form className="form" noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Title" variant="outlined" 
                onChange={(e) => props.titleHandler(e.target.value)} />
            <TextField id="outlined-basic" label="Text" variant="outlined" multiline={true} 
                onChange={(e) => props.textHandler(e.target.value)} />
            <ColorPicker
                variant="outlined"
                name='colour'
                defaultValue='Main colour'
                // value={this.state.color} - for controlled component
                onChange={colour => props.colourHandler(colour)}
            />
            <ColorPicker
                variant="outlined"
                name='eye'
                defaultValue='Eye colour'
                // value={this.state.color} - for controlled component
                onChange={colour => props.eyeHandler(colour)}
            />
            <Button size='large' variant="contained" onClick={handleClickOpen}>
                Release
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Protect this fishy?</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    You can protect this fish by placing a password.
                    Only those that know or guess this password can kill this fish!
                    [This is an insecure password]
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="delete-password"
                    label="Protection Spell"
                    type="password"
                    fullWidth
                    onChange={handleSpell}
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {handleClose(); release();}} color="primary">
                        Release Fish!
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    )
}

export default FishyForm;
