import React, {Fragment} from 'react';
import Main from "./containers/Main/Main";
import {Route, Switch} from "react-router-dom";
import Album from "./containers/Album/Album";
import Register from "./containers/Register/Register";
import Track from "./containers/Track/Track";
import Login from "./containers/Login/Login";
import TrackHistory from "./containers/TrackHistory/TrackHistory.js";
import artist from "./containers/Add/artist";
import ButtonAppBar from "./components/UI/Toolbar/ButtonAppBar";
import album from "./containers/Add/album";
import track from "./containers/Add/track";


function App() {
    return (
        <Fragment>
            <header>
                <ButtonAppBar/>
            </header>
            <Switch>
                <Route path="/register" exact component={Register}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/" exact component={Main}/>
                <Route path="/addartist" exact component={artist}/>
                <Route path="/addalbum" exact component={album}/>
                <Route path="/addtrack" exact component={track}/>
                <Route path="/albums/:id" exact component={Album}/>
                <Route path="/track/:id" exact component={Track}/>
                <Route path="/trackhistory" component={TrackHistory}/>
            </Switch>
        </Fragment>
    );
}

export default App;
