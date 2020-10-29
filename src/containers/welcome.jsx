import React from "react";
import WelcomeComponent from "../components/welcome";

const createReactClass = require("create-react-class");

let Welcome = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null
    };
  },

  render() {
    return (
      <WelcomeComponent
        theme={ this.props.theme }
        navigate={ this.navigate }
        loading={ this.state.loading }
        startLoading={ this.startLoading }
        stopLoading={ this.stopLoading }
        setError={ this.setError }
        error={ this.state.error }
      />
    )
  },

  setError(error) {
    this.setState({ error })
  },

  setCredentials(credentials) {
    this.setState({ credentials })
  },

  startLoading() {
    this.setState({ loading: true })
  },

  stopLoading() {
    this.setState({ loading: false })
  },

  setEmail(email) {
    this.setState({ email: email });
  },

  navigate(currentScreen) {
    window.location.hash = '#'+currentScreen;
  }
});

export default Welcome;
