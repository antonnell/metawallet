import React from "react";
import createReactClass from "create-react-class";
import AccountComponent from "../components/account";

let Account = createReactClass({
  getInitialState() {
    return {

    };
  },
  render() {
    return (
      <AccountComponent
        theme={ this.props.theme }
        asset={ this.props.asset }
        transactClicked={ this.props.transactClicked }
        viewMode={ this.props.viewMode }
      />
    );
  },
});

export default Account;
