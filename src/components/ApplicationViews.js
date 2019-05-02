import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import ResourceManager from "../ResourceManager"
import Login from "./login/Login"
import Home from "./home/Home"
import PostPoolForm from "./postPool/PostPoolForm"
import PostPoolFinish from "./postPool/PostPoolFinish"
import ViewMyPosts from "./postPool/ViewMyPosts"
import PoolAdEditForm from "./postPool/PoolAdEditForm"
import FindPool from "./findPool/FindPool"
import SavedPools from "./savedItems/SavedPools"
import Register from "./login/Register"

export default class ApplicationViews extends Component {
    //set up state to contain all data obtained from first fetch calls and fetch calls after login happens. findPools is specific data that does not include the current user Id. this allows the user to only see pool Ads that other people made and not their own. 
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

    //runs function to perform all fetch calls. doing it here allows the user to get their specific data if they refresh the page.  when user opens page at first, this will bring back no data, but all fetch calls are based on userId, which isn't obtained until after they log in
    componentDidMount() {
        this.loadAllData()
    }

    //function to gather all data base on userId set by sessionStorage. this function runs in componentDidMount and also on the onLogin function, which happens when the user logs in. 
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

    // function runs true if sessionStorage is set. function is called in the routes at the bottom. this will be used in if statements to see if the user has logged in first. If they haven't logged in yet and try to go to different spots on the website, it will redirect them to the login page. 
    isValid = () => sessionStorage.getItem("valid") !== null

    //this is the oposite of isValid funcion, it returns true if sessionstorage is not set. this is only used on the register page so if the user is logged in, they can not reach the register page, it will redirect them home. they have to be logged out to register a new account
    isRegister = () => sessionStorage.getItem("valid") === null

    //function is called when user clicks log in. this loads data based on userId and sets state so data can be passed down into the proper component
    onLogin = () => {
        this.loadAllData()
    }

    //function is called when user clicks Register new account. this performs a post method into the users resource to create a new user. then function gets all users data and sets the new state
    postUsers = (object) => {
        return ResourceManager.postUsers(object)
            .then(() => ResourceManager.getUsers())
            .then(user => this.setState({
                users: user
            }))
    }

    //function is called in postPool section. performs a post method to create a new poolAd in poolAds resource. the object to be passed in contains all the keys and values from the postPoolForm
    postPoolAd = (object) => {
        return ResourceManager.postPoolAd(object)
            .then(() => ResourceManager.getUserData("poolAds", sessionStorage.getItem("valid")))
            .then(poolAd => this.setState({
                poolAds: poolAd
            }))
    }

    //function is called when the user wants to delete their poolAd that they have created already. needs ID as an argument to know which poolAd to delete
    deletePoolAd = (id) => {
        return ResourceManager.deletePoolAd(id)
            .then(() => ResourceManager.getUserData("poolAds", sessionStorage.getItem("valid")))
            .then(poolAd => this.setState({
                poolAds: poolAd
            }))
    }

    //function is called when user wants to edit an already exisiting poolAd. the object is the updated object to replace the old one.
    putPoolAd = (object) => {
        return ResourceManager.putPoolAd(object)
            .then(() => ResourceManager.getUserData("poolAds", sessionStorage.getItem("valid")))
            .then(poolAd => this.setState({
                poolAds: poolAd
            }))
    }

    //function is call when a user finds a pool they want to save to their profile. post the object into the savedPools resource. the object only contains id, userId, and poolAdId. this creates a relationship so i'm able to show the full poolAd in the saved items section of the app
    postSavedPool = (object) => {
        return ResourceManager.postSavedPool(object)
            .then(() => ResourceManager.getSavedPools(sessionStorage.getItem("valid")))
            .then(savedPool => this.setState({
                savedPools: savedPool
            }))
    }

    //if a user doesn't want to see the pool they saved anymore, then they can delete it. this function is called when they click the delete button under my saved items. id is needed again to target the one they want to delete
    deleteSavedPool = (id) => {
        return ResourceManager.deleteSavedPool(id)
            .then(() => ResourceManager.getSavedPools(sessionStorage.getItem("valid")))
            .then(savedPool => this.setState({
                savedPools: savedPool
            }))
    }

