import React, { Component } from 'react';
import { CssBaseline, Grid } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import curveTheme from './theme';

import TheAppBar from './containers/applicationBar.jsx';
import AppDrawer from './containers/drawer.jsx';

import Welcome from './containers/welcome.jsx';
import Accounts from './containers/accounts.jsx';
import Transact from './containers/transact';

import PageLoader from './components/pageLoader';

let accountEmitter = require("./store/accountStore.js").default.emitter;
let accountDispatcher = require("./store/accountStore.js").default.dispatcher;
let accountStore = require("./store/accountStore.js").default.store;

let ethEmitter = require("./store/ethStore.js").default.emitter;
let ethDispatcher = require("./store/ethStore.js").default.dispatcher;
let ethStore = require("./store/ethStore.js").default.store;

const setInitialTheme = () => {
  let themeString = localStorage.getItem("mw_theme");
  return themeString !== null ? themeString : "light";
};

class App extends Component {
  state = {
    drawerOpen: false,
    account: accountStore.getStore('account'),
    assets: ethStore.getStore('assets'),
    currentTheme: setInitialTheme(),
    theme: curveTheme[setInitialTheme()],
    transactOpen: false,
    transactCurrency: null,
    transactContact: null,
    transactAccount: null,
  };

  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.changeTheme = this.changeTheme.bind(this);

    this.setAccount = this.setAccount.bind(this);
    // this.logUserOut = this.logUserOut.bind(this);

    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.navClicked = this.navClicked.bind(this);


    const account = accountStore.getStore('account')

