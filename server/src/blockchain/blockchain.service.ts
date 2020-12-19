import { Injectable, Inject, Logger } from '@nestjs/common';
import * as BlockIo from 'block_io';
import Axios from 'axios';

@Injectable()
export class BlockchainService {
  constructor() { }
  BlockSystem = {
    ["litecoin"]: new BlockIo('918a-b795-0a86-00c7'),
    ["bitcoin"]: new BlockIo('8694-6a95-7c92-0e3a'),
    //["dogecoin"]: new BlockIo('2ed1-bf96-2afc-f881')
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
    return [BTC?.data, LTC?.data];
  }

  async getPrices(){
    let BTC = await this.BlockSystem.bitcoin.get_current_price().catch((err: Error) => { throw err });
    let LTC = await this.BlockSystem.litecoin.get_current_price().catch((err: Error) => { throw err });
    return [BTC?.data, LTC?.data];
  }

  async archiveAddresses(username: string){
    await this.BlockSystem.bitcoin.archive_addresses({ label: username }).catch((err: Error) => { throw err})
    await this.BlockSystem.litecoin.archive_addresses({ label: username }).catch((err: Error) => { throw err })
    return true;
  }

  async getNews(page: number){
    let result = await Axios({
      method: 'GET',
      url: `https://cryptopanic.com/api/v1/posts/?auth_token=e6b95cde5cb3cb2b54ce9cae096c50f80658e581&page=${page}`,
    }).catch((err: Error) => {
      Logger.error(err)
    })
    return result ? result.data: null
  }
}
