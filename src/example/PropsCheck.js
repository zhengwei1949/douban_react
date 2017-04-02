// react中的属性校验
import React, { Component } from 'react';

export default class PropsCheck extends Component {
    constructor(props) {
        super(props);
    }

    // 进行属性校验
    static propTypes = {
        autoPlay: React.PropTypes.bool.isRequired,
        maxLoops: React.PropTypes.number.isRequired
    }


    render() {
        return (
            <div>
                属性校验
            </div>
        );
    }
}

//写在外面的写法
// MyInputFocus.defaultProps={
//    autoPlay:false,
//    maxLoops:10,
// }
// MyInputFocus.propTypes = {
//    autoPlay: React.PropTypes.bool.isRequired,
//    maxLoops: React.PropTypes.number.isRequired,
// }
