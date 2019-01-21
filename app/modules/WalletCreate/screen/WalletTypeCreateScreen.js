import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  FlatList
} from 'react-native'
import { observer } from 'mobx-react/native'
import NavigationHeader from '../../../components/elements/NavigationHeader'
import LayoutUtils from '../../../commons/LayoutUtils'
import images from '../../../commons/images'
import NavStore from '../../../AppStores/NavStore'
import { chainNames } from '../../../Utils/WalletAddresses'
import MainStore from '../../../AppStores/MainStore'
import CoinItem from '../../../components/elements/CoinItem'

const marginTop = LayoutUtils.getExtraTop()
const dataCoin = [
  { imgCoin: images.imgCardBTC, coin: chainNames.BTC },
  { imgCoin: images.imgCardETH, coin: chainNames.ETH },
  { imgCoin: images.imgCardLTC, coin: chainNames.LTC },
  { imgCoin: images.imgCardDOGE, coin: chainNames.DOGE }
]
@observer
export default class WalletTypeCreateScreen extends Component {
  componentDidMount() {
    this.isReady = false
    setTimeout(() => {
      this.isReady = true
    }, 600)
  }

  onPress = (item) => {
    switch (item.coin) {
      case chainNames.ETH:
        return this.gotoEnterNameETH()
      case chainNames.BTC:
        return this.gotoEnterNameBTC()
      case chainNames.LTC:
        return this.gotoEnterNameLTC()
      case chainNames.DOGE:
        return this.gotoEnterNameDOGE()
      default: return this.gotoEnterNameBTC()
    }
  }

  goBack = () => {
    NavStore.goBack()
  }

  gotoEnterNameETH = () => {
    if (!this.isReady) {
      return
    }
    NavStore.pushToScreen('EnterNameScreen', {
      coin: chainNames.ETH
    })
  }

  gotoEnterNameLTC = () => {
    if (!this.isReady) {
      return
    }
    if (MainStore.appState.config.network !== 'mainnet') {
      NavStore.popupCustom.show('You need change network to main net to create LTC Wallet')
      return
    }
    NavStore.pushToScreen('EnterNameScreen', {
      coin: chainNames.LTC
    })
  }

  gotoEnterNameBTC = () => {
    if (!this.isReady) {
      return
    }
    if (MainStore.appState.config.network !== 'mainnet') {
      NavStore.popupCustom.show('You need change network to main net to create BTC Wallet')
      return
    }
    NavStore.pushToScreen('EnterNameScreen', {
      coin: chainNames.BTC
    })
  }

  gotoEnterNameDOGE = () => {
    if (!this.isReady) {
      return
    }
    if (MainStore.appState.config.network !== 'mainnet') {
      NavStore.popupCustom.show('You need change network to main net to create DOGE Wallet')
      return
    }
    NavStore.pushToScreen('EnterNameScreen', {
      coin: chainNames.DOGE
    })
  }

  keyExtractor = item => item.coin

  renderItem = ({ item, index }) =>
    <CoinItem item={item} index={index} onPress={() => this.onPress(item)} />

  render() {
    return (
      <View style={styles.container}>
        <NavigationHeader
          style={{ marginTop: marginTop + 20 }}
          headerItem={{
            title: 'Create a New Wallet',
            icon: null,
            button: images.backButton
          }}
          action={this.goBack}
        />
        <FlatList
          style={{ flex: 1 }}
          numColumns={2}
          columnWrapperStyle={{ marginVertical: 15, marginHorizontal: 20 }}
          showVerticalScrollIndicator={false}
          keyExtractor={this.keyExtractor}
          data={dataCoin}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
