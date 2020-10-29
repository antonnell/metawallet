import fetch from 'node-fetch';
import config from "../config";
import async from "async";

import Web3 from 'web3';

import { ERC20ABI } from "./abi/erc20ABI";

const rp = require('request-promise');

const accountStore = require("./accountStore.js").default.store;

const Dispatcher = require('flux').Dispatcher;
const Emitter = require('events').EventEmitter;

const dispatcher = new Dispatcher();
const emitter = new Emitter();

class Store {
  constructor() {
    this.store = {
      accounts: null,
      accountsCombined: null,
      erc20Accounts: null,
      erc20AccountsCombined: null,
      assets: [
        {
          address: "Ethereum",
          name: "Ethereum",
          description: "Ethereum",
          decimals: 18,
          symbol: "ETH",
          value: "ETH",
          balance: 0,
          price_id: 'ethereum',
          logo: 'ETH-logo.png',
        },
        {
          address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          name: "Wrapped Ethereum",
          description: "Wrapped Ethereum",
          decimals: 18,
          symbol: "WETH",
          value: "WETH",
          balance: 0,
          price_id: 'ethereum',
          logo: 'WETH-logo.png',
        },
        {
          address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
          name: "Wrapped Bitcoin",
          description: "Wrapped Bitcoin",
          decimals: 8,
          symbol: "WBTC",
          value: "WBTC",
          balance: 0,
          price_id: 'wrapped-bitcoin',
          logo: 'WBTC-logo.png',
        },
        {
          address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          name: "USD Coin",
          description: "USD Coin",
          decimals: 6,
          symbol: "USDC",
          value: "USDC",
          balance: 0,
          price_id: 'usd-coin',
          logo: 'USDC-logo.png',
        },
        {
          address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
          name: "Tether",
          description: "Tether",
          decimals: 6,
          symbol: "USDT",
          value: "USDT",
          balance: 0,
          price_id: 'tether',
          logo: 'USDT-logo.png',
        },
        {
          address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
          name: "Dai",
          description: "Dai",
          decimals: 18,
          symbol: "DAI",
          value: "DAI",
          balance: 0,
          price_id: 'dai',
          logo: 'DAI-logo.png',
        },
        {
          address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
          name: "Uniswap",
          description: "Uniswap",
          decimals: 18,
          symbol: "UNI",
          value: "UNI",
          balance: 0,
          price_id: 'uniswap',
          logo: 'UNI-logo.png',
        },
        {
          address: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
          name: "Yearn.finance",
          description: "Yearn.finance",
          decimals: 18,
          symbol: "YFI",
          value: "YFI",
          balance: 0,
          price_id: 'yearn-finance',
          logo: 'YFI-logo.png',
        },
        {
          address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
          name: "Aave",
          description: "Aave",
          decimals: 18,
          symbol: "LEND",
          value: "LEND",
          balance: 0,
          price_id: 'aave',
          logo: 'LEND-logo.png',
        },
        {
          address: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
          name: "Compound",
          description: "Compound",
          decimals: 18,
          symbol: "COMP",
          value: "COMP",
          balance: 0,
          price_id: 'compound-governance-token',
          logo: 'COMP-logo.png',
        },
        {
          address: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
          name: "Maker",
          description: "Maker",
          decimals: 18,
          symbol: "MKR",
          value: "MKR",
          balance: 0,
          price_id: 'maker',
          logo: 'MKR-logo.png',
        }
      ]
    }

    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case 'getBalances':
            this.getBalances(payload);
            break;
          default: {
          }
        }
      }.bind(this)
    );
  }

  //GETTER AND SETTER FOR CURRENT STORE DATA
  getStore(index) {
    return(this.store[index]);
  };

  setStore(obj) {
    this.store = {...this.store, ...obj}
    return emitter.emit('StoreUpdated');
  };

  _getWeb3Provider = () => {
    const account = accountStore.getStore('account')
    if(!account) {
      return null
    }

    const web3 = new Web3(account.web3);

    return web3
  }

  getBalances = async (payload) => {
    const account = accountStore.getStore('account')
    const assets = store.getStore('assets')

    const web3 = this._getWeb3Provider();

    const usdPrices = await this._getUSDPrices()

    async.map(assets, (asset, callback) => {
      async.parallel([
        (callbackInner) => { this._getBalance(web3, asset, account, callbackInner) }
      ], (err, data) => {

        asset.balance = data[0]
        const usdPrice = usdPrices[asset.price_id]

        if(usdPrice && usdPrice.usd) {
          asset.usdPrice = usdPrice.usd
          asset.usdBalance = data[0]*usdPrice.usd
        } else {
          asset.usdPrice = 0
          asset.usdBalance = 0
        }

        callback(null, asset)
      })
    }, (err, resultAssets) => {
      if(err) {
        return emitter.emit('connectWalletReturned', err)
      }

      store.setStore({ assets: resultAssets })
      return emitter.emit('getBalancesReturned')
    })
  };

  _getBalance = async (web3, asset, account, callback) => {
    try {
      if(asset.address === 'Ethereum') {
        const eth_balance = web3.utils.fromWei(await web3.eth.getBalance(account.address), "ether");
        callback(null, parseFloat(eth_balance))
      } else {

        const assetContract = new web3.eth.Contract(ERC20ABI, asset.address)
        let balance = await assetContract.methods.balanceOf(account.address).call({ from: account.address });
        balance = parseFloat(balance)/10**asset.decimals
        callback(null, parseFloat(balance))
      }
    } catch(ex) {
      console.log(ex)
      return callback(ex)
    }
  }

  _getUSDPrices = async () => {
    try {
      const url = 'https://api.coingecko.com/api/v3/simple/price?ids=usd-coin,dai,true-usd,tether,usd-coin,yearn-finance,wrapped-bitcoin,ethereum,compound-governance-token,uniswap,aave,maker&vs_currencies=usd'
      const priceString = await rp(url);
      const priceJSON = JSON.parse(priceString)

      return priceJSON
    } catch(e) {
      console.log(e)
      return null
    }
  }
}

var store = new Store();

export default {
  store: store,
  dispatcher: dispatcher,
  emitter: emitter
};
