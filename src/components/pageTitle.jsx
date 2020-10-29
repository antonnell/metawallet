import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

class PageTItle extends Component {
  render() {
    let { theme, root, screen } = this.props

    if(!theme) {
      return null
    }

    return (
      <div style={theme.custom.pageTitle}>
        <Typography variant="h6">
          {root && (<span style={theme.custom.pageTitleRoot} onClick={() => { this.changeLocation(root.location) }} >{root.display} </span>) }
          {root && ' > '}
          {screen.display}
        </Typography>
      </div>
    );
  }

  changeLocation(hash) {
    window.location.hash = hash
  }
}

export default PageTItle;
