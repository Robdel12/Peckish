import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Home from '../containers/Home';

class AppContainer extends Component {
  render() {
    return ( <Home {...this.props} /> ) ;
  }
}

// sends actions to the entire app
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {
  return {}
}, mapDispatchToProps)(AppContainer);
