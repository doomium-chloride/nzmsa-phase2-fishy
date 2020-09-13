import React from 'react';
import axios from 'axios';
import Fish from './Fish';
import FishyForm from './FishyForm';
import { useHistory } from 'react-router-dom';

// url = localhost:44311/

const serverBase = "https://localhost:44311/";
const fetchFish = "api/Fish";

interface FishObj {
    fishID: number,
    title: string,
    item: string,
    colour: string,
    eye: string
}

class Pond extends React.Component<any, any> {
    constructor(props: any){
        super(props);
        this.state = {
            fishID: props.fishID,
            fishes: [],
            mainFish: null,
            sendFishColour: 'black',
            sendFishEye: 'white',
            sendFishTitle: "",
            sendFishText: "" //item
        }
    }
    componentDidMount(){

        let that = this;

        axios.get(serverBase + fetchFish)
            .then(function (response) {
                let message = response.data;
                that.setState({
                    fishes: message
                })
            })
        
        if(this.state.fishID != null){
            axios.get(serverBase + fetchFish + "/" + this.state.fishID)
            .then(function (response) {
                let message = response.data;
                that.setState({
                    mainFish: message
                })
            })
        }
    }

    release(){

        let sendFish = {
            colour: this.state.sendFishColour,
            eye: this.state.sendFishEye,
            parent: this.state.fishID,
            item: this.state.sendFishText,
            title: this.state.sendFishTitle
        }

        axios.post(serverBase + fetchFish, sendFish);

        console.log(sendFish)
            
    }

    eyeHandler(colour: string){
        if(!colour){
            return
        }
        this.setState({
            sendFishEye: colour
        })
    }

    colourHandler(colour: string){
        if(!colour){
            return
        }
        this.setState({
            sendFishColour: colour
        })
    }

    textHandler(text: string){
        if(!text){
            return
        }
        this.setState({
            sendFishText: text
        })
    }

    titleHandler(text: string){
        if(!text){
            return
        }
        this.setState({
            sendFishTitle: text
        })
    }
    
    render(){
//
        let fishes = this.state.fishes;

        let fishElements: any[] = [];

        let mainFish = this.state.mainFish;

        let sendFish = {
            colour: this.state.sendFishColour,
            eye: this.state.sendFishEye,
            parent: this.state.fishID,
            item: this.state.sendFishText,
            title: this.state.sendFishTitle
        }

        console.log(sendFish)
        if(mainFish){
            
            for(let i = 0; i < fishes.length; i++){
                let fish = fishes[i];
                if(fish.parent == mainFish.fishID){
                    fishElements.push(<Fish colour={fish.colour} eye={fish.eye} key={"fish" + i} 
                        onClick={fishyRedirect(fish.fishID)} />);
                }
            }

            return(
                <div>
                    {fishElements}
                </div>
            )
        } else{
            fishes.forEach((fish: any, i: number) =>   fishElements.push(<Fish colour={fish.colour} 
                eye={fish.eye} key={"fish" + i} dataTip={fish.title} onClick={fishyRedirect(fish.fishID)} />));
            return(
                <div>
                    <FishyForm colourHandler={this.colourHandler.bind(this)} 
                        eyeHandler={this.eyeHandler.bind(this)} 
                        textHandler={this.textHandler.bind(this)}
                        titleHandler={this.titleHandler.bind(this)}
                        buttonHandler={this.release.bind(this)}/>
                    {fishElements}
    
                </div>
            )
        }
    }
}


function fishyRedirect(fishID: number){
    
    return(
        () => {
            window.location.href = `/${fishID}`;
        }
    )
}

export default Pond;