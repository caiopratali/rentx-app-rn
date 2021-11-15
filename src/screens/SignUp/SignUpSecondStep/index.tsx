import React, { useState } from 'react';
import { StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { PasswordInput } from '../../../components/PasswordInput';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { api } from '../../../services/api';
import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export const SignUpSecondStep: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { goBack, navigate } = useNavigation();
  const route = useRoute();

  const { user } = route.params as Params;
  
  const theme = useTheme();

  const handleBack = () => {
    goBack();
  }

  const handleRegister = async () => {
    if (!password) return Alert.alert('Senha obrigatória');
    if (password !== confirmPassword) return Alert.alert('As senhas estão iguais');

    await api.post('/users', {
      name: user.name,
      email: user.email,
      password,
      driver_license: user.driverLicense
    }).then(() => {
      navigate('Confirmation', { 
        title: 'Conta criada!', 
        message: 'Agora é só fazer login\ne aproveitar', 
        nextScreenRoute: 'SignIn'
      });
    }).catch(() => {
      Alert.alert('Opa', 'Não foi possível realizar o cadastro')
    }); 
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>
          <Title>Crie sua{'\n'}conta</Title>
          <SubTitle>Faça seu cadastro de{'\n'}forma rápida e fácil</SubTitle>
          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput iconName="lock" placeholder="Senha" onChangeText={setPassword} value={password} />
            <PasswordInput iconName="lock" placeholder="Repetir senha" onChangeText={setConfirmPassword} value={confirmPassword} />
          </Form>
          <Button title="Cadastrar" color={theme.colors.success} onPress={handleRegister} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}