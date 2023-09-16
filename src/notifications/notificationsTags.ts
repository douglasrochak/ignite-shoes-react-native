import OneSignal from 'react-native-onesignal'

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    user_name: 'Douglas',
    user_email: 'email@email.com',
  })
}

export function tagCartUpdate(itemsCount: string) {
  OneSignal.sendTag('cart_items_count', itemsCount)
}
