import React, { Component } from "react";
import {
  Grid,
  Typography,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment
} from "@material-ui/core";

class SetupPayment extends Component {

  render() {

    let {
      accountValue,

      assetValue,
      assetOptions,
      assetError,
      assetErrorMessage,

      typeValue,
      typeOptions,
      typeError,
      typeErrorMessage,

      publicValue,
      publicError,
      publicErrorMessage,

      amountValue,
      amountError,
      amountErrorMessage,

      gasValue,
      gasError,
      gasErrorMessage,

      onSelectChange,
      onChange,

      symbol,

      disabled,
    } = this.props

    return (
      <Grid container justify="space-around" alignItems="center" direction="row" style={{ width: '100%' }} >
        <Grid item xs={10} md={5} align="left" style={{ marginTop: '60px' }}>
          <Typography variant="body1" style={{
              fontSize: '12px',
              fontFamily: "Montserrat-SemiBold"
            }}>
            You are sending from your account
          </Typography>
          <Typography variant="body1" style={{ marginTop: '6px' }}>{ accountValue }</Typography>
        </Grid>
        <Grid item xs={10} md={5} align="left" style={{ marginTop: '60px' }}>
          { this.renderSelect("Select which asset you would like to send", assetValue, assetOptions, assetError, assetErrorMessage, onSelectChange, disabled, 'asset') }
        </Grid>
        <Grid item xs={10} md={5} align="left" style={{ marginTop: '60px' }} >
          <Typography variant="body1" style={{
              fontSize: '12px',
              fontFamily: "Montserrat-SemiBold"
            }}>
            You are sending to
          </Typography>
          <Typography variant="body1" style={{ marginTop: '6px' }} >a public account</Typography>
        </Grid>
        <Grid item xs={10} md={5} align="left" style={{ marginTop: '60px' }} >
          { this.renderInput("Enter Recipient Address", publicValue, publicError, publicErrorMessage, onChange, disabled, 'public') }
        </Grid>
        <Grid item xs={10} md={5} align="left" style={{ marginTop: '60px' }} >
          { this.renderInput("Send Amount", amountValue, amountError, amountErrorMessage, onChange, disabled, 'amount', symbol) }
        </Grid>
        <Grid item xs={10} md={5} align="left" style={{ marginTop: '60px' }}>
          { this.renderInput("Gas Limit", gasValue, gasError, gasErrorMessage, onChange, disabled, 'gas', 'WEI') }
        </Grid>
      </Grid>
    );
  }

  renderSelect(label, value, options, error, errorMessage, onChange, disabled, name, ignoreValue) {
    return (<FormControl error={error} fullWidth={true} >
      <Typography variant="body1" style={{
          fontSize: '12px',
          fontFamily: "Montserrat-SemiBold"
        }}>
        {label}
      </Typography>
      <Select name={name} value={value} onChange={onChange} disabled={disabled} renderValue={value => {
          let selected = null
          let val = ''
          selected = options && options.length > 0 && options.filter((option) => {
            return option.value === value
          })[0]
          if(selected) {
            val = selected.description + (selected.balance ? (' ('+selected.balance.toFixed(4)+' '+selected.symbol+')') : '')
          }

          return (
            <Typography variant="body1" noWrap>{ val }</Typography>
          );
        }}
      >
        {options
          ? options.filter((option) => {
              return option.value !== ignoreValue
            }).map(option => {
              return (
                <MenuItem key={option.value} value={option.value}>
                  <ListItemText primary={option.description + (option.balance ? (' ('+option.balance.toFixed(4)+' '+option.symbol+')') : '')} />
                </MenuItem>
              );
            })
          : ""}
      </Select>
      {error === true ? (
        <FormHelperText>{errorMessage}</FormHelperText>
      ) : null}
    </FormControl>)
  }

  renderInput(label, value, error, errorMessage, onChange, disabled, name, inputAdornment) {
    return (<FormControl error={error} fullWidth={true} >
      <Typography variant="body1" style={{
          fontSize: '12px',
          fontFamily: "Montserrat-SemiBold"
        }}>
        {label}
      </Typography>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        endAdornment={<InputAdornment position="end">{inputAdornment ? inputAdornment : ''}</InputAdornment>}
      />
      {error === true ? (
        <FormHelperText>{errorMessage}</FormHelperText>
      ) : null}
    </FormControl>)
  }
}

export default SetupPayment;
