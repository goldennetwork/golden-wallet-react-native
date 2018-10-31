import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native'
import PropTypes from 'prop-types'
import AppStyle from '../../commons/AppStyle'

const { width } = Dimensions.get('window')
const cardSize = (width - 75) / 2

export default class CoinItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onPress: PropTypes.func,
    index: PropTypes.number.isRequired
  }

  static defaultProps = {
    onPress: () => { }
  }

  get marginStyle() {
    const { index } = this.props
    if (index % 2 === 0) return { marginRight: 35 }
    return {}
  }

  render() {
    const { item, onPress } = this.props
    const { imgCoin, coin } = item
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.container, this.marginStyle]}>
          <View style={styles.imgField}>
            <Image source={imgCoin} style={{ height: 80, width: 60, resizeMode: 'contain' }} />
          </View>
          <Text style={styles.coin}>{coin}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: cardSize,
    height: cardSize,
    borderRadius: 20,
    paddingVertical: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppStyle.mode1
  },
  imgField: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  coin: {
    fontFamily: 'OpenSans-Semibold',
    fontSize: 16,
    color: AppStyle.mainTextColor
  }
})
