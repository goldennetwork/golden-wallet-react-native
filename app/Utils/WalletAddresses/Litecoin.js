import bitcoin from 'react-native-bitcoinjs-lib'
import bigi from 'bigi'

export default class LitecoinAddress {
  privateKey = null
  network = null

  constructor(privateKey) {
    if (!privateKey) throw new Error('Private key is required')
    this.privateKey = privateKey
    this.network = bitcoin.networks.litecoin
  }

  get address() {
    const keyPair = new bitcoin.ECPair(bigi.fromHex(this.privateKey), undefined, { network: this.network })
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: this.network })
    return address
  }
}
