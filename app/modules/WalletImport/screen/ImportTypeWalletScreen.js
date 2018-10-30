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
export default class WalletTypeImportScreen extends Component {
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
    NavStore.pushToScreen('ImportWalletScreen', {
      coin: chainNames.ETH
    })
  }

  gotoEnterNameBTC = () => {
    if (MainStore.appState.config.network !== 'mainnet') {
      NavStore.popupCustom.show('You need change network to main net to import BTC Wallet')
      return
    }
    NavStore.pushToScreen('ImportWalletScreen', {
      coin: chainNames.BTC
    })
  }

  gotoEnterNameLTC = () => {
    if (MainStore.appState.config.network !== 'mainnet') {
      NavStore.popupCustom.show('You need change network to main net to import BTC Wallet')
      return
    }
    NavStore.pushToScreen('ImportWalletScreen', {
      coin: chainNames.LTC
    })
  }

  gotoEnterNameDOGE = () => {
    if (MainStore.appState.config.network !== 'mainnet') {
      NavStore.popupCustom.show('You need change network to main net to import DOGE Wallet')
      return
    }
    NavStore.pushToScreen('ImportWalletScreen', {
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
            title: 'Import Existing Wallet',
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
        {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <SmallCard
            style={{ height: 214 }}
            title="Bitcoin"
            imageCard={images.imgCardBTC}
            onPress={this.gotoEnterNameBTC}
            imageBackground="backgroundCard"
            titleTextStyle={{ color: AppStyle.mainColor }}
            subtitleTextStyle={{ color: AppStyle.secondaryTextColor, marginTop: 4, fontSize: 16 }}
          />

          <SmallCard
            style={{ marginTop: 40 }}
            title="Ethereum"
            imageCard={images.imgCardETH}
            onPress={this.gotoEnterNameETH}
            imgBackground="backgroundCard"
            imgBackgroundStyle={{ height: 214, borderRadius: 14, width: width - 40 }}
            titleTextStyle={{ color: AppStyle.mainTextColor }}
            subtitleTextStyle={{ color: AppStyle.secondaryTextColor, marginTop: 4, fontSize: 16 }}
          />
        </View> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
