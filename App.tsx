import { Platform, StatusBar } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { Routes } from './src/routes'

import { THEME } from './src/theme'
import { Loading } from './src/components/Loading'
import { tagUserInfoCreate } from './src/notifications/notificationsTags'

import { CartContextProvider } from './src/contexts/CartContext'
import OneSignal from 'react-native-onesignal'
import { useEffect } from 'react'

const oneSinalAppId =
  Platform.OS === 'ios' ? '' : '507cef40-26ac-4ef3-a302-7d0445fa1541'
OneSignal.setAppId(oneSinalAppId)

OneSignal.promptForPushNotificationsWithUserResponse()

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  tagUserInfoCreate()

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler((response) => {
      console.log('Notificação foi aberta.')
    })

    return () => unsubscribe
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  )
}
