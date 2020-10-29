import React, { Component } from "react";
import {
  Grid,
  Typography
} from '@material-ui/core';

class ConfirmPayment extends Component {

  renderBeneficiary() {
    let {
      contactOptions,
      contactValue
    } = this.props

    return (<Grid item xs={10} align='left' style={{ marginTop: '60px' }}>
      <Typography variant='body1' style={{ fontSize: '11px' }}>
        To
      </Typography>
      <Typography variant="h5" noWrap style={{ fontSize:  '20px', marginTop: '4px' }}>
        { contactOptions.filter((option) => {
          return contactValue === option.value
        })[0].description }
      </Typography>
    </Grid>)
  };

  renderPublic() {
    let {
      publicValue
    } = this.props
    return (<Grid item xs={10} align='left' style={{ marginTop: '60px' }}>
      <Typography variant='body1' style={{ fontSize: '11px' }}>
        To
      </Typography>
      <Typography variant="h5" noWrap style={{ fontSize:  '20px', marginTop: '4px' }}>
        { publicValue }
      </Typography>
    </Grid>)
  };

  renderOwnAccount() {
    let {
      ownOptions,
      ownValue
    } = this.props
    return (<Grid item xs={10} align='left' style={{ marginTop: '60px' }}>
      <Typography variant='body1' style={{ fontSize: '11px' }}>
        To
      </Typography>
      <Typography variant="h5" noWrap style={{ fontSize:  '20px', marginTop: '4px' }}>
        { ownOptions.filter((option) => {
          return ownValue === option.value
        })[0].description }
      </Typography>
    </Grid>)
  };

  render() {

    let {
      amountValue,
      accountOptions,
      accountValue,
      typeValue,
      tokenValue
    } = this.props

    return (
        <Grid container justify="center" alignItems="flex-start" direction="row">
          <Grid item xs={10} align='left'>
            <Typography variant='body1' style={{ fontSize: '11px' }}>
              You're sending
            </Typography>
            <Typography variant="h5" noWrap style={{ fontSize:  '20px', marginTop: '4px' }}>
              { amountValue + " " + tokenValue }
            </Typography>
          </Grid>
          <Grid item xs={10} align='left' style={{ marginTop: '60px' }}>
            <Typography variant='body1' style={{ fontSize: '11px' }}>
              From
            </Typography>
            <Typography variant="h5" noWrap style={{ fontSize:  '20px', marginTop: '4px' }}>
              { accountOptions.filter((option) => {
                return accountValue === option.value
              })[0].description }
            </Typography>
          </Grid>
          { typeValue==='contact' && this.renderBeneficiary() }
          { typeValue==='own' && this.renderOwnAccount() }
          { typeValue==='public' && this.renderPublic() }
        </Grid>
    );
  };
}

export default (ConfirmPayment);
