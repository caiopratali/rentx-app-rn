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
  value?: string;
}

export const PasswordInput: React.FC<Props> = ({ iconName, value, ...rest }) => {

  const theme = useTheme();

  const [ isPasswordVisible, setIsPasswordVisible ] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    setIsFilled(!!value);
  };

  const handlePasswordVisibilityChange = () => {
    setIsPasswordVisible(prevState => !prevState);
  }

  return (
    <Container >
      <IconContainer isFocused={isFocused}>
        <Feather 
          name={iconName}
          size={24}
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_details}
        />
      </IconContainer>
      <InputText secureTextEntry={isPasswordVisible} onFocus={handleInputFocus} onBlur={handleInputBlur} isFocused={isFocused} autoCorrect={false} {...rest} />
      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer isFocused={isFocused}>
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