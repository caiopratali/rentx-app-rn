import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { useNetInfo } from "@react-native-community/netinfo";

import { 
  Container,
  Datails,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from "./styles";

import { Car as CarModel } from "../../database/model/Car";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

interface CarProps extends RectButtonProps {
  data: CarModel;
}

export function Car({ data, ...rest }: CarProps) {
  const netInfo = useNetInfo();

  const MotorIcon = getAccessoryIcon(data.fuel_type)

  return(
    <Container {...rest}>
      <Datails>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>
        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>
              R$ { netInfo.isConnected === true ? data.price : '...' }
            </Price>
          </Rent>
          <Type>
            <MotorIcon width={20} height={20} />
          </Type>
        </About>
      </Datails>
      <CarImage source={{ uri: data.thumbnail }} resizeMode="contain" />
    </Container>
  );
}