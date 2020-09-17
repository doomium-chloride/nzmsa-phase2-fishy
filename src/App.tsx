import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, withRouter, useParams
} from "react-router-dom";
import Fish from './Fish';
import Pond from './Pond';
import logo from './logo.svg';
import './App.css';


function App() {
    console.log(process.env.PUBLIC_URL);
  return (
    
    <Router basename={process.env.PUBLIC_URL}>
            <div className="App">

                <Switch>
                    <Route exact path="/">
                        <Pond />
                    </Route>
                    <Route path="/meh">
                        <h1>Hello!!!</h1>
                    </Route>
                    <Route path="/:fishID" component={Child} />
                </Switch>
            </div>
    </Router>
    
  );
}


function Child(){
    let { fishID } = useParams();
    return(<Pond fishID={fishID}/>);
}


export default App;
