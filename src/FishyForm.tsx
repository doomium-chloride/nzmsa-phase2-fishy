import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import ColorPicker from 'material-ui-color-picker'
import { TextField } from '@material-ui/core';

function FishyForm(props: any){

    let parent = props.parent || null;

    return(
        <form className="form" noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Title" variant="outlined" 
                onChange={(e) => props.titleHandler(e.target.value)} />
            <TextField id="outlined-basic" label="Text" variant="outlined" multiline={true} 
                onChange={(e) => props.textHandler(e.target.value)} />
            <ColorPicker
                name='colour'
                defaultValue='Main colour'
                // value={this.state.color} - for controlled component
                onChange={colour => props.colourHandler(colour)}
            />
            <ColorPicker
                name='eye'
                defaultValue='Eye colour'
                // value={this.state.color} - for controlled component
                onChange={colour => props.eyeHandler(colour)}
            />
            <Button onClick={props.buttonHandler}>
                Release
            </Button>
        </form>
    )
}

export default FishyForm;
