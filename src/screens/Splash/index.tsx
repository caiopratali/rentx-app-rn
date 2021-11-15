import React, { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate, Extrapolate, runOnJS } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import {
  Container
} from './styles';

export function Splash() {
  const splashAnimation = useSharedValue(0);

  const navigation = useNavigation()

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [1, .3, 0], Extrapolate.CLAMP),
      position: 'absolute'
    }
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [50, 75, 100], [0, .3, 1], Extrapolate.CLAMP)
    }
  });

  function startApp() {
    navigation.navigate('SignIn');
  }

  useEffect(() => {
    splashAnimation.value = withTiming(
      100,
      { duration: 5000 },
      () => {
        'worklet'
        runOnJS(startApp)();
      }
    )
  }, []);

  return (
    <Container>
      <Animated.View style={brandStyle}>
        <BrandSvg width={80} height={50} />
      </Animated.View>
      <Animated.View style={logoStyle}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}