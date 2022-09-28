import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'

interface IPageProps {
  title: string
  index: number
  translateX: SharedValue<number>
}

const { height, width } = Dimensions.get('window')

const SIZE = width * 0.7

export function Page({ index, title, translateX }: IPageProps) {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    )

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    )

    return {
      borderRadius,
      transform: [{ scale }],
    }
  })

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(translateX.value, inputRange, [
      height / 2,
      0,
      -(height / 2),
    ])

    const opacity = interpolate(translateX.value, inputRange, [2, 1, -2])

    return {
      opacity,
      transform: [
        {
          translateY,
        },
      ],
    }
  })

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgba(0, 0, 256, 0.${index + 2})` },
      ]}
    >
      <Animated.View style={[styles.square, rStyle]}></Animated.View>

      <Animated.View style={[{ position: 'absolute' }, rTextStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.4)',
  },
  text: {
    fontSize: 70,
    fontWeight: '700',
    color: 'white',
    textTransform: 'uppercase',
  },
})
