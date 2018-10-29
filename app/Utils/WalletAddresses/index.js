import EthereumAddress from './Ethereum'
import BitcoinAddress from './Bitcoin'
import LitecoinAddress from './Litecoin'
import DogecoinAddress from './Dogecoin'

export const chainNames = {
  ETH: 'Ethereum',
  BTC: 'Bitcoin',
  LTC: 'Litecoin',
  DOGE: 'Dogecoin'
}

export default (privateKey, chainName = 'Ethereum', network = 'mainnet') => {
  switch (chainName) {
    case chainNames.ETH:
      return new EthereumAddress(privateKey)
    case chainNames.BTC:
      return new BitcoinAddress(privateKey, network)
    case chainNames.LTC:
      return new LitecoinAddress(privateKey)
    case chainNames.DOGE:
      return new DogecoinAddress(privateKey)
    default: return new EthereumAddress(privateKey)
  }
}
