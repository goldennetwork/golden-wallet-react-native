import { AppRegistry } from 'react-native'
import './shim'
import App from './App'
import Keystore from './Libs/react-native-golden-keystore'
import bitcoin from 'react-native-bitcoinjs-lib'
import bigi from 'bigi'

// const mnemonic = 'leaf ridge absent obey region flee list push double pepper demise august jeans someone disagree segment denial dumb'
// const path = `m/49'/0'/0'/0/index`
// // const path = `m/44'/2'/0'/0/index`
// // const network = bitcoin.networks.dogecoin
// // const network = bitcoin.networks.litecoin
// const network = bitcoin.network.bitcoin

// const simple_send = [
//   "6f6d6e69", // omni
//   "0000",     // version
//   "00000000001f", // 31 for Tether
//   "000000003B9ACA00" // amount = 10 * 100 000 000 in HEX
// ].join('')

// const data = Buffer.from(simple_send, "hex")

// const omniOutput = bitcoin.script.compile([
//   bitcoin.opcodes.OP_RETURN,
//   // payload for OMNI PROTOCOL:
//   data
// ])

// Keystore.createHDKeyPair(mnemonic, '', path, 0).then((key) => {
//   const keyPair = new bitcoin.ECPair(bigi.fromHex(key.private_key), undefined, { network })
//   const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network })
//   console.log(address)
//   const p2wpkh = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network })
//   const p2sh = bitcoin.payments.p2sh({ redeem: p2wpkh, network })
//   const txb = new bitcoin.TransactionBuilder(network)
//   txb.addInput('f62540cc7495ce2e91394d4578c6241cb176c1763f367f26337eddcb87146f99', 0)
//   txb.addOutput('DPhRMvNVrBXzzWLTUuRCKjrhxNE6334noj', 40000000)
//   txb.addOutput(address, 59700000)
//   txb.sign(0, keyPair, null, null, 99800000)
//   console.log(txb.build().toHex())
// })

AppRegistry.registerComponent('golden', () => App)
