import { Injectable, Inject } from '@nestjs/common';
import * as BlockIo from 'block_io';

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
    let BTC = await this.BlockSystem.bitcoin.get_adresses_balance({ label: username }).catch((err: Error) => { throw err });
    let LTC = await this.BlockSystem.litecoin.get_adresses_balance({ label: username }).catch((err: Error) => { throw err });
    return [BTC?.data, LTC?.data];
  }

}
