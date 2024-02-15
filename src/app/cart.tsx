import { useState } from 'react'
import { ScrollView, Text, View, Alert, Linking } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from 'expo-router'
import { Feather } from '@expo/vector-icons'

import { ProductCartProps, useCartStore } from '@/stores/cart-store'

import { Header } from '@/components/header'
import { Product } from '@/components/product'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { LinkButton } from '@/components/link-button'

import { formatCurrency } from '@/utils/functions/format-currency'

const PHONE_NUMBER = '5571991520664'

export default function Cart() {
  const [address, setAddress] = useState('')

  const navigation = useNavigation()

  const cartStore = useCartStore()

  const totalPrice = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  )

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert('Remove', `Do you want to remove ${product.title} from cart?`, [
      {
        text: 'Cancel',
      },
      {
        text: 'Remove',
        onPress: () => cartStore.remove(product.id),
      },
    ])
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      return Alert.alert('Order', 'Provide delivery details!')
    }

    const products = cartStore.products
      .map((product) => `\n ${product.quantity} ${product.title}`)
      .join('')

    const message = `
      🍔 NEW ORDER
      \n Deliver to: ${address}

      ${products}

      \n Amount: ${totalPrice}
    `

    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`
    )

    cartStore.clear()

    navigation.goBack()
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Your cart" />
      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Your cart is empty
              </Text>
            )}
            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">Total: </Text>
              <Text className="text-lime-400 text-2xl font-heading">
                {totalPrice}
              </Text>
            </View>
            <Input
              placeholder="Enter the delivery address with street, neighborhood, zip code, number and complement"
              onChangeText={setAddress}
              blurOnSubmit={true}
              onSubmitEditing={handleOrder}
              returnKeyType="next"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>Send order</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>
        <LinkButton title="Go back to menu" href="/" />
      </View>
    </View>
  )
}
