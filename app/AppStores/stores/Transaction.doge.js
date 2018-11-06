import { observable, action } from 'mobx'
import { BigNumber } from 'bignumber.js'
import Transaction from './Transaction'
import MainStore from '../MainStore'
import constant from '../../commons/constant'
import API from '../../api'

export default class TransactionDOGE extends Transaction {
  @observable inputs = null
  @observable outputs = null

  walletType = 'dogecoin'

  constructor(obj, token = {}, status = 1) {
    super(obj, token, status)
    this.rate = MainStore.appState.rateDOGEDollar
    this.timeStamp = obj.time
    this.hash = obj.txid
    this.tokenName = 'dogecoin'
    this.tokenSymbol = 'DOGE'
    this.decimal = 8
    this.gas = new BigNumber(`100000000`)
    this.gasPrice = new BigNumber(`1`)
    this.gasUsed = new BigNumber(`100000000`)
    this.status = 1
    this.incoming = obj.incoming
    this.outgoing = obj.outgoing
  }

  @action getTxDetail() {
    if (this.inputs && this.outputs) return
    API.getTxDetailDOGE(this.hash)
      .then((res) => {
        const { inputs, outputs } = res.data.data
        this.inputs = inputs
        this.outputs = outputs
      })
      .catch(e => console.log(e))
  }

  get value() {
    if (this.outgoing) return new BigNumber(this.outgoing.outputs[0].value).times(new BigNumber('1e+8'))
    return new BigNumber(this.incoming.value).times(new BigNumber('1e+8'))
  }

  get from() {
    const { selectedWallet } = MainStore.appState
    if (this.incoming) return this.incoming.inputs.map(i => i.address)
    return [selectedWallet.address]
  }

  get to() {
    const { selectedWallet } = MainStore.appState
    if (this.outgoing) return this.outgoing.outputs.map(o => o.address)
    return [selectedWallet.address]
  }

  get isSelf() {
    const { selectedWallet } = MainStore.appState
    const address = this.address ? this.address : selectedWallet.address
    let self = true
    for (let i = 0; i < this.from.length; i++) {
      if (this.from[i] !== address) {
        self = false
        break
      }
    }
    if (self) {
      for (let i = 0; i < this.to.length; i++) {
        if (this.to[i] !== address) {
          self = false
          break
        }
      }
    }
    return self
  }

  get isSent() {
    const { selectedWallet } = MainStore.appState
    const address = this.address ? this.address : selectedWallet.address
    let sent = true
    for (let i = 0; i < this.from.length; i++) {
      if (this.from[i] !== address) {
        sent = false
        break
      }
    }
    return sent
  }

  get type() {
    if (this.isSelf) return constant.SELF
    if (this.status === 0) return constant.PENDING
    return this.isSent ? constant.SENT : constant.RECEIVED
  }

  get fee() {
    if (this.status === 1) {
      return this.gasUsed.multipliedBy(this.gasPrice).dividedBy(new BigNumber(`1.0e+8`))
    }
    return this.gas.multipliedBy(this.gasPrice).dividedBy(new BigNumber(`1.0e+8`))
  }

  get feeFormat() {
    const usd = this.fee.times(MainStore.appState.rateDOGEDollar).toFixed(3)
    let usdStr = `= $${usd}`
    if (usd === '0') {
      usdStr = ''
    }
    return `${this.fee} DOGE ${usdStr}`
  }

  get balance() {
    return this.value.dividedBy(new BigNumber(`1.0e+8`))
  }

  get balanceUSD() {
    return this.balance.multipliedBy(this.rate)
  }
}
