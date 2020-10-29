import React, { Component } from "react";
import {
  Grid,
  Typography,
  SvgIcon,
} from "@material-ui/core";
import config from "../config";

function TickIcon(props) {
  const { color } = props;
  return (
    <SvgIcon style={{fontSize: '60px', marginRight: '40px'}}>
      <path
        fill={ color }
        d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5"
      />
    </SvgIcon>
  );
}

class CompletePayment extends Component {
  renderError() {
    return (
      <Grid
        container
        justify="center"
        alignItems="flex-start"
        direction="row"
        spacing={0}
        style={{ position: "relative", marginTop: "24px" }}
      >
        <Grid item xs={10} align="left" style={{ marginTop: "12px" }}>
          <Typography variant="body1">
            Your payment was unfortunately <b>not</b> successfully processed.
          </Typography>
        </Grid>
        <Grid item xs={10} align="left" style={{ marginTop: "12px" }}>
          <Typography variant="body1">
            If the problem persists, please contact caih support with the
            following error
          </Typography>
        </Grid>
        <Grid item xs={10} align="left" style={{ marginTop: "12px" }}>
          <Typography variant="subtitle1" style={{ color: "#f44336" }}>
            {this.props.error}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  renderSuccess() {
    let { theme, chain, transactionID } = this.props

    let url = ''
    switch (chain) {
      case 'Aion':
        url = config.aionscanURL + transactionID;
        break;
      case 'Binance':
        url = config.binancescanURL + transactionID;
        break;
      case 'Bitcoin':
        url = config.bitcoinscanURL + transactionID;
        break;
      case 'Ethereum':
        url = config.etherscanUrl + transactionID;
        break;
      case 'Tezos':
        url = config.tezosscanURL + transactionID;
        break;
      case 'Wanchain':
        url = config.wanscanURL + transactionID;
        break;
      default:
        break;
    }

    return (
      <Grid
        container
        justify="center"
        alignItems="flex-start"
        direction="row"
        spacing={0}
        style={{ position: "relative", marginTop: "24px" }}
      >
        <Grid item xs={10} align="left">
          <div style={{display: 'inline-block'}}>
            <TickIcon
              color={theme.custom.tickIcon.color}
            />
          </div>
          <div style={{display: 'inline-block', verticalAlign: 'top'}}>
            <Typography variant="h5" style={{lineHeight: '64px'}}>Payment Sent</Typography>
          </div>
        </Grid>
        <Grid item xs={10} align="left" style={{ marginTop: "36px" }}>
          <Typography variant="body1" stlye={{ fontSize: '13px' }}>
            Your payment was successfully processed.
          </Typography>
        </Grid>
        <Grid item xs={10} align="left" style={{ marginTop: "36px" }}>
          <Typography variant="body1" stlye={{ fontSize: '13px' }}>
            Please wait while the transaction is being mined. Once completed,
            the funds will relect on your account.
          </Typography>
        </Grid>
        <Grid item xs={10} align="left" style={{ marginTop: "36px" }}>
          <Typography variant="body1" stlye={{ fontSize: '13px' }}>
            You can view the progress of your transaction using the following
            transaction ID:{" "}
            <a href={url} target="_blank" rel="noopener noreferrer">
              {this.props.transactionID}
            </a>
          </Typography>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <div>
        {this.props.error == null && this.renderSuccess()}
        {this.props.error != null && this.renderError()}
      </div>
    );
  }
}

export default CompletePayment;
