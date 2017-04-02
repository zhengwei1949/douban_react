/*
 * 电影列表容器组件
 * */
import React from 'react'
import service from '../service/movieService.js'

import '../styles/movieList.css'

export default class MovieDetailContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            isBottom:false,
            movieListData: [],
            // 把需要传递给后台的数据都放在message中
            message:{
                movieType:'in_theaters',
                pageIndex:1,
                start:0,
                count:10
            }
        }
    }

    static contextTypes={
        router:React.PropTypes.object
    }


    componentDidMount() {
        this.fetch(this.state.message.movieType)
    }

    componentDidUpdate(){
        this.addEventListener()
    }

    addEventListener=()=>{
        const _this=this
        this.refs.scrollContainer.onscroll=function (e) {
            if(e.target.scrollHeight==e.target.offsetHeight+e.target.scrollTop){
                console.log('到底了')

                // 防止多次触发数据请求
                if(_this.state.isBottom){
                    return
                }

                // 告诉项目我们到底了
                _this.setState({
                    isBottom:true
                })

               _this.fetch(_this.state.message.movieType)
            }
        }
    }

    // 数据请求访问
    fetch = (movieType)=> {
        const _this = this
        // 深拷贝一份数组数据出来
        let movieListData=[].concat(this.state.movieListData)
        // 深拷贝一个对象出来
        let mesaage=Object.assign({},this.state.message)
        mesaage.movieType=movieType
        mesaage.start=(mesaage.pageIndex-1)*mesaage.count
        mesaage.pageIndex++

        const promise = service.getMovieListData(JSON.stringify(mesaage))
        promise.then(
            function (data) {
                if(movieListData.length>0){
                    movieListData=movieListData.concat(data.subjects)
                }else{
                    movieListData=data.subjects
                }
                _this.setState({
                    isLoading: false,
                    isBottom:false,
                    movieListData: movieListData,
                    message:mesaage
                })
            },
            function (err) {
            }
        ).catch(function (err) {

        })

    }

    // 跳转到详细页面
    goDetail=(id)=>{
        this.context.router.push(`/movie/movieDetail/${id}`)
    }

    // 渲染loading遮罩
    renderLoading = ()=> {
        return (
            <div>
                正在加载数据，请等待......
            </div>
        )
    }

    // 渲染电影列表
    renderMovieList = ()=> {
        return (
            <div ref="scrollContainer" className="movieList_container">
                {this.state.movieListData.map(this.renderItem)}
                <div className={this.state.isBottom?"movieList_show":"movieList_hide"}>
                    <span>正在请求新的数据，请稍等！</span>
                </div>
            </div>
        )
    }

    // 渲染每一行数据
    renderItem = (item)=>{
        return (
            <div className="movieList_item" key={item.id+Math.random()} onClick={()=>this.goDetail(item.id)}>
                <img src={item.images.small} alt=""/>
                <div>
                    <h1>{item.title}</h1>
                    <span>{item.year}</span>
                </div>
            </div>
        )
    };

    render() {
        if (this.state.isLoading) {
            return this.renderLoading()
        }
        return this.renderMovieList()
    }
}

