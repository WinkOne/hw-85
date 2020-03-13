import React from 'react';
import './App.css';
import {Route, Switch} from "react-router";
import Main from "./containers/Main";
import Layout from "./components/Layout/Layout";
import Album from "./containers/Album";
import Track from "./containers/Track";

function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/:id" exact component={Album}/>
                <Route path="/track/:id" exact component={Track}/>
                <Route render={() => <h1>Not found</h1>}/>
            </Switch>
        </Layout>
    );
}

export default App;