    if(!account) {
      accountDispatcher.dispatch({ type: 'connectWallet', content: {} })
    }
  }

  componentWillMount() {
    window.removeEventListener('resize', this.updateWindowDimensions);

    ethEmitter.removeAllListeners('Unauthorised');
    accountEmitter.removeAllListeners('Unauthorised');

    ethEmitter.removeListener('getBalancesReturned', this.getBalancesReturned)
    ethEmitter.on('getBalancesReturned', this.getBalancesReturned)

    accountEmitter.removeListener('connectWalletReturned', this.connectWalletReturned)
    accountEmitter.on('connectWalletReturned', this.connectWalletReturned)

    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);

    window.onhashchange = this.locationHashChanged;
    this.locationHashChanged();
  }

  connectWalletReturned = () => {
    this.setState({ account: accountStore.getStore('account') })
    this.getAllAssets()
  }

  getBalancesReturned = () => {
    this.setState({ assets: ethStore.getStore('assets') })
  }

  updateWindowDimensions() {
    var size = "xl";
    if (window.innerWidth < 600) {
      size = "xs";
    } else if (window.innerWidth < 960) {
      size = "sm";
    } else if (window.innerWidth < 1280) {
      size = "md";
    } else  if (window.innerWidth < 1920) {
      size = "lg";
    }

    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      size
    });
  }

  closeDrawer() {
    this.setState({ drawerOpen: false });
  }

  openDrawer() {
    this.setState({ drawerOpen: true });
  }

  navClicked(event, currentScreen) {
    this.setState({ drawerOpen: false });
    window.location.hash = currentScreen;
  }

  // logUserOut = () => {
  //   this.resetStores()
  //   window.location.hash = "welcome";
  // };

  resetStores() {
    ethStore.setStore({
      assets: null,
    })
  }

  setAccount(account) {
    this.setState({ account: account });
  }

  changeTheme() {
    let theme = this.state.currentTheme;

    this.setState({
      currentTheme: theme === "dark" ? "light" : "dark",
      theme: theme === "dark" ? curveTheme.light : curveTheme.dark
    });

    localStorage.setItem("mw_theme", theme === "dark" ? "light" : "dark");
  }

  locationHashChanged = () => {
    let currentScreen = window.location.hash;

    if (["", "#welcome", "#logOut"].includes(currentScreen)) {
      this.setState({
        drawerOpen: false,
        account: null
      });
    }

    if (this.state.account) {
      const path = currentScreen.split('/')[0];

      console.log(path)
      if (['#accounts', '#ethAccounts'].includes(path) ) {
        this.getAllAssets()
      }
    }

    this.setState({ currentScreen });
  }

  getAllAssets() {
    ethDispatcher.dispatch({
      type: 'getBalances',
      content: {}
    });
  }

  renderAppBar() {
    var menuClicked = null;
    if (this.state.account != null) {
      menuClicked = this.openDrawer;
    }

    return (
      <TheAppBar
        menuClicked={ menuClicked }
        account={ this.state.account }
        size={ this.state.size }
        title={ this.state.title }
        theme={ this.state.theme }
      />
    );
  }

  renderDrawer() {
    var drawer = null;
    if (this.state.account != null) {
      drawer = (
        <AppDrawer
          navClicked={ this.navClicked }
          currentScreen={ this.state.currentScreen }
          closeDrawer={ this.closeDrawer }
          account={ this.state.account }
          open={ this.state.drawerOpen }
          size={ this.state.size }
          theme={ this.state.theme }
        />
      );
    }
    return drawer;
  }

  renderTransact() {
    const { transactOpen, transactAsset, theme, account, assets } = this.state

    return <Transact
      account={ account }
      theme={ theme }
      isOpen={ transactOpen }
      transactClosed= { this.transactClosed }
      transactAsset={ transactAsset }
      assets={ assets }
    />
  }

  transactClicked = (asset) => {
    this.setState({ transactOpen: true, transactAsset: asset })
  }

  transactClosed = () => {
    this.setState({ transactOpen: false})
  }

  render() {
    let background = "#f9f7f9";
    let backgroundImage = null;
    if (this.state.currentTheme === "dark") {
      backgroundImage =
        "radial-gradient(farthest-corner at 20% 20%, #3d424b, 40%, #1a191d)";
    }

    const { currentScreen } = this.state;
    const path = currentScreen.split('/')[0];
    if(['#welcome', ''].includes(path)) {
      return (
        <MuiThemeProvider theme={ createMuiTheme(this.state.theme.mui) }>
          <CssBaseline />
          { this.renderScreen() }
        </MuiThemeProvider>
      )
    }


    return (
      <MuiThemeProvider theme={ createMuiTheme(this.state.theme.mui) }>
        <CssBaseline />
        <div
          style={ {
            minHeight: '100%',
            display: "flex",
            padding:
              this.state.size === "xs" || this.state.size === "sm"
                ? "0px"
                : this.state.theme.custom.page.padding,
            background: background,
            backgroundImage: backgroundImage
          } }
        >
          { this.renderDrawer() }
          <Grid
            container
            justify="space-around"
            alignItems="flex-start"
            direction="row"
            style={ {
              minHeight: "924px",
              position: "relative",
              width: ["xs", "sm"].includes(this.state.size) ? '100vw' : this.state.size === "md" ? 'calc(100vw - 325px)' : 'calc(100vw - 402px)',
              marginLeft: ["xs", "sm"].includes(this.state.size) ? "0px" : this.state.size === "md" ? "24px" : "100px",
              marginRight: ["xs", "sm"].includes(this.state.size) ? "0px" : '24px'
            } }
          >
            <Grid item xs={ 12 } style={ { flex: 1, height: "100%"  } }>
              { this.state.account == null ? null : this.renderAppBar() }
              <div style={ {
                  paddingLeft: ["xs", "sm"].includes(this.state.size) ? "24px" : "0px",
                  paddingRight: ["xs", "sm"].includes(this.state.size) ? "24px" : "0px"
                } }
              >
                { this.renderScreen() }
              </div>
            </Grid>
          </Grid>
        </div>
        { this.state.transactOpen && this.renderTransact() }
      </MuiThemeProvider>
    );
  }

  renderScreen() {
    const { ethAddresses, currentScreen } = this.state;
    const path = currentScreen.split('/')[0];
    const params = currentScreen.split('/')[1] || null;

    switch (path) {
      case "#welcome":
        return <Welcome setAccount={ this.setAccount } theme={ this.state.theme } />;
      case "#accounts":
        return ( <Accounts assets={ this.state.assets } theme={ this.state.theme } size={ this.state.size } account={ this.state.account } transactOpen={ this.state.transactOpen } transactClosed={ this.transactClosed } transactClicked={ this.transactClicked } transactCurrency={ this.state.transactCurrency }  /> )
      case "#logOut":
        return <Welcome setAccount={ this.setAccount } theme={ this.state.theme } />;
      default:
        return <Welcome setAccount={ this.setAccount } theme={ this.state.theme } />;
    }
  }
}

export default App;
