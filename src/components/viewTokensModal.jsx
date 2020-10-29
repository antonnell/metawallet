import React, { Component } from "react";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


class ViewTokensModal extends Component {

  renderTokens() {
    let { tokens } = this.props

    if(tokens && tokens.length > 0 ) {
      return tokens.map((token) => {
        return this.renderToken(token)
      })
    } else {
      //something went wrong
    }
  }

  renderHeader() {
    let headerStyle = {
      padding: '16px',
      backgroundColor: '#2f3031'
    }
    let textStyle = {
      color: '#ffffff',
      fontSize: '14px',
      fontWeight: '600'
    }

    return (<Grid item xs={12} align='left'>
      <Card style={{borderRadius: '3px'}}>
        <Grid container>
          <Grid item xs={6} align='left' style={headerStyle}>
            <Typography variant="body1" style={textStyle}>
              Token
            </Typography>
          </Grid>
          <Grid item xs={3} align='left' style={headerStyle}>
            <Typography variant="body1" style={textStyle}>
              Balance
            </Typography>
          </Grid>
          <Grid item xs={3} align='left' style={headerStyle}>
            <Typography variant="body1" style={textStyle}>
              Send
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>)
  }

  renderToken(token) {

    let bodyStyle = {
      padding: '16px',
    }
    let textStyle = {
      color: '#2f3031',
      fontSize: '14px',
      fontWeight: '400',
      verticalAlign: 'middle'
    }
    let divStyle = {
      display: 'inline-block',
      verticalAlign: 'middle'
    }

    return(
      <Grid item xs={12} align='left'>
        <Card style={{marginTop:'16px', borderRadius: '3px'}}>
          <Grid container justify="center" alignItems="center" direction="row">
            <Grid item xs={6} align='left' style={bodyStyle}>
              <div style={divStyle}>
                <Typography variant="body1" style={textStyle}>
                  {
                    token.name != null ? token.name : token.symbol
                  }
                </Typography>
              </div>
            </Grid>
            <Grid item xs={3} align='left' style={bodyStyle}>
              <Typography variant="body1" style={textStyle}>
                { parseFloat( token.balance != null ? token.balance : token.free ).toFixed(4) + ' ' + token.symbol }
              </Typography>
            </Grid>
            <Grid item xs={3} align='left' style={bodyStyle}>
              <Button
                size="medium"
                variant="contained"
                color="primary"
                onClick={() => { this.props.transactClicked({
                  name: token.name,
                  symbol: token.symbol,
                  type: this.props.tokenType
                }, null, { address: this.props.account }) }}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    )
  }

  render() {
    return (
      <Dialog open={this.props.isOpen} onClose={this.props.handleClose} fullWidth={true} maxWidth={'md'} TransitionComponent={Transition}>
        <DialogContent>
          <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
            {this.renderHeader()}
            {this.renderTokens()}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button disabled={this.props.createLoading} variant='contained' size='small' onClick={this.props.handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

export default (ViewTokensModal);
