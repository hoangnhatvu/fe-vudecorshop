import {useRoute} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

const VNPay = ({navigation}) => {
  const route = useRoute();
  const {vpnUrl} = route.params;

  const handleMessage = event => {
    if (event.nativeEvent.data === 'continueShopping') {
      navigation.navigate('Home');
    }
  };

  return (
    <WebView
      source={{uri: vpnUrl}}
      originWhitelist={['*']}
      style={{flex: 1}}
      onMessage={handleMessage}
    />
  );
};

export default VNPay;

