import React from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

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

import { Container, Header, Content, Details, Description, Brand, Name, Rent, Period, Price, About, Acessories, Footer } from "./styles";

export function CarDatails() {
  const images = ['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'];
  const navigation = useNavigation();

  function handleScheduling() {
    navigation.navigate('Scheduling')
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
        <About>
        Este é automóvel desportivo. Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla. 
        É um belíssimo carro para quem gosta de acelerar.
        </About>
      </Content>
      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleScheduling}/>
      </Footer>
    </Container>
  );
}