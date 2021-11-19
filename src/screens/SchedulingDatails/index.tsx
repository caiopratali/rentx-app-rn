import React from "react";
import { Alert, StatusBar } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";
import { RFValue } from "react-native-responsive-fontsize";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

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
  Accessories, 
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

import { CarDTO } from "../../dtos/CarDTO";
import { useState } from "react";
import { MarkedDateProps } from "../../components/Calendar";
import { useEffect } from "react";
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { api } from "../../services/api";

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDatails() {
  const [loading, setLoading] = useState(false);
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>( {} as RentalPeriod );

  const { colors } = useTheme();
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const route = useRoute();

  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.price);

  async function handleSchedulingComplete() {
    setLoading(true)

    await api.post('/rentals', {
      user_id: 1,
      car_id: car.id,
      start_date: new Date(dates[0]),
      end_date: new Date(dates[dates.length - 1]),
      total: rentTotal
    }).then(() => {
      navigation.navigate('Confirmation', { 
        title: 'Carro alugado!', 
        message: 'Agora você só precisa ir\naté a concessionária da RENTX\naproveitar pegar o seu automóvel', 
        nextScreenRoute: 'Home'
      });
    }).catch(() => {
      setLoading(false)
      Alert.alert('Não foi possível confirmar o agendamento')
    })
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
    })
  }, [])

  useEffect(() => {
    const fetchCarUpdated = async () => {
      const response = await api.get(`/cars/${car.id}`);

      setCarUpdated(response.data);
    }

    if(netInfo.isConnected === true) fetchCarUpdated();
  }, [netInfo.isConnected]);


  return (
    <Container>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <Header>
        <BackButton onPress={handleBack} />
      </Header>
      <ImageSlider 
        imagesUrl={ 
          !!carUpdated.photos ? carUpdated.photos : 
          [{ id: car.thumbnail, photo: car.thumbnail }] 
        } 
      />
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>
        {
          carUpdated.accessories &&
          <Accessories>
            {
              carUpdated.accessories.map(accessory => (
                <Accessory 
                  key={accessory.type} 
                  name={accessory.name} 
                  icon={getAccessoryIcon(accessory.type)} 
                />
              ))
            }
          </Accessories>
        }
        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={colors.shape}/>
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>
          <Feather name="chevron-right" size={RFValue(10)} color={colors.text}/>
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDatails>
            <RentalPriceQuota>{`R$ ${car.price} x ${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDatails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button 
          title="Alugar agora" 
          color={colors.success} 
          onPress={handleSchedulingComplete} 
          loading={loading} 
          enabled={!loading}
        />
      </Footer>
    </Container>
  );
}