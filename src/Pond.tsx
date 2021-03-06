import React from 'react';
import axios from 'axios';
import Fish from './Fish';
import FishyForm from './FishyForm';
import { useHistory } from 'react-router-dom';
import FishyContent from './FishyContent';
import { IconButton, Icon, SvgIcon } from '@material-ui/core';
import up from './up.svg';
import SortingTable from './SortingTable';
import {sort} from './Sorter';
import FuzzySearch from 'fuzzy-search';
import { serverBase, fetchFish, urlBase } from './Globals';

// url = localhost:44311/
let count = 0

interface FishObj {
    fishID: number,
    title: string,
    item: string,
    colour: string,
    eye: string
}

const fishSvgPath = "./fishes/";
const fishyList = ["fish1.svg", "fish2.svg", "fish3.svg", "fish4.svg"]

function getRandom(array: string[]){
    const len = array.length;
    const i = Math.floor(Math.random() * len);
    return array[i];
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
            sendFishText: "", //item
            sortBy: 'none',
            sortAscending: true,
            narrow: false,
            searchItem: "",
            limit: 0,
            spell: ""
        }
    }
    componentDidMount(){

        let that = this;

        axios.get(urlBase)
            .then(function (response) {
                let message = response.data;
                that.setState({
                    fishes: message
                })
            })
            .catch(() =>{
                console.error("Fetch fishes failed");
            })
        
        if(this.state.fishID != null){
            let fishID = this.state.fishID || 0
            axios.get(urlBase + fishID)
            .then(function (response) {
                let message = response.data;
                that.setState({
                    mainFish: message
                })
            })
            .catch(() => {
                console.log("Fetch main fish failed. Maybe there's no main fish.");
            })
        }

        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate.bind(this));
    }

    release(){

        let sendFish = {
            colour: this.state.sendFishColour,
            eye: this.state.sendFishEye,
            parent: parseInt(this.state.fishID) || 0,
            item: this.state.sendFishText,
            title: this.state.sendFishTitle,
            created: new Date(),
            del: this.state.spell
        }

        axios.post(serverBase + fetchFish, sendFish)
            .then(() => {
                window.location.reload();
            })
            .catch(() => {
                console.error("Something wrong with the release")
            });

            
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

    sortHandler(ascending: boolean, attribute: string){
        this.setState({
            sortBy: attribute,
            sortAscending: ascending
        });
    }

    updatePredicate() {
        this.setState({ narrow: window.innerWidth < 1000 });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate.bind(this));
    }

    searchHandler(text: string) {
        this.setState({
            searchItem: text
        })
    }

    limitHandler(value: number){// show Top X
        this.setState({
            limit: value
        })
    }

    spellHandler(spell: string){
        this.setState({
            spell: spell
        })
    }
    
    render(){
//
        let attribute = this.state.sortBy;
        let ascending = this.state.sortAscending;
        let fishes = this.state.fishes;

        let searcher = new FuzzySearch(fishes, ['title', 'item']);
        if(this.state.searchItem != ""){
            fishes = searcher.search(this.state.searchItem);
        }

        fishes = sort(fishes, attribute, ascending);

        let limit = this.state.limit;
        if(limit > 0){
            fishes = fishes.slice(0, limit);
        }

        let sortHandle = [() => this.sortHandler(!ascending, 'none'), () => this.sortHandler(!ascending, 'title'),
            () => this.sortHandler(!ascending, 'created')]

        let fishElements: any[] = [];

        let mainFish = this.state.mainFish;

        if(mainFish){
            
            for(let i = 0; i < fishes.length; i++){
                let fish = fishes[i];
                if(fish.parent == mainFish.fishID){
                    fishElements.push(<Fish colour={fish.colour} eye={fish.eye} key={"fish" + i} 
                    dataTip={fish.title} onClick={fishyRedirect(fish.fishID)} />);
                }
            }


            return(
                <div>

                    <div className="up-button">
                        <IconButton onClick={fishyRedirect(mainFish.parent)}>
                            <SvgIcon viewBox="0 0 400 400" fontSize='large'>
                                <circle cx="200" cy="200" r="200" fill="green" />


                                <polygon points="200,50, 50,150, 350,150" fill="white"/>

                                <rect x="150" y="140" width="100" height="210" fill="white" />
                            </SvgIcon>
                        </IconButton>
                    </div>
                    

                    <FishyContent fish={mainFish} />

                    <FishyForm colourHandler={this.colourHandler.bind(this)} 
                        eyeHandler={this.eyeHandler.bind(this)} 
                        textHandler={this.textHandler.bind(this)}
                        titleHandler={this.titleHandler.bind(this)}
                        buttonHandler={this.release.bind(this)}
                        spellHandler={this.spellHandler.bind(this)} />

                    
                    <div className="form">
                        <SortingTable attribute={attribute} ascending={ascending} 
                            clickHandler={sortHandle} narrow={this.state.narrow} 
                            searchHandler={this.searchHandler.bind(this)} 
                            limitHandler={this.limitHandler.bind(this)} 
                            limit={limit} />
                    </div>


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
                        buttonHandler={this.release.bind(this)}
                        spellHandler={this.spellHandler.bind(this)} />
                    
                    
                    <div className="form">
                        <SortingTable attribute={attribute} ascending={ascending} 
                            clickHandler={sortHandle} narrow={this.state.narrow} 
                            searchHandler={this.searchHandler.bind(this)} 
                            limitHandler={this.limitHandler.bind(this)}
                            limit={limit} />
                    </div>
                    

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