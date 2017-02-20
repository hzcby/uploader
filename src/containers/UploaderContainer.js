import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux';
import Uploader from '../components/Uploader';

 class UploaderContainer extends Component {
    constructor (props) {
        super(props)

    }

    /*
    componentWillMount () {

    }

    componentDidMount () {

    }

    componentWillReceiveProps (nextProps) {

    }

    shouldComponentUpdate (nextProps, nextState) {

    }

    componentWillUpdate (nextProps, nextState) {

    }

    componentDidUpdate (prevProps, prevState) {

    }

    componentWillUnmount () {

    }
    */

    render () {
        const {dispatch}=this.props;
        return (
            <Uploader dispatch={dispatch}/>
        )
    }
}

UploaderContainer.propTypes = {

}

const mapStateToProps = (state) => {
    const {userid}=state;
    return {
        userid
    }
}

export default connect(mapStateToProps)(UploaderContainer)
