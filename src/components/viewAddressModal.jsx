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


class ViewAddressModal extends Component {

  renderAddresses() {
    let { viewAddress } = this.props

    if(viewAddress && viewAddress.addresses && viewAddress.addresses.length > 0 ) {
      return viewAddress.addresses.map((address) => {
        return this.renderAddress(address)
      })
    } else {
      //something went wrong
    }
  }

  renderHeader() {
    let headerStyle = {
      padding: '17px 24px',
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
          <Grid item xs={2} align='left' style={headerStyle}>
            <Typography variant="body1" style={textStyle}>
              Token
            </Typography>
          </Grid>
          <Grid item xs={6} align='left' style={headerStyle}>
            <Typography variant="body1" style={textStyle}>
              Address
            </Typography>
          </Grid>
          <Grid item xs={3} align='left' style={headerStyle}>
            <Typography variant="body1" style={textStyle}>
              Balance
            </Typography>
          </Grid>
          <Grid item xs={1} align='left' style={headerStyle}>
            <Typography variant="body1" style={textStyle}>
              Txs
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>)
  }

  renderAddress(address) {

    let bodyStyle = {
      padding: '12px 0px 12px 24px',
    }
    let textStyle = {
      color: '#2f3031',
      fontSize: '14px',
      fontWeight: '400'
    }
    if(this.props.theme.name==='dark') {
      textStyle = {
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: '400'
      }
    }
    let divStyle = {
      display: 'inline-block'
    }

    return(
      <Grid item xs={12} align='left'>
        <Card style={{marginTop:'16px', borderRadius: '3px'}}>
          <Grid container justify="center" alignItems="center" direction="row">
            <Grid item xs={2} align='left' style={bodyStyle}>
              <div style={divStyle}>
                <img
                  alt=""
                  src={ require('../assets/images/Bitcoin-logo.png') }
                  width="30px"
                  height="30px"
                  style={{marginRight: '12px'}}
                />
              </div>
              <div style={divStyle}>
                <Typography variant="body1" style={textStyle}>
                  Bitcoin
                </Typography>
                <Typography variant="subtitle2">
                  {address.isUsed?'used':'unused'}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={6} align='left' style={bodyStyle}>
              <Typography variant="body1" style={textStyle} id={address.address}>
                {address.address}
              </Typography>
            </Grid>
            <Grid item xs={3} align='left' style={bodyStyle}>
              <Typography variant="body1" style={textStyle}>
                {address.balance + ' BTC'}
              </Typography>
              <Typography variant="subtitle2">
                {'$' + (address.usdBalance?address.usdBalance:'0.00')}
              </Typography>
            </Grid>
            <Grid item xs={1} align='left' style={bodyStyle}>
              <Typography variant="body1" style={textStyle}>
                {address.txCount}
              </Typography>
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
            {this.renderAddresses()}
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

export default (ViewAddressModal);
