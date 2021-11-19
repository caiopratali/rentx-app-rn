import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
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
  const { user, signOut, updatedUser } = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const isDataEdit = option === 'dataEdit';
  const isPasswordEdit = option === 'passwordEdit';

  const theme = useTheme();
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  }

  const handleOptionsChange = (optionSelected: 'dataEdit' | 'passwordEdit') => {
    setOption(optionSelected);
  }

  const handleAvatarSelect = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    });

    if(result.cancelled) return;

    if(result.uri) setAvatar(result.uri);
  }

  const handleProfileUpdate = async () => {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória'),
        name: Yup.string().required('Nome é obrigatória')
      });

      await schema.validate({ driverLicense, name });

      await updatedUser({...user, name, driver_license: driverLicense, avatar});

      Alert.alert('Perfil atualizado com sucesso!');
    } catch (error) {
      if(error instanceof Yup.ValidationError) Alert.alert('Ops', error.message);

      Alert.alert('Não foi possivel atualizar o perfil.');
    }
  }

  const handleSignOut = () => {
    Alert.alert(
      'Tem certeza?', 
      'Se você sair, será necessário uma conexão com a internet para se conectar.',
      [
        {
          text: 'Cancelar',
          onPress: () => {}
        },
        {
          text: '',
          onPress: () => signOut()
        }
      ]
    );
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
              { !!avatar && <Photo source={{ uri: avatar }} /> }
              <PhotoButton onPress={handleAvatarSelect}>
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
                  onChangeText={setName}
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
                  onChangeText={setDriverLicense}
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
            <Button title="Salvar alterações" onPress={handleProfileUpdate} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}