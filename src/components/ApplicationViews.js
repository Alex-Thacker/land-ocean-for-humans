import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import ResourceManager from "../ResourceManager"
import Login from "./login/Login"
import Home from "./home/Home"
import PostPool from "./postPool/PostPool"
import PostPoolForm from "./postPool/PostPoolForm"
import PostPoolFinish from "./postPool/PostPoolFinish"
import ViewMyPosts from "./postPool/ViewMyPosts"
import PoolAdEditForm from "./postPool/PoolAdEditForm"
import FindPool from "./findPool/FindPool"
import SavedPools from "./savedItems/SavedPools"

export default class ApplicationViews extends Component {
    state = {
        users: [],
        poolAds: [],
        findPools: [],
        savedPools: [],
        //stretch goals under here
        savedGames: [],
        poolGames: [],
        comments: []
    }

    componentDidMount() {
        this.loadAllData()
    }

    loadAllData = () => {
        let newState = {}

        ResourceManager.getUsers()
            .then(user => newState.users = user)
            .then(() => ResourceManager.getUserData("poolAds", sessionStorage.getItem("valid")))
            .then(poolAd => newState.poolAds = poolAd)
            .then(() => ResourceManager.getUserData("savedPools", sessionStorage.getItem("valid")))
            .then(savedPool => newState.savedPools = savedPool)
            .then(() => ResourceManager.findPoolAd(sessionStorage.getItem("valid")))
            .then(findPool => newState.findPools = findPool)
            .then(() => ResourceManager.getSavedPools(sessionStorage.getItem("valid")))
            .then(savedPool => newState.savedPools = savedPool)
            .then(() => this.setState(newState))
    }

    onLogin = () => {
        this.loadAllData()
    }

    postPoolAd = (object) => {
        return ResourceManager.postPoolAd(object)
            .then(() => ResourceManager.getUserData("poolAds", sessionStorage.getItem("valid")))
            .then(poolAd => this.setState({
                poolAds: poolAd
            }))
    }

    deletePoolAd = (id) => {
        return ResourceManager.deletePoolAd(id)
            .then(() => ResourceManager.getUserData("poolAds", sessionStorage.getItem("valid")))
            .then(poolAd => this.setState({
                poolAds: poolAd
            }))
    }

    putPoolAd = (object) => {
        return ResourceManager.putPoolAd(object)
            .then(() => ResourceManager.getUserData("poolAds", sessionStorage.getItem("valid")))
            .then(poolAd => this.setState({
                poolAds: poolAd
            }))
    }

    postSavedPool = (object) => {
        return ResourceManager.postSavedPool(object)
            .then(() => ResourceManager.getSavedPools(sessionStorage.getItem("valid")))
            .then(savedPool => this.setState({
                savedPools: savedPool
            }))
    }

    deleteSavedPool = (id) => {
        return ResourceManager.deleteSavedPool(id)
            .then(() => ResourceManager.getSavedPools(sessionStorage.getItem("valid")))
            .then(savedPool => this.setState({
                savedPools: savedPool
            }))
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <Login users={this.state.users} {...props} onLogin={this.onLogin} />
                }} />
                <Route path="/home" render={(props) => {
                    return <Home {...props} />
                }} />
                <Route exact path="/postpool" render={(props) => {
                    return <PostPool {...props} />
                }} />
                <Route exact path="/postpool/postpoolform" render={(props) => {
                    return <PostPoolForm {...props} postPoolAd={this.postPoolAd} />
                }} />
                <Route exact path="/postpoolfinish" render={(props) => {
                    return <PostPoolFinish {...props} />
                }} />
                <Route exact path="/postpool/viewmyposts" render={(props) => {
                    return <ViewMyPosts {...props} poolAds={this.state.poolAds} deletePoolAd={this.deletePoolAd} />
                }} />
                <Route exact path="/viewmyposts/editpost/:poolAdId(\d+)" render={(props) => {
                    return <PoolAdEditForm putPoolAd={this.putPoolAd} {...props} />
                }} />
                <Route exact path="/findpool" render={(props) => {
                    return <FindPool findPools={this.state.findPools} {...props} users={this.state.users} postSavedPool={this.postSavedPool} savedPools={this.state.savedPools} />
                }} />
                <Route exact path="/mysaveditems" render={(props) => {
                    return <SavedPools savedPools={this.state.savedPools} {...props} users={this.state.users} deleteSavedPool={this.deleteSavedPool} />
                }} />
            </React.Fragment>
        )
    }
}
