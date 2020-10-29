import React from "react";
import TokenTransactionsComponent from "../components/tokenTransactions";

const createReactClass = require("create-react-class");

let TokenTransactions = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      transactions: this.props.transactions,
      selectedAddress: "",
      selectedAddressError: false,
      selectedAddressErrorMessage: "",
      selectedContact: "",
      selectedContactError: false,
      selectedContactErrorMessage: "",
      fromDate: "",
      toDate: ""
    };
  },
  render() {
    return (
      <TokenTransactionsComponent
        handleChange={this.handleChange}
        loading={this.state.loading}
        error={this.state.error}
        accounts={this.props.accounts}
        transactions={this.props.transactions}
        selectedAddress={this.state.selectedAddress}
        selectedAddressError={this.state.selectedAddressError}
        selectedAddressErrorMessage={this.state.selectedAddressErrorMessage}
        contacts={this.props.contacts}
        selectedContact={this.state.selectedContact}
        selectedContactError={this.state.selectedContactError}
        selectedContactErrorMessage={this.state.selectedContactErrorMessage}
        fromDate={this.state.fromDate}
        toDate={this.state.toDate}
        selectContact={this.selectContact}
        selectAddress={this.selectAddress}
        theme={this.props.theme}
        size={this.props.size}
        token={this.props.token}
      />
    );
  },

  handleChange(event, name) {
    if (event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

  selectAddress(event) {
    this.setState({ selectedAddress: event.target.value });
  },

  selectContact(event) {
    this.setState({ selectedContact: event.target.value });
  }
});

export default TokenTransactions;