    render() {
        return (
            // path "/" goes to login page from Login component. need to pass in users from state so I can compare the input values with username and password so I know they exisit. ...props allows me to use this.props.history.push so i can redirect the user where ever i want after they log in. onLogin function will fetch all data base on session storage. 
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <Login users={this.state.users} {...props} onLogin={this.onLogin} />
                }} />

            {/* register path calls register component. this takes them to register page where new user can be created. isRegister function will test if the user is already logged in. if they are, then redirect them to home page, if not, the allows user to see register component and make a new account. ...props allows me to redirect them to where ever i want, using this.props.history.push. users is need to make sure the username doesn't already exisit. postUsers will post the new username and password to the user resource */}
                <Route exact path="/register" render={(props) => {
                    if (this.isRegister()){
                        return <Register onLogin={this.onLogin} {...props} users={this.state.users} postUsers={this.postUsers} />
                    } else {
                        return <Redirect to="/home" />
                      }
                }} />

                {/* route to home page. Home page is fairly simple, has a about section within it. calls isValid to make sure user is logged in */}
                <Route path="/home" render={(props) => {
                    if (this.isValid()) {
                        return <Home />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />

                {/* postPoolForm uses postPoolAd function. from this screen user fills out a form and when clicks save, runs the function to post the poolAd into the json file */}
                <Route exact path="/postpool/postpoolform" render={(props) => {
                    if (this.isValid()) {
                        return <PostPoolForm {...props} postPoolAd={this.postPoolAd} />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />

                {/* after a user post a pool, he is taken here. this thanks user for posting pool. user can either leave this page via the nav bar or click a button to let them post another Ad or to view their current posts. ...props is needed to redirect them from the button clicks */}
                <Route exact path="/postpoolfinish" render={(props) => {
                    return <PostPoolFinish {...props} />
                }} />

                {/* component lets you see what the user has already posted. from this screen they can go into the edit path or delete one of their posts. this.state.poolAds is the data for the poolAds and deletePoolAd lets user delete the data from the json file */}
                <Route exact path="/postpool/viewmyposts" render={(props) => {
                    if (this.isValid()) {
                        return <ViewMyPosts {...props} poolAds={this.state.poolAds} deletePoolAd={this.deletePoolAd} />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />

                {/* component contains the edit form for already created pool ads. poolAdId is needed so when the put method is called, we can reference poolAdId to know which poolAd we are updating/editing. (\d+) is used to make sure the end is a number. putPoolAd is the function to perform the put method and ...props is used to redirect user after edit is performed */}
                <Route exact path="/viewmyposts/editpost/:poolAdId(\d+)" render={(props) => {
                    return <PoolAdEditForm putPoolAd={this.putPoolAd} {...props} />
                }} />

                {/* component will list poolAds that people have created. findPools is a filtered fetch call to say get data that does not equal current user Id. users is passed in so I can display username of who created the ad. postSavedPool is needed so user can save a pool they like. savedPools is needed so when a user saves a pool, we can filter the data so it isn't displayed on the DOM anymore. ...props so we can redirect the user */}
                <Route exact path="/findpool" render={(props) => {
                    if(this.isValid()) {
                        return <FindPool findPools={this.state.findPools} {...props} users={this.state.users} postSavedPool={this.postSavedPool} savedPools={this.state.savedPools} />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />

                {/* component displays pools user has saved. user can delete the saved pools if they don't want them in this section anymore. savedPools is the data of the pool they saved. users is used so we can display username under the pool they saved. */}
                <Route exact path="/mysaveditems" render={(props) => {
                    if(this.isValid()) {
                        return <SavedPools savedPools={this.state.savedPools} {...props} users={this.state.users} deleteSavedPool={this.deleteSavedPool} />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />
            </React.Fragment>
        )
    }
}
