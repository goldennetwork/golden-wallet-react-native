import { action } from 'mobx'
import WalletToken from './WalletToken'

export default class WalletTokenDOGE extends WalletToken {
  @action fetchTransactions = async (isRefresh = false) => {

  }
}
