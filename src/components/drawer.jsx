import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import { Grid } from '@material-ui/core';
import {version} from "../version";
import ScrollArea  from 'react-scrollbar';

class AppDrawer extends Component {
  componentDidMount() {
    if (!this.props.account) {
      window.location.hash = 'welcome';
    }
  }

  render() {
    let { account, size, open,  closeDrawer, theme } = this.props

    if (account == null) {
      return null;
    }

    return size === 'xs' || size === 'sm' ? (
      <Drawer
        open={ open }
        onClose={ closeDrawer }
      >
        <ScrollArea horizontal={false} style={{ height: '100%' }} >
          { this.renderGridList() }
        </ScrollArea>
      </Drawer>
    ) : (
      <div style={ theme.custom.drawerContainer }>
        { this.renderGridList() }
      </div>
    );
  }

  renderTop() {
    let { theme, account } = this.props

    let address = null;
    if (account.address) {
      address = account.address.substring(0,6)+'...'+account.address.substring(account.address.length-4,account.address.length)
    }

    if (theme.name === 'dark') {
      return (<Card style={ { padding: '24px', marginBottom: '8px' } }>
        <Grid container justify="center" alignItems="center" style={ { paddingTop: 24 } } direction="column">
          <Typography variant="h1" style={ { padding: 12, border: '1px solid #1e849e', borderRadius: 5, fontSize: 14, width: '100%', textAlign: 'center' } }>{ address }</Typography>
        </Grid>
      </Card>)
    } else {
      return (
        <div style={ { padding: '24px', marginBottom: '8px' } }>
          <Grid container justify="center" alignItems="center" style={ { paddingTop: 24 } } direction="column">
            <Typography variant="h1" style={ { padding: 12, border: '1px solid #1e849e', borderRadius: 5, fontSize: 14, width: '100%', textAlign: 'center' } }>{ address }</Typography>
          </Grid>
        </div>
      )
    }
  }

  renderBottom() {
    if (this.props.theme.name === 'dark') {
      return <Card>{ this.renderList() }</Card>;
    } else {
      return this.renderList();
    }
  }

  renderList() {
    let { currentScreen, navClicked, theme, logUserOut } = this.props
    const path = currentScreen.split('/')[0];

    return (
      <List style={ { height: "calc(100% - 173px)" } }>
        <ListSubheader disableSticky={ true }>MENU</ListSubheader>
        <ListItem
          selected={ ['#accounts', '#ethAccounts'].includes(path) }
          button
          onClick={ event => {
            navClicked(event, 'accounts');
          } }
        >
          <ListItemText primary="Accounts" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={ event => {
            logUserOut();
          } }
          style={theme.custom.logout}
        >
          <ListItemText primary="Log Out" style={theme.custom.logoutText} />
        </ListItem>
        <Typography
          variant="body1"
          align="justify"
          style={{
            marginTop: '24px',
            color: "#fff",
            fontSize: '14px'
          }}
        >
          V{version}-beta
        </Typography>
      </List>
    );
  }

  renderGridList() {
    return (
      <div style={ this.props.theme.custom.drawer }>
        { this.renderTop() }
        { this.renderBottom() }
      </div>
    );
  }
}

export default AppDrawer;
