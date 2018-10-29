import { action } from 'mobx'
import WalletToken from './WalletToken'

export default class WalletTokenLTC extends WalletToken {
  @action fetchTransactions = async (isRefresh = false) => {

  }
}
