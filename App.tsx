import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { InterpolateWithScrollView } from './animations/interpolate-with-scrollview'
import { BasicOfPanGestureHandler } from './animations/basic-of-pan-gesture-handler'
import { CircleProgressBar } from './animations/circulation-progress-bar'

export function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CircleProgressBar />
    </GestureHandlerRootView>
  )
}
