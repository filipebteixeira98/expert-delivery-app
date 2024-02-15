import { ScrollView, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Feather } from '@expo/vector-icons'

import { useCartStore } from '@/stores/cart-store'

import { Header } from '@/components/header'
import { Product } from '@/components/product'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { LinkButton } from '@/components/link-button'

import { formatCurrency } from '@/utils/functions/format-currency'

export default function Cart() {
  const cartStore = useCartStore()

  const totalPrice = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  )

  return (
    <View className="flex-1 pt-8">
      <Header title="Your cart" />
      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartStore.products.map((product) => (
                  <Product key={product.id} data={product} />
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
            <Input placeholder="Enter the delivery address with street, neighborhood, zip code, number and complement" />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View className="p-5 gap-5">
        <Button>
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
