import React, { Component } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  SvgIcon,
  IconButton,
  Popover,
  ListItem,
  List,
  ListItemText,
  Divider
} from "@material-ui/core";
import PageTitle from "./pageTitle";
import PageLoader from "./pageLoader";
import SectionLoader from "./sectionLoader";
import TokenTransactions from "../containers/tokenTransactions";
import Snackbar from './snackbar';

function MoreIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        fill={props.theme.custom.icon.color}
        d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"
      />
    </SvgIcon>
  );
}

class TokenAccounts extends Component {
  renderAddresses() {
    let {
      accounts,
      theme,
      token,
      optionsAccount,
      loadingAccount,
      editAccount,
      exportKeyAccount,
      cardLoading,
      transactClicked,
      optionsClicked,
      optionsClosed,
      editNameClicked,
      editAddressName,
      editAddressNameError,
      editAddressNameErrorMessage,
      updatePrimaryClicked,
      exportKeyClicked,
      handleChange,
      onEditAddressNameKeyDown,
      handleViewTokens,
      viewBitcoinKeysClicked,
      stakeableCurrencies,
      stakeClicked
    } = this.props

    if (!accounts) {
      return (
        <Grid
          item
          xs={12}
          xl={12}
          align="left"
          style={{ minHeight: "190px", position: "relative" }}
        >
          <PageLoader />
        </Grid>
      );
    }

    if (accounts.length === 0) {
      return (
        <Grid
          item
          xs={12}
          xl={12}
          align="center"
          style={{ minHeight: "190px", paddingTop: "100px" }}
        >
          <Typography variant="h2">
            Oh no, we couldn't find any accounts for you. Why don't you
            create/import one?
          </Typography>
        </Grid>
      );
    }

    return accounts.map(account => {
      if(!account.address) {
        account.address = account.publicAddress
      }
      if(!account.name) {
        account.name = account.displayName
      }
      account.type = token
      account.editing = false;
      let open = false;
      let anchorEl = null;
      let loading = <div />;

      if (optionsAccount != null) {
        if ((optionsAccount.address && account.address === optionsAccount.address) || (optionsAccount.id && account.id === optionsAccount.id)) {
          open = true;
          anchorEl = optionsAccount.anchorEl;
        }
      }

      if (loadingAccount != null) {
        if ((loadingAccount.address && account.address === loadingAccount.address) || (loadingAccount.id && account.id === loadingAccount.id)) {
          loading = (
            <SectionLoader />
          );
        }
      }

      if (editAccount != null) {
        if ((editAccount.address && account.address === editAccount.address) || (editAccount.id && account.id === editAccount.id)) {
          account.editing = true;
          if (cardLoading) {
            loading = (
              <SectionLoader />
            );
          }
        }
      }

      if (exportKeyAccount != null) {
        if ((account.address && account.address === exportKeyAccount) || (account.id && account.id === exportKeyAccount)) {
          if (cardLoading) {
            loading = (
              <SectionLoader />
            );
          }
        }
      }

      let stakeable = stakeableCurrencies ? stakeableCurrencies.filter((currency) => {
        return currency.currency === account.symbol
      }) : []

      let stakeableBoolean = stakeable.length > 0

      return (
        <Grid item xs={12} lg={6} xl={4} key={account.address != null ? account.address : account.id} style={{ padding: '24px' }}>
          <Card>
            <CardContent style={{ position: "relative" }}>
              <Grid
                container
                alignItems="flex-start"
                direction="row"
                style= { { marginBottom: '6px' }}
              >
                <Grid item xs={11} align="left">
                  {account.editing !== true && (
                    <Typography
                      noWrap
                      variant="h3"
                      style={{ maxWidth: 'calc(100% - 70px)' }}
                    >
                      {account.name}
                    </Typography>
                  )}
                  {account.editing !== true && account.isPrimary === true && (
                    <Typography variant='body1' style={theme.custom.primaryText}>Primary</Typography>
                  )}
                  {account.editing !== true && account.delegatable === true && (
                    <Typography variant='body1' style={theme.custom.primaryText}>Staking</Typography>
                  )}
                  {account.editing === true && (
                    <TextField
                      autoFocus={true}
                      style={{
                        display: "inline-block",
                        marginTop: "0px",
                        marginBottom: "5px"
                      }}
                      fullWidth={true}
                      required
                      color="textSecondary"
                      error={ editAddressNameError }
                      disabled={ cardLoading }
                      id="editAddressName"
                      value={ editAddressName }
                      name="editAddressName"
                      onChange={ handleChange }
                      margin="normal"
                      onKeyDown={event => {
                        onEditAddressNameKeyDown(event, account);
                      }}
                      helperText={editAddressNameErrorMessage}
                    />
                  )}
                  <Typography
                    noWrap
                    variant="subtitle1"
                    color="textSecondary"
                  >
                    {account.address}
                  </Typography>
                </Grid>
                <Grid item xs={1} align="right">
                  <IconButton
                    style={{
                      verticalAlign: "top",
                      marginRight: "-20px",
                      marginTop: "-11px"
                    }}
                    color="primary"
                    aria-label="More"
                    buttonRef={node => {
                      this.anchorEl = node;
                    }}
                    onClick={e => {
                      optionsClicked(e, account);
                    }}
                    disabled={ cardLoading }
                  >
                    <MoreIcon theme={theme} />
                  </IconButton>
                  <Popover
                    open={open}
                    anchorEl={anchorEl}
                    anchorPosition={{ top: 200, left: 400 }}
                    onClose={optionsClosed}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left"
                    }}
                  >
                    <List component="nav">
                      {
                        ["Ethereum", "Wanchain", "ERC20", "WRC20", "Binance", "BEP2"].includes(token) && (<ListItem
                          button
                          disabled={ !(account.tokens && account.tokens.length > 0) }
                          onClick={( ) => {
                            handleViewTokens(account)
                          } }
                        >
                          <ListItemText primary="View Tokens" />
                        </ListItem>)
                      }
                    </List>
                  </Popover>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="flex-end"
                direction="row"
              >
                <Grid item xs={6}  align="left" style={{ marginTop: "6px" }}>
                  <Typography variant="h4" noWrap>
                    {account.balance + " " + token}
                  </Typography>
                  <Typography variant="h4" noWrap>
                    {"$" + (account.usdBalance ? account.usdBalance.toFixed(2) : '0.00')}
                  </Typography>
                </Grid>
                <Grid item xs={6} align="right" style={{ height: "42px" }}>
                  { stakeableBoolean && <Button size="small" variant="contained" color="secondary" onClick={() => { stakeClicked(account) }}>
                    Stake
                  </Button>}
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    disabled={ cardLoading }
                    onClick={() => { transactClicked({
                      address: account.address,
                      name: token,
                      symbol: token,
                      type: token
                    }, null, account) }}
                  >
                    Transact
                  </Button>
                </Grid>
              </Grid>
              {loading}
            </CardContent>
          </Card>
        </Grid>
      );
    });
  }

  render() {

    let {
      accounts,
      theme,
      handleCreateOpen,
      handleImportOpen,
      token,
      transactions,
      loading,
      error,
      keyOpen,
      handleKeyClose,
      currentAccountKey,
      currentAccountPhrase,
      copyKey,
      copyPhrase,
      viewTokensAccount
    } = this.props

    if (accounts === null) {
      return (
        <Grid container justify="center" alignItems="flex-start" direction="row">
          <Grid
            item
            xs={12}
            align="left"
          >
            <PageTitle theme={theme} root={{display: 'Accounts', location: 'accounts'}} screen={{display: token, location: token}} />
          </Grid>
          <Grid
            item
            xs={12}
            xl={12}
            align="left"
            style={{ minHeight: "190px", position: "relative" }}
          >
            <PageLoader />
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid container justify="center" alignItems="flex-start" direction="row">
        <Grid
          item
          xs={12}
          align="left"
        >
          <PageTitle theme={theme} root={{display: 'Accounts', location: 'accounts'}} screen={{display: token, location: token}} />
        </Grid>
        <Grid item xs={12} align="center">
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="row"
            spacing={0}
            style={theme.custom.sectionTitle}
          >
            <Grid item xs={6} align='left'>
              <Typography variant='h2' align='left' style={{ lineHeight: '37px' }}>Accounts</Typography>
            </Grid>
            <Grid item xs={6} align='right'>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => { handleCreateOpen(token) }}
              >
                Create
              </Button>
              <Button
                style={{ marginLeft: "12px" }}
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => { handleImportOpen(token) }}
              >
                Import
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="row"
            style={theme.custom.accountsContainer}
          >
            {this.renderAddresses()}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TokenTransactions
            theme={this.props.theme}
            accounts={this.props.accounts}
            transactions={transactions}
            contacts={this.props.contacts}
            size={this.props.size}
            token={ this.props.token }
          />
        </Grid>
        { loading && this.renderLoader() }
        { error && <Snackbar open={true} type={'Error'} message={error} /> }
      </Grid>
    );
  }

  renderLoader() {
    return <PageLoader />
  }
}

export default TokenAccounts;
