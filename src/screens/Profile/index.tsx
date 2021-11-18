import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section
} from './styles';

export const Profile: React.FC = () => {
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

  const isDataEdit = option === 'dataEdit';
  const isPasswordEdit = option === 'passwordEdit';

  const theme = useTheme();
  const navigation = useNavigation();
  const { user } = useAuth();

  const handleBack = () => {
    navigation.goBack();
  }

  const handleSignOut = () => {

  }

  const handleOptionsChange = (optionSelected: 'dataEdit' | 'passwordEdit') => {
    setOption(optionSelected);
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                  <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>
            <PhotoContainer>
              <Photo source={{ uri: 'https://github.com/caiopratali.png' }} />
              <PhotoButton onPress={() => {}}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>
          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option active={isDataEdit} onPress={() => handleOptionsChange('dataEdit')}>
                <OptionTitle active={isDataEdit}>Dados</OptionTitle>
              </Option>
              <Option active={isPasswordEdit} onPress={() => handleOptionsChange('passwordEdit')}>
                <OptionTitle active={isPasswordEdit}>Trocar Senha</OptionTitle>
              </Option>
            </Options>
            {
              isDataEdit &&
              <Section>
                <Input 
                  defaultValue={user.name}
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                />
                <Input 
                  defaultValue={user.email}
                  iconName="mail"
                  editable={false}
                />
                <Input 
                  defaultValue={user.driver_license}
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                />
              </Section>
            }
            {
              isPasswordEdit &&
              <Section>
                <PasswordInput 
                  iconName="lock"
                  placeholder="Senha atual"
                />
                <PasswordInput 
                  iconName="lock"
                  placeholder="Nova senha"
                />
                <PasswordInput 
                  iconName="lock"
                  placeholder="Repetir senha"
                />
              </Section>
            }
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}