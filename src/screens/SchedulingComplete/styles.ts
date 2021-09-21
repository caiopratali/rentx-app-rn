import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.header};
  padding-top: 56px;
`;

export const Content = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: -60px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};
  margin-top: 40px;
`;

export const Message = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.text_details};
  text-align: center;
  margin-top: 16px;
`;

export const Footer = styled.View`
  width: 100%;
  align-items: center;
  padding: 40px 0;
`;

