import React from "react";
import createReactClass from "create-react-class";
import AccountsComponent from "../components/accounts";
import TokenAccounts from '../components/tokenAccounts';

let ethEmitter = require("../store/ethStore.js").default.emitter;
let ethDispatcher = require("../store/ethStore.js").default.dispatcher;
let ethStore = require("../store/ethStore.js").default.store;

let Accounts = createReactClass({

  getInitialState() {

    return {
      error: null,
      ethLoading: false,
      cardLoading: false,
      viewMode: 'Grid'
    };
  },

  render() {
    return this.renderAssets()
  },

  renderAssets() {
    let {
      theme,
      transactClicked,
      transactClosed,
      transactOpen,
      assets
    } = this.props

    let {
      error,
      ethLoading,
      viewMode,
    } = this.state

    return (
      <AccountsComponent
        error={ error }
        theme={ theme }
        assets={ assets }
        loading={ ethLoading }
        transactClicked= { transactClicked }
        transactOpen={ transactOpen }
        transactClosed={ transactClosed }
        toggleViewClicked={ this.toggleViewClicked }
        viewMode={ viewMode }
      />
    );
  },

  componentWillMount() {
    ethEmitter.removeListener('error', this.showError);
    ethEmitter.on("error", this.showError);
  },

  showError(error) {
    this.setState({ error: error.toString() })
  },

  toggleViewClicked() {
    this.setState({ viewMode: this.state.viewMode === 'Grid' ? 'List' : 'Grid'})
  },

});

export default Accounts;
