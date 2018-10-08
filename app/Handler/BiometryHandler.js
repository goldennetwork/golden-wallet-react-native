import TouchID from '../../Libs/react-native-touch-id'

const optionalConfigObject = {
  title: 'Authentication Required', // Android
  color: '#e00606', // Android
  sensorDescription: 'Touch sensor', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false // use unified error messages (default false)
}

export default class BiometryHandler {
  static show(onSuccess) {
    TouchID.authenticate('Unlock your Golden', optionalConfigObject)
      .then((success) => {
        onSuccess()
      })
  }
}