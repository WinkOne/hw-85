import React, {Component, Fragment} from 'react';
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Main from "./containers/Main/Main";
import {Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";
import Album from "./containers/Album/Album";
import Register from "./containers/Register/Register";
import Track from "./containers/Track/Track";
import Login from "./containers/Login/Login";
import TrackHistory from "./containers/TrackHistory/TrackHistory.js";

class App extends Component {
    render() {
        return (
            <Fragment>
                <header>
                    <Toolbar/>
                </header>
                <Container style={{marginTop: '20px'}}>
                    <Switch>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/" exact component={Main}/>
                        <Route path="/albums/:id" exact component={Album}/>
                        <Route path="/track/:id" exact component={Track}/>
                        <Route path="/trackhistory" component={TrackHistory}/>
                    </Switch>
                </Container>
            </Fragment>
        );
    }
}

export default App;
