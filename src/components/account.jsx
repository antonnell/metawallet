import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActionArea,
} from "@material-ui/core";

class Account extends Component {
  render() {
    if(this.props.viewMode === 'List') {
      return this.renderList()
    } else {
      return this.renderGrid()
    }
  }

  renderList() {
    let { asset, transactClicked } = this.props

    let logo = asset.logo

    let bodyStyle = {
      padding: '12px 12px 12px 24px',
    }
    let textStyle = {
      color: '#2f3031',
      fontSize: '14px',
      fontWeight: '400'
    }
    let iconStyle = {
      display: 'inline-block',
      verticalAlign: 'middle',
      minWidth: '42px'
    }
    let nameStyle = {
      display: 'inline-block',
      verticalAlign: 'middle',
      width: 'calc( 100% - 42px)'
    }


    return(
      <Grid item xs={12} align='left'>
        <Card style={{marginTop:'16px', borderRadius: '3px', cursor: 'pointer'}}>
          <Grid container justify="center" alignItems="center" direction="row">
            <Grid item xs={6} align='left' style={bodyStyle}>
              <div style={iconStyle}>
                <img
                  alt=""
                  src={ require('../assets/tokens/'+logo) }
                  height="30px"
                  style={{marginRight: '12px'}}
                />
              </div>
              <div style={nameStyle}>
                <Typography variant="h3" noWrap style={{ width: '100%' }}>
                  {asset.name}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={2} align='right' style={bodyStyle}>
              <Typography variant="body1" noWrap style={textStyle}>
                { (asset.balance ? asset.balance.toFixed(4) : '0.00') + ' ' + asset.symbol}
              </Typography>
              <Typography variant="subtitle2" noWrap>
                { "$" + (asset.usdBalance ? asset.usdBalance.toFixed(2) : '0.00') }
              </Typography>
            </Grid>
            <Grid item xs={4} align='right' style={bodyStyle}>
              <Button size="small" variant="outlined" color="primary" style={{ marginLeft: '12px' }} onClick={() => { transactClicked(asset) }}>
                Transact
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    )
  }

  renderGrid() {
    let { asset, transactClicked } = this.props

    let logo = asset.logo

    return (

      <Card>
        <CardActionArea>
          <CardContent style={{ position: "relative" }}>
            <div style={ {
              width: '150px',
              height: '150px',
              position: 'relative',
              backgroundImage: 'url("' + require('../assets/tokens/'+logo) + '")',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              margin: '50px auto'
             } }>
            </div>
            <div style={{ margin: '0 auto'}}>
              <Grid container >
                <Grid item xs={4} align='left'>
                  <Typography variant="h4" noWrap style={{ lineHeight: '39px' }}>
                    Balance
                  </Typography>
                </Grid>
                <Grid item xs={8} align='right'>
                  <Typography variant="h4" noWrap style={{fontSize: '20px'}}>
                    { (asset.balance ? asset.balance.toFixed(4) : '0.00') + ' ' + asset.symbol }
                  </Typography>
                  <Typography variant="h4" noWrap style={{color: '#888'}}>
                    { "$" + (asset.usdBalance ? asset.usdBalance.toFixed(2) : '0.00') }
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </CardActionArea>
        <CardContent style={{ position: "relative" }}>
          <Grid container style={{marginTop: '12px'}}>
            <Grid item xs={12} align='right'>
              <Button size="small" variant="contained"  color="primary" onClick={() => { transactClicked(asset) }}>
                Transact
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default Account;
