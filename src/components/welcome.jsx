import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import PageLoader from "./pageLoader";
import WelcomeImage from "../assets/images/welcome.png";

import ConnectWallet from "../containers/connectWallet.jsx";
import Snackbar from './snackbar';

class Welcome extends Component {
  render() {
    let { theme, loading } = this.props

    if(!theme) {
      return null
    }

    return (
      <Grid container style={theme.custom.welcomeBase}>
        {loading && (<PageLoader />)}
        {this.renderBase()}
        <Grid item xs={12} md={6} style={ { height: '100vh' } }>
          {this.renderScreen()}
        </Grid>
      </Grid>
    )
  }

  renderScreen() {
    let { theme, navigate, startLoading, stopLoading, setError } = this.props

    return (<ConnectWallet theme={ theme } navigate={ navigate } startLoading={ startLoading } stopLoading={ stopLoading } setError={ setError } />)
  }

  renderBase() {
    let { theme, error } = this.props

    return (
      <Grid item xs={12} md={6} style={ { padding: '80px', backgroundImage: "url(" + WelcomeImage + ")", backgroundSize: 'cover', minHeight: '100%', position: 'relative' } }>

        {this.renderGenText()}

        {error && <Snackbar open={true} type={'Error'} message={error} />}
      </Grid>
    )
  }

  renderGenText() {
    let { theme } = this.props

    let nextGenText = (
      <div style={ theme.custom.welcomeContent }>
        <Typography style={ theme.custom.welcomeText }>MetaWallet.</Typography>
        <Typography style={ theme.custom.welcomeText }>Gasless Wallet.</Typography>
      </div>
    )

    return nextGenText
  }
}

export default Welcome;
