import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Fish from './Fish';
import Pond from './Pond';
import logo from './logo.svg';
import './App.css';

function App() {
    console.log(window.location.href);
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
                    <Route path="/:fishID" component={child} />
                </Switch>
            </div>
    </Router>
    
  );
}

const child = ({ match }: any) => (

    //<Pond fishID={match.params.fishID}/>
    <h1>match.params.fishID</h1>
)

export default App;
