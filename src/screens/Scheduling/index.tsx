import React from "react";
import { useTheme } from "styled-components";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";

import ArrowSvg from '../../assets/arrow.svg';

import { Container, Header, Title, RentalPeriod, DateInfo, DateTitle, DateValue, Content, Footer } from "./styles";

export function Scheduling() {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleSchedulingDatails() {
    navigation.navigate('SchedulingDatails')
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

       <Header>
        <BackButton color={theme.colors.background_secondary}/>
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}>18/06/2021</DateValue>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}>18/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar />
      </Content>
      <Footer>
        <Button title="Confirmar" onPress={handleSchedulingDatails} />
      </Footer>
    </Container>
  );
}