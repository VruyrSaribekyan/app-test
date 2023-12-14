import React, { FC } from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { white } from '../../constants/colors';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
}

const CustomButton: FC<CustomButtonProps> = ({ title, onPress, buttonStyle, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 66,
    padding: 22,
    borderRadius: 20,
    backgroundColor: '#FE4545',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: white,
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'center',
  },
});

export default CustomButton;
