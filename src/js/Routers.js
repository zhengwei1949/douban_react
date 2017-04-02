/*
* 路由配置文件
* */
import React from 'react'
import { Router, Route,IndexRoute,Redirect,browserHistory} from 'react-router'

import AppContainer from '../containers/AppContainer.js'
import HomeContainer from '../containers/HomeContainer.js'
import MovieContainer from '../containers/MovieContainer.js'
import MovieListContainer from '../containers/MovieListContainer.js'
import MovieDetailContainer from '../containers/MovieDetailContainer.js'
import MovieSearchContainer from '../containers/movieSearchContainer.js'
import AboutContainer from '../containers/AboutContainer.js'

export default class Routers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={AppContainer}>
                    <IndexRoute component={HomeContainer}/>
                    <Route path="home" component={HomeContainer} />
                    <Route path="movie"
                           component={MovieContainer}
                           onEnter={()=>console.log('进入了movie路由')}
                           onLeave={()=>console.log('离开了movie路由')}
                    >
                        <IndexRoute component={MovieListContainer}/>
                        {/*绝对路由*/}
                        <Route path="movieList" component={MovieListContainer} />
                        <Route path="movieDetail/:id" component={MovieDetailContainer} />
                        <Route path="movieSearch" component={MovieSearchContainer} />
                        {/*<Redirect from="movieList" to="/movieList" />*/}
                        {/*<Redirect from="movieDetail" to="/movieDetail" />*/}
                    </Route>
                    <Route path="about" component={AboutContainer} />
                </Route>
            </Router>
        );
    }
}

