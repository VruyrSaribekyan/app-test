import React, { FC } from 'react';
import { TextInput, TextInputProps, StyleProp, ViewStyle } from 'react-native';
import { black } from '../../constants/colors';

interface CustomInputProps extends TextInputProps {
  placeholder: string;
  inputStyle?: StyleProp<ViewStyle>;
}

const CustomInput: FC<CustomInputProps> = ({ placeholder, value, onChangeText, secureTextEntry, inputStyle }) => {
  return (
    <TextInput
      style={[styles.input, inputStyle]}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = {
  input: {
    height: 60,
    padding: 20,
    paddingHorizontal: 22,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    marginBottom: 0,
    gap: 10,
    color: '#212121'
  },
};

export default CustomInput;
