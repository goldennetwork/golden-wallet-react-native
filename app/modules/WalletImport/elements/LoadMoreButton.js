import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  ActivityIndicator
} from 'react-native'
import { observer } from 'mobx-react/native'
import PropTypes from 'prop-types'
import AppStyle from '../../../commons/AppStyle'
import MainStore from '../../../AppStores/MainStore'

@observer
export default class CreateWalletScreen extends Component {
  static propTypes = {
    onPress: PropTypes.func
  }

  static defaultProps = {
    onPress: () => { }
  }

  constructor(props) {
    super(props)
    this.importMnemonicStore = MainStore.importMnemonicStore
  }

  renderChild = (loadmore) => {
    if (loadmore) return <ActivityIndicator color={AppStyle.mainColor} />
    return <Text style={styles.loadmoreText}>Load More</Text>
  }

  render() {
    const { onPress } = this.props
    const { isLoadmore } = this.importMnemonicStore
    return (
      <View style={styles.root}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.container}>
            {this.renderChild(isLoadmore)}
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 20,
    paddingRight: 20,
    alignItems: 'flex-end'
  },
  container: {
    borderRadius: 20,
    backgroundColor: AppStyle.backgroundDarkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    paddingVertical: 6
  },
  loadmoreText: {
    fontSize: 14,
    fontFamily: 'OpenSans-Semibold',
    color: AppStyle.mainColor
  }
})
