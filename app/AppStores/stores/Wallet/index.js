import BtcWallet from './Wallet.btc'
import EthWallet from './Wallet'
import LtcWallet from './Wallet.ltc'
import DogeWallet from './Wallet.doge'
import Keystore from '../../../../Libs/react-native-golden-keystore'
import WalletDS from '../../DataSource/WalletDS'
import GetAddress, { chainNames } from '../../../Utils/WalletAddresses'

export const generateNew = async (secureDS, title, index = 0, path = Keystore.CoinType.ETH.path, coin = chainNames.ETH, network = 'mainnet') => {
  if (!secureDS) throw new Error('Secure data source is required')
  const mnemonic = await secureDS.deriveMnemonic()
  const { private_key } = await Keystore.createHDKeyPair(mnemonic, '', path, index)
  const { address } = GetAddress(private_key, coin, network)
  secureDS.savePrivateKey(address, private_key)
  const dataWallet = {
    address, balance: '0', index, title, isFetchingBalance: true
  }
  switch (coin) {
    case chainNames.ETH:
      return new EthWallet(dataWallet, secureDS)
    case chainNames.BTC:
      return new BtcWallet(dataWallet, secureDS)
    case chainNames.LTC:
      return new LtcWallet(dataWallet, secureDS)
    case chainNames.DOGE:
      return new DogeWallet(dataWallet, secureDS)
    default:
      return new BtcWallet(dataWallet, secureDS)
  }
}

export const importPrivateKey = (privateKey, title, secureDS, coin = chainNames.ETH, network = 'mainnet') => {
  const { address } = GetAddress(privateKey, coin, network)
  secureDS.savePrivateKey(address, privateKey)
  const dataWallet = {
    address, balance: '0', index: -1, external: true, didBackup: true, importType: 'Private Key', isFetchingBalance: true, title
  }
  switch (coin) {
    case chainNames.ETH:
      return new EthWallet(dataWallet, secureDS)
    case chainNames.BTC:
      return new BtcWallet(dataWallet, secureDS)
    case chainNames.LTC:
      return new LtcWallet(dataWallet, secureDS)
    case chainNames.DOGE:
      return new DogeWallet(dataWallet, secureDS)
    default:
      return new BtcWallet(dataWallet, secureDS)
  }
}

export const importAddress = (address, title, secureDS, coin = chainNames.ETH) => {
  const dataWallet = {
    address, balance: '0', index: -1, external: true, didBackup: true, importType: 'Address', isFetchingBalance: true, title, canSendTransaction: false
  }
  switch (coin) {
    case chainNames.ETH:
      return new EthWallet(dataWallet, secureDS)
    case chainNames.BTC:
      return new BtcWallet(dataWallet, secureDS)
    case chainNames.LTC:
      return new LtcWallet(dataWallet, secureDS)
    case chainNames.DOGE:
      return new DogeWallet(dataWallet, secureDS)
    default:
      return new BtcWallet(dataWallet, secureDS)
  }
}

export const unlockFromMnemonic = async (mnemonic, title, index, secureDS, path = Keystore.CoinType.ETH.path, coin = chainNames.ETH, network = 'mainnet') => {
  const { private_key } = await Keystore.createHDKeyPair(mnemonic, '', path, index)
  const { address } = GetAddress(private_key, coin, network)
  secureDS.savePrivateKey(address, private_key)
  const dataWallet = {
    address, balance: '0', index: -1, external: true, didBackup: true, importType: 'Mnemonic', isFetchingBalance: true, title
  }
  switch (coin) {
    case chainNames.ETH:
      return new EthWallet(dataWallet, secureDS)
    case chainNames.BTC:
      return new BtcWallet(dataWallet, secureDS)
    case chainNames.LTC:
      return new LtcWallet(dataWallet, secureDS)
    case chainNames.DOGE:
      return new DogeWallet(dataWallet, secureDS)
    default:
      return new BtcWallet(dataWallet, secureDS)
  }
}

export const getWalletAtAddress = async (address) => {
  return await WalletDS.getWalletAtAddress(address)
}

export const getWalletsFromMnemonic = async (mnemonic, path = Keystore.CoinType.ETH.path, from = 0, to = 20, coin = chainNames.ETH, network = 'mainnet') => {
  const keys = await Keystore.createHDKeyPairs(mnemonic, '', path, from, to)
  const wallets = keys.map((k) => {
    const { address } = GetAddress(k.private_key, coin, network)
    const dataWallet = {
      address, balance: '0', index: -1, external: true, didBackup: true, importType: 'Mnemonic', isFetchingBalance: true, title: ''
    }
    switch (coin) {
      case chainNames.ETH:
        return new EthWallet(dataWallet)
      case chainNames.BTC:
        return new BtcWallet(dataWallet)
      case chainNames.LTC:
        return new LtcWallet(dataWallet)
      case chainNames.DOGE:
        return new DogeWallet(dataWallet)
      default:
        return new BtcWallet(dataWallet)
    }
  })

  return wallets
}

export const BTCWallet = BtcWallet
export const ETHWallet = EthWallet
export const LTCWallet = LtcWallet
export const DOGEWallet = DogeWallet
