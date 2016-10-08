import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as testActions from '../redux/actions/test';

class App extends Component {
    render() {
        return (
            <div onClick={this.onClick.bind(this)}>
                Click me and see this change: {this.props.test + ''}
            </div>
        );
    }

    onClick() {
        this.props.dispatch(testActions.test());
    }
}


export default connect(
    (state) => state
)(App);
