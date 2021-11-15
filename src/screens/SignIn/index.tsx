import React, { useState } from 'react';
import { 
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native'

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  Footer
} from './styles';

export const SignIn: React.FC = () => {

  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { signIn } = useAuth();
  const { navigate } = useNavigation();

  const handleSignIn = async () => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('A senha é obrigatória')
      });
  
      await schema.validate({ email, password });

      signIn({ email, password });
    } catch (error) {
      if(error instanceof Yup.ValidationError) return Alert.alert(error.message);

      console.error(error);
    }
  }

  const handleNewAccount = () => {
    navigate('SignUpFirstStep')
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
          <Header>
            <Title>
              Estamos {'\n'}quase lá.
            </Title>
            <SubTitle>
              Faça seu login para começar {'\n'}
              uma experiência incrível.
            </SubTitle>
          </Header>
          <Form>
            <Input
              iconName="mail" 
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              iconName="lock" 
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>
          <Footer>
            <Button 
              title="Login" 
              onPress={handleSignIn} 
              enabled={true} 
              loading={false} 
            />
            <Button 
              title="Criar conta gratuita" 
              onPress={handleNewAccount} 
              enabled={true} 
              loading={false} 
              color={theme.colors.background_secondary} 
              light
            />
          </Footer>
        </Container>
       </TouchableWithoutFeedback> 
    </KeyboardAvoidingView>
  );
}