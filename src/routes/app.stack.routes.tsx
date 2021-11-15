import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { CarDatails } from '../screens/CarDatails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDatails } from '../screens/SchedulingDatails';
import { Confirmation } from '../screens/Confirmation';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';

const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator headerMode="none" initialRouteName="Home">
      <Screen name="Home" component={Home} />
      <Screen name="CarDatails" component={CarDatails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDatails" component={SchedulingDatails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}