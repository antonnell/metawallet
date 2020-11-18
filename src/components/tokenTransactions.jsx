import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import { colors } from '../theme.js';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  if (!array) {
    return [];
  }
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

function filtering(array, props) {
  if (!array) {
    return [];
  }

  return array.filter(a => {
    if (
      props.selectedAddress &&
      a.fromDisplayName !== props.selectedAddress &&
      a.toDisplayName !== props.selectedAddress
    ) {
      return false;
    }
    if (
      props.selectedContact &&
      a.fromDisplayName !== props.selectedContact &&
      a.toDisplayName !== props.selectedContact
    ) {
      return false;
    }
    if (
      props.fromDate &&
      moment(a.timestamp).format("YYYY-MM-DD") < props.fromDate
    ) {
      return false;
    }
    return !(
      props.toDate && moment(a.timestamp).format("YYYY-MM-DD") > props.toDate
    );
  });
}

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, size } = this.props;
    let rows = [
      {
        id: "timestamp",
        disablePadding: false,
        label: "Date"
      },
      {
        id: "transactionId",
        disablePadding: false,
        label: "Transaction"
      },
      {
        id: "value",
        disablePadding: false,
        label: "Amount"
      }
    ];

    if(!['xl', 'lg'].includes(size)) {
      rows = [
        {
          id: "timestamp",
          disablePadding: false,
          label: "Date"
        },
        {
          id: "value",
          disablePadding: false,
          label: "Amount"
        }
      ];
    }
    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}

              >
                <Tooltip
                  title="Sort"
                  placement={"bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  },
  filters: {}
});

let EnhancedFilterBar = props => {
  const {
    accounts,
    selectedAddress,
    selectedAddressError,
    selectedAddressErrorMessage,
    selectAddress,
    contacts,
    selectedContact,
    selectedContactError,
    selectedContactErrorMessage,
    selectContact,
    loading,
    fromDate,
    toDate,
    handleChange,
    visible
  } = props;

  return (
    <Grid
      container
      justify="flex-start"
      alignItems="flex-start"
      direction="row"
      spacing={24}
      style={{ padding: "0px 24px", display: visible ? "flex" : "none" }}
    >
      <Grid item xs={12} sm={6} md={4} lg={3} align="left">
        <FormControl
          error={selectedAddressError}
          fullWidth={true}
          style={{ paddingBottom: "13px", paddingTop: "12px" }}
        >
          <InputLabel shrink={true}>Address</InputLabel>
          <Select
            fullWidth={true}
            value={selectedAddress}
            onChange={selectAddress}
            disabled={loading}
            renderValue={value => {
              return (
                <Typography variant="body1" noWrap>
                  {value}
                </Typography>
              );
            }}
          >
            <MenuItem key="a" value="">
              <ListItemText
                primary={"--"}
              />
            </MenuItem>
            {accounts
              ? accounts.map(address => {
                  return (
                    <MenuItem key={address.name} value={address.name}>
                      <ListItemText
                        primary={address.name}
                      />
                    </MenuItem>
                  );
                })
              : ""}
          </Select>
          {selectedAddressError === true ? (
            <FormHelperText>{selectedAddressErrorMessage}</FormHelperText>
          ) : null}
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} align="left">
        <FormControl
          error={selectedContactError}
          fullWidth={true}
          style={{ paddingBottom: "13px", paddingTop: "12px" }}
        >
          <InputLabel shrink={true}>Contact</InputLabel>
          <Select
            fullWidth={true}
            value={selectedContact}
            onChange={selectContact}
            disabled={loading}
            renderValue={value => {
              return (
                <Typography variant="body1" noWrap>
                  {value}
                </Typography>
              );
            }}
          >
            <MenuItem key="b" value="">
              <ListItemText
                primary={"--"}
              />
            </MenuItem>
            {contacts
              ? contacts.map(contact => {
                  return (
                    <MenuItem
                      key={contact.displayName}
                      value={contact.displayName}
                    >
                      <ListItemText
                        primary={contact.displayName}
                      />
                    </MenuItem>
                  );
                })
              : ""}
          </Select>
          {selectedContactError === true ? (
            <FormHelperText>{selectedContactErrorMessage}</FormHelperText>
          ) : null}
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} align="left">
        <TextField
          fullWidth={true}
          id="date"
          label="From Date"
          type="date"
          InputLabelProps={{
            shrink: true
          }}
          value={fromDate}
          margin="normal"
          onChange={event => {
            handleChange(event, "fromDate");
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} align="left">
        <TextField
          fullWidth={true}
          id="date"
          label="To Date"
          type="date"
          InputLabelProps={{
            shrink: true
          }}
          value={toDate}
          margin="normal"
          onChange={event => {
            handleChange(event, "toDate");
          }}
        />
      </Grid>
    </Grid>
  );
};

