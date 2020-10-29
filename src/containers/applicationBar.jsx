import React from 'react'
import ApplicationBarComponent from '../components/applicationBar'
const createReactClass = require('create-react-class')

let ApplicationBar = createReactClass({
  getInitialState() {
    return { }
  },
  render() {
    return (
      <ApplicationBarComponent
        menuClicked={this.props.menuClicked}
        account={this.props.account}
        size={this.props.size}
        title={this.props.title}
        theme={this.props.theme}
      />
    )
  },

})

export default (ApplicationBar);
