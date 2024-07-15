import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigation from './src/navigation/BottomTabNavigation';
import {
  ARDesignView,
  Address,
  Cart,
  ChangePassword,
  EditAddress,
  EditProfile,
  Favourites,
  ForgotPassword,
  LoginPage,
  NewProducts,
  OrderSuccess,
  Orders,
  Payment,
  ProductDetail,
  Review,
  SignUp,
  ViroAR3DObjectPage,
  Chat,
  VNPay
} from './src/screens';
import {Provider} from 'react-redux';
import {ToastProvider} from 'react-native-toast-notifications';
import store from './src/redux/store';
import {PermissionsAndroid} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Linking} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import TemplateDetail from './src/screens/design/TemplateDetail';

const Stack = createNativeStackNavigator();

const NAVIGATION_IDS = ['orders'];

function buildDeepLinkFromNotificationData(data: any): string | null {
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    return null;
  }
  if (navigationId === 'orders') {
    return 'vudecorshop://orders';
  }
  return null;
}

const linking = {
  prefixes: ['vudecorshop://'],
  config: {
    initialRouteName: undefined,
    screens: {
      Orders: 'orders',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({url}: {url: string}) => listener(url);

    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (typeof url === 'string') {
        listener(url);
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
    };
  },
};

export default function App() {
  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }, []);

  return (
    <Provider store={store}>
      <ToastProvider>
        <NavigationContainer linking={linking}>
          <Stack.Navigator>
            <Stack.Screen
              name="Bottom"
              component={BottomTabNavigation}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NewProducts"
              component={NewProducts}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Favourites"
              component={Favourites}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Orders"
              component={Orders}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Payment"
              component={Payment}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Address"
              component={Address}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EditAddress"
              component={EditAddress}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="OrderSuccess"
              component={OrderSuccess}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Review"
              component={Review}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ViroAR3DObjectPage"
              component={ViroAR3DObjectPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Chat"
              component={Chat}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ARDesignView"
              component={ARDesignView}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="TemplateDetail"
              component={TemplateDetail}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="VNPay"
              component={VNPay}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </Provider>
  );
}
