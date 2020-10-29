import React from "react";
import SetupPayment from "../components/setupPayment";
import ConfirmPayment from "../components/confirmPayment";
import CompletePayment from "../components/completePayment";
import ReceivePayment from "../components/receivePayment";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Grid,
  Slide,
  Dialog,
  Tab,
  Tabs,
  Button
} from "@material-ui/core";
import SectionLoader from '../components/sectionLoader';

const createReactClass = require("create-react-class");
var QRCode = require("qrcode");

let ethEmitter = require("../store/ethStore.js").default.emitter;
let ethDispatcher = require("../store/ethStore.js").default.dispatcher;
let ethStore = require("../store/ethStore.js").default.store;

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

let Transact = createReactClass({
  getInitialState() {

    let accountValue = this.props.account.address

    return {
      ethLoading: false,

      loading: false,
      error: null,

      tabValue: 0,
      currentScreen: "setup",
      steps: [
        "Set Up Payment",
        "Confirm Details",
        "Results"
      ],
      activeStep: 0,
      completed: {},

      accountValue: accountValue,
      assets: this.props.assets,
      assetValue: (this.props.transactAsset && this.props.transactAsset.value) ? this.props.transactAsset.value : null,
      symbol: this.props.transactAsset && this.props.transactAsset.symbol,
      typeOptions: [
        {  value: 'public', description: 'Public Address' },
      ],
      typeValue: 'public',
      publicValue: '',
      amountValue: '',
      gasValue: '200',
    };
  },

  componentWillMount() {
    ethEmitter.removeAllListeners('sendReturned')

    ethEmitter.on('sendReturned', this.sendReturned)
  },

  renderScreen() {
    let { theme, assets, account } = this.props
    let {
      loading,
      ethLoading,
      accountValue,
      assetValue,
      assetError,
      assetErrorMessage,
      typeValue,
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
      typeOptions,
      symbol
    } = this.state

    switch (this.state.currentScreen) {
      case "receive":
        return (
          <ReceivePayment
            theme={ theme }
            loading={ ethLoading }

            accountValue={ accountValue }
            assetValue={ assetValue }
            assetOptions={ assets }

            onSelectChange={ this.onSelectChange }
          />
        )
      case "setup":
        return (
          <SetupPayment
            theme={ theme }
            loading={ ethLoading }

            accountValue={ accountValue }
            assetValue={ assetValue }
            assetError={ assetError }
            assetErrorMessage={ assetErrorMessage }
            assetOptions={ assets }
            typeOptions={ typeOptions }
            typeValue={ typeValue }
            typeError={ typeError }
            typeErrorMessage={ typeErrorMessage }
            publicValue={ publicValue }
            publicError={ publicError }
            publicErrorMessage={ publicErrorMessage }
            amountValue={ amountValue }
            amountError={ amountError }
            amountErrorMessage={ amountErrorMessage }
            gasValue={ gasValue }
            gasError={ gasError }
            gasErrorMessage={ gasErrorMessage }

            symbol={ symbol }

            onSelectChange={ this.onSelectChange }
            onChange={ this.onChange }
          />
        );
      case "confirm":
        return (
          <ConfirmPayment
            loading={ loading }
            assetValue={ assetValue }
            amountValue={ amountValue }
            accountValue={ accountValue }
            typeValue={ typeValue }
            publicValue={ publicValue }
          />
        );
      case "results":
        return (
          <CompletePayment
            theme={ theme }
            error={ this.state.error }
            transactionID={ this.state.transactionID }
            chain={ this.state.chain }
          />
        );
      default:
        return (
          <SetupPayment
            theme={ theme }
            loading={ ethLoading }

            accountValue={ accountValue }
            assets={ assets }
            assetValue={ assetValue }
            assetError={ assetError }
            assetErrorMessage={ assetErrorMessage }
            assetOptions={ assets }
            typeOptions={ typeOptions }
            typeValue={ typeValue }
            typeError={ typeError }
            typeErrorMessage={ typeErrorMessage }
            publicValue={ publicValue }
            publicError={ publicError }
            publicErrorMessage={ publicErrorMessage }
            amountValue={ amountValue }
            amountError={ amountError }
            amountErrorMessage={ amountErrorMessage }
            gasValue={ gasValue }
            gasError={ gasError }
            gasErrorMessage={ gasErrorMessage }

            symbol={ symbol }

            onSelectChange={ this.onSelectChange }
            onChange={ this.onChange }
          />
        );
    }
  },

  renderStepper() {
    return (
      <Stepper
        orientation="vertical"
        steps={this.state.steps.length}
        activeStep={this.state.activeStep}
        style={{ background: "inherit", padding: "0px" }}
      >
        {this.state.steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel completed={this.state.completed[index]}>
                {label}
              </StepLabel>
              <StepContent>{}</StepContent>
            </Step>
          );
        })}
      </Stepper>
    );
  },

  renderGraphic() {
    return <img alt='Receive' src={require('../assets/images/Receive-Illustration.svg')} width='100%' height='100%' />
  },

  renderLeft() {
    switch(this.state.currentScreen) {
      case "receive":
        return this.renderGraphic()
      case "setup":
      case "confirm":
      case "results":
        return this.renderStepper()
      default:
        break;
    }
  },

  renderTabs() {
    return (
      <Tabs
        value={this.state.tabValue}
        onChange={this.handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Send" />
        <Tab label="Receive" />
      </Tabs>
    )
  },

  renderAction() {
    switch(this.state.currentScreen) {
      case "receive":
        return null
      case "setup":
        return (
          <Button
            variant="contained"
            color="secondary"
            onClick={ this.onContinue }
            size="large"
          >
            Continue
          </Button>
        )
      case "confirm":
        return (
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={ this.onBack }
              size="large"
              style={{ marginRight: '20px' }}
              disabled={ this.state.loading }
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={ this.onContinue }
              size="large"
              disabled={ this.state.loading }
            >
              Continue
            </Button>
          </div>
        )
      case "results":
        return (
          <Button
            variant="text"
            color="primary"
            onClick={ this.onContinue }
            size="large"
          >
            Send another payment
          </Button>
        )
      default:
        break;
    }
  },

  render() {
    let { loading } = this.state
    return (
      <Dialog open={this.props.isOpen} onClose={this.props.transactClosed} fullWidth={true} maxWidth={'lg'} TransitionComponent={Transition} >
        {loading?<SectionLoader />:''}
        <Grid container style={{ overflowY: 'hidden' }}>
          <Grid item xs={5} sm={4} md={3}>
            <Grid container directtion='column' justify='space-around' style={{ alignContent: 'center', height: '100%', background:'#2B323C', minHeight: '625px' }}>
              <Grid item>
                { this.renderLeft() }
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={7} sm={8} md={9}>
            <Grid container direction='column' justify='space-between' alignItems="flex-start" style={{ height: 'auto' }}>
              <Grid item style={{ width: '100%' }}>
                { this.renderTabs() }
              </Grid>
              <Grid item style={{ width: '100%' }}>
                { this.renderScreen() }
              </Grid>
              <Grid item align="right" style={{ width: '100%', padding: '24px' }}>
                { this.renderAction() }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    );
  },

  handleTabChange(event, tabValue) {
    this.setState({
      tabValue,
      currentScreen: (tabValue===0?"setup":tabValue===1?"receive":"request")
    });

    if(tabValue === 1) {
      let that = this
      window.setTimeout(() => {
        const canvas = document.getElementById("canvas");
        if(canvas) {
          let val = that.state.accountValue

          QRCode.toCanvas(canvas, val, { width: 300 }, function(error) {
            if (error) console.error(error);
          });
        }
      })
    }
  },

  onSelectChange(event, value) {
    switch (event.target.name) {
      case 'asset':
        this.setState({ assetValue: event.target.value, accountValue: null })

        window.setTimeout(() => {
          const canvas = document.getElementById("canvas");
          if(canvas) {
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
          }
        })

        let theToken = this.state.assets.filter((asset) => {
          return asset.value === event.target.value
        })

        if(theToken && theToken.length > 0) {
          this.setState({ symbol: theToken[0].symbol, gasSymbol: theToken[0].gasSymbol })
        }

        break;
      case 'type':
        this.setState({ typeValue: event.target.value, contactValue: null, ownValue: null, publicValue: '' })
        break;
      default:
        break
    }
  },

  onChange(event) {
    switch (event.target.name) {
      case 'public':
        this.setState({ publicValue: event.target.value })
        break;
      case 'amount':
        this.setState({ amountValue: event.target.value })
        break;
      case 'gas':
        this.setState({ gasValue: event.target.value })
        break;
      default:
        break
    }
  },

  onContinue() {
    if(this.state.currentScreen === 'setup') {
      if(this.validateSetup()) {
        this.setState({ currentScreen: 'confirm', activeStep: 1 })
      }
    } else if (this.state.currentScreen === 'confirm') {
      this.callSend()
      // this.setState({ currentScreen: 'results', activeStep: 2 })
    } else if (this.state.currentScreen === 'results') {
      this.setState({ currentScreen: 'setup', activeStep: 0, accountValue: null, gasValue: '', ownValue: null, typeValue: 'contact', tokenValue: null, amountValue: '', publicValue: '', contactValue: null })
    }
  },

  onBack() {
    this.setState({ currentScreen: 'setup', activeStep: 0 })
  },

  callSend() {
    let { user, supportedERC20Tokens } = this.props

    let {
      ethAccounts,
      tokenValue,
      typeValue,
      accountValue,
      amountValue,
      gasValue,
      contactValue,
      publicValue,
      ownValue,
    } = this.state

    let content = {
      fromAddress: accountValue,
      amount: amountValue,
      gwei: gasValue,
    }

    if(typeValue === 'public') {
      content.toAddress = publicValue
      content.recipientAddress = publicValue
    }

    this.setState({ loading: true });

    switch(tokenValue) {
      case 'Ethereum':
        ethDispatcher.dispatch({
          type: 'sendEther',
          content,
          token: user.token
        });
        this.setState({chain: 'Ethereum'})
        break
      case 'ERC20':
        ethDispatcher.dispatch({
          type: 'sendERC20',
          content,
          token: user.token
        });
        this.setState({chain: 'Ethereum'})
        break
      default:

        let acc = ethAccounts.filter((account) => {
          return account.address === accountValue
        })

        if(acc.length > 0) {

          let arr = supportedERC20Tokens.filter((token) => {
            return token.name === tokenValue
          })
          if(arr.length > 0) {
            content.tokenAddress = arr[0].contractAddress
          }

          this.setState({ chain: 'Ethereum'})

          ethDispatcher.dispatch({
            type: 'sendERC20',
            content,
            token: user.token
          });
          return
        }
        break;
    }
  },

  sendReturned(error, data) {
    if (data.success) {
      this.setState({
        loading: false,
        currentScreen: "results",
        activeStep: 2,
        transactionID: data.transactionId,
        error: null
      });
    } else {
      this.setState({
        loading: false,
        currentScreen: "results",
        activeStep: 2,
        error: data.errorMsg,
        transactionID: null
      });
    }
  },

  validateSetup() {

    this.setState({
      tokenError: null,
      tokenErrorMessage: '',
      accountError: null,
      accountErrorMessage: '',
      typeError: null,
      typeErrorMessage: '',
      contactError: null,
      contactErrorMessage: '',
      ownError: null,
      ownErrorMessage: '',
      publicError: null,
      publicErrorMessage: '',
      amountError: null,
      amountErrorMessage: '',
      gasError: null,
      gasErrorMessage: '',
    })

    let {
      tokenValue,
      accountValue,
      typeValue,
      amountValue,
      gasValue,
      ethAccounts,
    } = this.state

    let error = false

    if(!tokenValue) {
      this.setState({ tokenError: true, tokenErrorMessage: 'Token is a required field' })
      error = true
    }

    if(!accountValue) {
      this.setState({ accountError: true, accountErrorMessage: 'Account is a required field' })
      error = true
    }

    if(!typeValue) {
      this.setState({ typeError: true, typeErrorMessage: 'Type is a required field' })
      error = true
    } else {
      if(typeValue === 'public' && (!typeValue || typeValue === "")) {
        this.setState({ typeError: true, typeErrorMessage: 'Public Address is a required field' })
        error = true
      }
    }

    if(!amountValue || amountValue === "" || amountValue <= 0) {
      this.setState({ amountError: true, amountErrorMessage: 'Amount is a required field' })
      error = true
    } else {
      if(!this.isNumeric(amountValue)) {
        this.setState({ amountError: true, amountErrorMessage: 'Amount needs to be numeric' })
        error = true
      }
    }


    if(!gasValue || gasValue === "" || gasValue <= 0) {
      this.setState({ gasError: true, gasErrorMessage: 'Gas is a required field' })
      error = true
    } else {
      if(!this.isNumeric(gasValue)) {
        this.setState({ gasError: true, gasErrorMessage: 'Gas needs to be numeric' })
        error = true
      }

      if(tokenValue === 'Wanchain' && gasValue < 200) {
        this.setState({ gasError: true, gasErrorMessage: 'Minimum Gas amount is 200' })
        error = true
      }
    }

    if(tokenValue && accountValue) {
      let accountBalance = 0
      switch(tokenValue) {
        case "Ethereum":
          accountBalance = ethAccounts.filter((account) => {
            return account.address === accountValue
          })[0].balance
          break;
        default:
          let acc = ethAccounts.filter((account) => {
            return account.address === accountValue
          })

          if(acc.length > 0) {
            let tok = acc[0].tokens.filter((token) => {
              return token.name === tokenValue
            })
            accountBalance = tok[0].balance
          }

          break;
      }

      if(amountValue > accountBalance) {
        this.setState({ amountError: true, amountErrorMessage: 'Amount is greater than Current Balance' })
        error = true
      }
    }

    return !error
  },

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
});

export default Transact;
