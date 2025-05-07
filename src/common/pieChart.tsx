import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { ReText } from 'react-native-redash';

const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#FF681F';

const { width } = Dimensions.get('window');
const CIRCLE_LENGTH = width * 0.9;
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const PieChart = ({ progress }:any ) => {
  const progressText = useDerivedValue(() => `${Math.floor(progress.value * 100)}%`);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  return (
    <View style={styles.container}>
      <ReText style={styles.progressText} text={progressText} />

      <Svg width={CIRCLE_LENGTH} height={CIRCLE_LENGTH} style={styles.svg}>
        <Circle
          cx={CIRCLE_LENGTH / 2}
          cy={CIRCLE_LENGTH / 2}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={15}
          // fill="green"
        />
         
        <AnimatedCircle
          cx={CIRCLE_LENGTH / 2}
          cy={CIRCLE_LENGTH / 2}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap="round"
         
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'transparent', 
  },
  svg: {
    position: 'absolute',
    backgroundColor: 'transparent', 
  },
  progressText: {
    fontSize: 30,
    color: '#FFFFFF',
    textAlign: 'center',
    zIndex: 1,
    fontWeight: 'bold',
  },
});

export default PieChart;
