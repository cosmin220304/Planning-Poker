import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home from './screens/Home';
import Room from './screens/Room';
import { UserContext } from './utils/UserContext'
import './App.css'

export default class App extends Component {
    render() {
        return (
            <UserContext>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route path='/room/:roomId' component={Room} />
                </Layout>
            </UserContext>
        )
    }
}
