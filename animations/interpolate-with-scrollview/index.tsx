import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'

import { Page } from './components/Page'

const WORDS = ["What's", 'up', 'mobile', 'devs']

export function InterpolateWithScrollView() {
  const translateX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x
  })

  return (
    <>
      <StatusBar style="dark" />

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      >
        {WORDS.map((title, index) => (
          <Page
            key={index}
            index={index}
            title={title}
            translateX={translateX}
          />
        ))}
      </Animated.ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
