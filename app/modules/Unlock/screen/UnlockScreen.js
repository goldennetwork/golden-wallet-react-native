import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  Animated,
  BackHandler,
  Platform
} from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react/native'
/* eslint-disable-next-line */
import GoldenLoading from '../../../components/elements/GoldenLoading'
import UnlockStore from '../UnlockStore'
import DisableView from '../elements/DisableView'
import AppStyle from '../../../commons/AppStyle'
import Keyboard from '../elements/Keyboard'
import MainStore from '../../../AppStores/MainStore'
import NavStore from '../../../AppStores/NavStore'
import HapticHandler from '../../../Handler/HapticHandler'
import TouchID from '../../../../Libs/react-native-touch-id'

const { height } = Dimensions.get('window')
const isSmallScreen = height < 569

const optionalConfigObject = {
  title: 'Authentication Required', // Android
  color: '#e00606', // Android
  sensorDescription: 'Touch sensor', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false // use unified error messages (default false)
}

@observer
export default class UnlockScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  static defaultProps = {
    navigation: {}
  }

  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(0)
    this.isShake = false
  }

  componentDidMount() {
    UnlockStore.setup()
    const { params } = this.props.navigation.state
    const { appState } = MainStore
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
      if (appState.biometryType && appState.enableTouchFaceID && params.isLaunchApp) {
        this.showPromptTouchFaceID()
      }
    } else if (appState.biometryType != '' && appState.enableTouchFaceID && params.isLaunchApp) {
      this.showPromptTouchFaceID()
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    }
  }

  get shouldShowDisableView() {
    const { wrongPincodeCount, timeRemaining } = UnlockStore
    return wrongPincodeCount > 5 && timeRemaining > 0
  }

  handleSuccessTouchFaceID = () => {
    UnlockStore.data.pincode = '000000'
    setTimeout(() => {
      UnlockStore.resetDisable()
      HapticHandler.NotificationSuccess()
      NavStore.goBack()
    }, 250)
  }

  showPromptTouchFaceID = () => {
    setTimeout(() => {
      TouchID.authenticate('Unlock your Golden', optionalConfigObject)
        .then((success) => {
          this.handleSuccessTouchFaceID()
        })
    }, 800)
  }

  handleBackPress = () => {
    BackHandler.exitApp()
    return true
  }

  renderDots(numberOfDots) {
    const dots = []
    const { pincode } = UnlockStore.data
    const pinTyped = pincode.length

    const styleDot = {
      width: 13,
      height: 13,
      borderRadius: 6.5,
      borderWidth: 1,
      borderColor: 'white',
      marginHorizontal: 12
    }
    for (let i = 0; i < numberOfDots; i++) {
      const backgroundColor = i < pinTyped ? { backgroundColor: 'white' } : {}
      const dot = <View style={[styleDot, backgroundColor]} key={i} />
      dots.push(dot)
    }
    return dots
  }

  renderContent = (unlockDescription, warningPincodeFail) => {
    if (this.shouldShowDisableView) {
      return <DisableView />
    }

    const animationShake = UnlockStore.animatedValue.interpolate({
      inputRange: [0, 0.3, 0.7, 1],
      outputRange: [0, -20, 20, 0],
      useNativeDriver: true
    })
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.desText}>{unlockDescription}</Text>
        {warningPincodeFail &&
          <Text style={styles.warningField}>{warningPincodeFail}</Text>
        }
        <Animated.View
          style={[styles.pinField, {
            transform: [
              {
                translateX: animationShake
              }
            ]
          }]}
        >
          {this.renderDots(6)}
        </Animated.View>
        <Keyboard
          params={this.props.navigation.state.params}
        />
      </View>
    )
  }

  render() {
    const { shouldShowDisableView } = this
    const { warningPincodeFail } = UnlockStore
    const unlockDescription = UnlockStore.data.unlockDes
    const container = shouldShowDisableView ? {} : { justifyContent: 'center' }
    return (
      <View style={[styles.container, container]}>
        <StatusBar
          hidden
        />
        <GoldenLoading
          style={{ marginTop: shouldShowDisableView ? 80 : 0 }}
          isSpin={false}
        />
        {this.renderContent(unlockDescription, warningPincodeFail)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  desText: {
    color: 'white',
    fontSize: isSmallScreen ? 14 : 22,
    fontFamily: 'OpenSans-Bold',
    marginTop: isSmallScreen ? 10 : height * 0.03,
    marginBottom: isSmallScreen ? 8 : height * 0.015
  },
  pinField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: isSmallScreen ? 13 : height * 0.025
  },
  warningField: {
    color: AppStyle.errorColor,
    fontFamily: 'OpenSans-Semibold',
    fontSize: 16
  }
})
