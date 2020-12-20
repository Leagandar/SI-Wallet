import { Injectable, Inject, Logger } from '@nestjs/common';
import * as BlockIo from 'block_io';
import Axios from 'axios';
import CryptoNewsAPI from 'crypto-news-api'
const newsAPI = new CryptoNewsAPI('d8d4512eec1b7daf6a0f68602aa7477a');


@Injectable()
export class BlockchainService {
  
  BlockSystem = {
    ["litecoin"]: new BlockIo('918a-b795-0a86-00c7', "X00mjfgrcv"), 
    ["bitcoin"]: new BlockIo('8694-6a95-7c92-0e3a', "X00mjfgrcv"),  
    //["dogecoin"]: new BlockIo('2ed1-bf96-2afc-f881')
  }
  coinlist: Array<any> = null;
  constructor() {
    
  }
  
  async createAddress(username: string) {
    let addressLitecoin = await this.BlockSystem.litecoin.get_new_address({ label: username }).catch((err: Error) => { throw err });
    let addressBitcoin = await this.BlockSystem.bitcoin.get_new_address({ label: username }).catch((err: Error) => { throw err });
    return {
      addressLitecoin, addressBitcoin
    };
  }

  async getAdresses(username: string) {
    let BTC = await this.BlockSystem.bitcoin.get_address_balance({ label: username }).catch((err: Error) => { throw err });
    let LTC = await this.BlockSystem.litecoin.get_address_balance({ label: username }).catch((err: Error) => { throw err });
    let BTCINFO = await Axios({
      method: 'GET',
      url: `https://data.messari.io/api/v1/assets/bitcoin/metrics`,
    }).catch((err: Error) => {
      throw err
    });
    let LTCINFO = await Axios({
      method: 'GET',
      url: `https://data.messari.io/api/v1/assets/litecoin/metrics`,
    }).catch((err: Error) => {
      throw err
    });

    return [{
      ...BTC?.data,
      ...BTCINFO.data.data.market_data,
      main_data: await this.getAssetsBySlag('bitcoin').catch((err: Error) => {throw err})
    }, {
      ...LTC?.data,
      ...LTCINFO.data.data.market_data,
      main_data: await this.getAssetsBySlag('litecoin').catch((err: Error) => {throw err;})
    }];
  }

  async getPrices() {
    let BTC = await this.BlockSystem.bitcoin.get_current_price().catch((err: Error) => { throw err });
    let LTC = await this.BlockSystem.litecoin.get_current_price().catch((err: Error) => { throw err });
    return [BTC?.data, LTC?.data];
  }

  async archiveAddresses(username: string) {
    await this.BlockSystem.bitcoin.archive_addresses({ label: username }).catch((err: Error) => { throw err })
    await this.BlockSystem.litecoin.archive_addresses({ label: username }).catch((err: Error) => { throw err })
    return true;
  }

  async getAssets() {
    let result = await Axios({
      method: 'GET',
      url: `https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd`,
    }).catch((err: Error) => {
      throw err
    })
    return result ? result.data : null
  }

  async getAssetsBySlag(slag) {
    let result = await Axios({
      method: 'GET',
      url: `https://data.messari.io/api/v1/assets/${slag}/metrics`,
    }).catch((err: Error) => {
      throw err
    })
    return result ? result.data : null
  }

  async getNews() {
    return {
      top: await newsAPI.getTopNews().catch((err: Error) => { throw err }),
      latest: await newsAPI.getLatestNews().catch((err: Error) => { throw err })
    }
  }

  async withdraw(username:string, address: string, amount: string, toAddress: string) {
    Logger.log(username, "USERNAME")
    let check = await this.BlockSystem[address].is_valid_address({address: toAddress.toString()}).catch((err: Error) => {throw err;});
    if (check.data.is_valid == true && check.data.address == toAddress) {
      let fromAddress = await this.BlockSystem[address].get_address_by_label({ label: username }).catch((err: Error) => { throw err })
      Logger.log(fromAddress, "fromAddress");
      if(parseFloat(fromAddress.data.available_balance) < parseFloat(amount)) throw Error("You cannot withdraw more than you have, sorry)")
      return await this.BlockSystem[address].withdraw_from_addresses({ amounts: amount, from_addresses: fromAddress.data.address, to_addresses: toAddress })
    }
    throw Error(`SourceAddress need to be part of ${address.toUpperCase()} network`);
  }

}
