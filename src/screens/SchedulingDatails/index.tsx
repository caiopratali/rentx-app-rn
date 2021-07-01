import React from "react";
import { StatusBar } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import SpeedSvg from '../../assets/speed.svg';
import AccelerationSvg from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';

import { 
  Container,  
  Header, 
  Content, 
  Details, 
  Description, 
  Brand, 
  Name, 
  Rent, 
  Period, 
  Price, 
  Acessories, 
  RentalPeriod, 
  CalendarIcon, 
  DateInfo, 
  DateTitle, 
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDatails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer 
} from "./styles";

export function SchedulingDatails() {
  const images = ['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'];
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleSchedulingComplete() {
    navigation.navigate('SchedulingComplete')
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <Header>
        <BackButton />
      </Header>
      <ImageSlider imagesUrl={images} />
      <Content>
        <Details>
          <Description>
            <Brand>Laborguinhe</Brand>
            <Name>Huracan</Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>
        <Acessories>
          <Accessory name="380km/h" icon={SpeedSvg} />  
          <Accessory name="3.2s" icon={AccelerationSvg} />  
          <Accessory name="800 HP" icon={ForceSvg} />  
          <Accessory name="Gasolina" icon={GasolineSvg} />  
          <Accessory name="Auto" icon={ExchangeSvg} />  
          <Accessory name="2 pessoas" icon={PeopleSvg} />  
        </Acessories>
        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={colors.shape}/>
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>
          <Feather name="chevron-right" size={RFValue(10)} color={colors.text}/>
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDatails>
            <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
          </RentalPriceDatails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button title="Alugar agora" color={colors.success} onPress={handleSchedulingComplete} />
      </Footer>
    </Container>
  );
}