import React from 'react';
import ReactToolTip from 'react-tooltip';
import { prependOnceListener } from 'cluster';
import ReactTooltip from 'react-tooltip';

const baseStr = "fishInstance";

function Fish(props: any)
{

    let eye = props.eye || "white";

    let colour = props.colour || "black";
    
    let onclick = props.onClick || function(){ return undefined};

    let tip = props.dataTip || "";

    let id = props.fishID || Math.random();

    return(
        <div className="fish" data-tip={tip} data-for={baseStr + id}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" onClick={onclick}>
    
                <circle cx="100" cy="200" r="100" fill={colour} data-tip />
                
                <circle cx="50" cy="150" r="10" fill={eye} />


                <polygon points="150,200, 250,100, 250,300" fill={colour}/>


            </svg> 
            <ReactTooltip id={baseStr + id}>
                {tip}
            </ReactTooltip>
        </div>
    )
}

export default Fish;