import React from "react";
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

import GasolineSVG from '../../assets/gasoline.svg'
import { RectButtonProps } from "react-native-gesture-handler";

interface CarData {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number
  }
  thumbnail: string;
}

interface CarProps extends RectButtonProps {
  data: CarData;
}

export function Car({ data, ...rest }: CarProps) {
  return(
    <Container {...rest}>
      <Datails>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>
        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>
          <Type>
            <GasolineSVG width={20} height={20} />
          </Type>
        </About>
      </Datails>
      <CarImage source={{ uri: data.thumbnail }} resizeMode="contain" />
    </Container>
  );
}