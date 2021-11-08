import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
  Container,
  IconContainer,
  InputText,
} from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export const PasswordInput: React.FC<Props> = ({ iconName, ...rest }) => {

  const theme = useTheme();

  const [ isPasswordVisible, setIsPasswordVisible ] = useState(true);

  const handlePasswordVisibilityChange = () => {
    setIsPasswordVisible(prevState => !prevState);
  }

  return (
    <Container>
      <IconContainer>
        <Feather 
          name={iconName}
          size={24}
          color={theme.colors.text_details}
        />
      </IconContainer>
      <InputText secureTextEntry={isPasswordVisible} {...rest} />
      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer>
        <Feather 
          name={isPasswordVisible ? "eye" : 'eye-off'}
          size={24}
          color={theme.colors.text_details}
        />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
}