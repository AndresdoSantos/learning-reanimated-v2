import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
} from 'react-native-reanimated'

const SIZE = 100.0

const rotation = (progress: Animated.SharedValue<number>) => {
  'worklet'

  return `${progress.value * 2 * Math.PI}rad`
}

export function BasicOfPanGestureHandler() {
  const progress = useSharedValue(1)
  const scale = useSharedValue(2)

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [{ scale: scale.value }, { rotate: rotation(progress) }],
    }
  }, [progress.value, scale.value])

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), 3, true)
    scale.value = withRepeat(withSpring(1), 3, true)
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="light" />

        <Animated.View
          style={[
            {
              width: SIZE,
              height: SIZE,
              backgroundColor: 'blue',
            },
            reanimatedStyle,
          ]}
        />
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
