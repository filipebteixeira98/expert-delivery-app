import { useState, useRef } from 'react'
import { FlatList, SectionList, Text, View } from 'react-native'
import { Link } from 'expo-router'

import { useCartStore } from '@/stores/cart-store'

import { Header } from '@/components/header'
import { CategoryButton } from '@/components/category-button'
import { Product } from '@/components/product'

import { CATEGORIES, MENU } from '@/utils/data/products'

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0])

  const sectionListRef = useRef<SectionList>(null)

  const cartStore = useCartStore()

  const cartQuantityItems = cartStore.products.reduce(
    (totalItems, product) => totalItems + product.quantity,
    0
  )

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory)

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory
    )

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      })
    }
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Make your wish" cartQuantityItems={cartQuantityItems} />
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCategorySelect(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />
      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-white text-xl font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  )
}