let EnhancedTableToolbar = props => {
  const { classes, toggleFilters, theme } = props;

  return (
    <Toolbar>
      <div style={theme.custom.sectionTitle} className={classes.title}>
        <Typography variant='h2' align='left'>Recent Transactions</Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title="Filter list">
          <IconButton aria-label="Filter list" onClick={toggleFilters}>
            <FilterListIcon style={theme.custom.icon} />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = () => ({});

class EnhancedTable extends React.Component {
  state = {
    order: "desc",
    orderBy: "timestamp",
    selected: [],
    data: this.props.transactions,
    page: 0,
    rowsPerPage: 5,
    filtersVisible: false
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleToggleFilters = () => {
    this.setState({ filtersVisible: !this.state.filtersVisible });
  };

  render() {
    const { classes, theme, size, token } = this.props;
    const {
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      filtersVisible
    } = this.state;
    const data = this.props.transactions;

    let divStyle = {
      display: 'inline-block',
      minWidth: '42px'
    }

    return (
      <div className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          toggleFilters={this.handleToggleFilters}
          theme={theme}
        />
        <EnhancedFilterBar
          selectedAddress={this.props.selectedAddress}
          selectedContact={this.props.selectedContact}
          selectContact={this.props.selectContact}
          selectAddress={this.props.selectAddress}
          accounts={this.props.accounts}
          contacts={this.props.contacts}
          fromDate={this.props.fromDate}
          toDate={this.props.toDate}
          handleChange={this.props.handleChange}
          visible={filtersVisible}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data ? data.length : 0}
              theme={theme}
              size={size}
            />
            <TableBody>
              {stableSort(
                filtering(data, this.props),
                getSorting(order, orderBy)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {

                  let url = 'https://etherscan.io/tx/' + n.transactionId

                  return (
                    <TableRow hover tabIndex={-1} key={n.transactionId}>
                      <TableCell>
                        <div style={divStyle}>
                          <img
                            alt=""
                            src={ require('../assets/images/'+token+'-logo.png') }
                            height="30px"
                            style={{marginRight: '12px'}}
                          />
                        </div>
                        <div style={divStyle}>
                          <Typography variant="body1" style={{ color: n.status==='Success'?colors.green:n.status==='Pending'?colors.orange:colors.red, fontFamily: 'Montserrat-SemiBold' }}>
                            {n.status}
                          </Typography>
                          <Typography variant="subtitle2">
                            {moment(n.timestamp).format("YYYY/MM/DD hh:mm")}
                          </Typography>
                        </div>
                      </TableCell>
                      {['xl', 'lg'].includes(size) && (<TableCell>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{textDecoration: 'none'}}
                        >
                          <Typography variant="body1" noWrap style={{ maxWidth: size==='lg'?'530px':'auto' }}>
                            {n.transactionId}
                          </Typography>
                        </a>
                      </TableCell>)}
                      <TableCell>
                        <Typography variant="body1">{n.value + " " +n.currency}</Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data ? data.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);
