import { View } from 'react-native'

import { Header } from '@/components/header'
import { CategoryButton } from '@/components/category-button'

export default function Home() {
  return (
    <View className="flex-1 pt-8">
      <Header title="Make your wish" cartQuantityItems={1} />
      <View className="flex-row gap-4">
        <CategoryButton title="Snack of the day" isSelected />
      </View>
    </View>
  )
}
