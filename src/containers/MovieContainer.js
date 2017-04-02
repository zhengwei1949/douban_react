/*
 * 电影容器组件
 * */
import React from 'react'
import '../styles/movie.css'

export default class MovieContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
           <div className="movie_container">
               <div className="movie_menu">
                   <a href="">正在热映</a>
                   <a href="">即将上映</a>
                   <a href="">Top250</a>
               </div>
               <div className="movie_right">
                   <div className="movie_search">
                       <input type="text"/>
                       <button>搜索</button>
                   </div>
                   <div className="movie_content">
                       {this.props.children}
                   </div>
               </div>
           </div>
        );
    }
}

