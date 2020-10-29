import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class ConnectWallet extends Component {
  render() {

    let {
      loading,
      submitLogin,
      theme
    } = this.props

    if(!theme) {
      return null
    }

    return (
      <Grid
        container
        justify="space-around"
        direction="row"
        style={
          {
            marginTop: '50vh',
            transform: 'translate(0%,-50%)'
          }
        }
      >
        <Grid item xs={8} md={6} align='center'>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={submitLogin}
            disabled={loading}
          >
            Connect using Metamask
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default ConnectWallet;
