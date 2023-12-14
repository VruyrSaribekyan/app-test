import React, { useState } from 'react';
import axios from 'axios';

import { View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView, } from 'react-native';
import { black, dark, darkRed, white } from '../constants/colors';
import CustomButton from '../components/CustomButton/CustomButton';
import CustomInput from '../components/CustomInput/CustomInput';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const response = await axios.post(
        'http://80.87.96.50:8085/delivery/delivery/login',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.status) {
        navigation.navigate('Home');
      } else {
        setIsError(true);
      }
    } catch (error: any) {
      setIsError(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -50}
    >
      <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Image source={require('../../assets/images/bg.png')} style={styles.bg} />
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>ПРЕМИУМ</Text>
              <Image source={require('../../assets/images/brliant.png')} />
              <Text style={styles.title}>СЕРВИС</Text>
            </View>
            <View style={styles.headerInner}>
              <View style={styles.subtitleWrapper}>
                <Image style={styles.vector} source={require('../../assets/images/vec.png')} />
                <Text style={styles.subtitle}>Доставка</Text>
              </View>
              <Image style={styles.headerImage} source={require('../../assets/images/car.png')} />
            </View>
          </View>
          <View style={styles.form}>
            <View>
              <Text style={styles.label}>Логин</Text>
              <CustomInput
                placeholder="Введите логин"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setIsError(false);
                }}
              />
              {isError && <Text style={styles.errorText}>Логин неверный</Text>}
            </View>
            <View>
              <Text style={styles.label}>Пароль</Text>
              <CustomInput
                placeholder="******"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setIsError(false);
                }}
                secureTextEntry
              />
              {isError && <Text style={styles.errorText}>Пароль неверный</Text>}
            </View>
            <View style={styles.btnWrapper}>
              <CustomButton title="Войти" onPress={handleLogin} />
            </View>
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    minHeight: '100%',
  },
  header: {
    width: '100%',
    minHeight: 261,
    position: 'relative',
    top: 17,
    alignItems: 'center',
    justifyContent: 'center'
  },

  bg: {
    position: 'absolute',
    resizeMode: 'contain'
  },

  titleWrapper: {
    marginTop: 25,
    width: 259,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 29,
    letterSpacing: 0,
    textAlign: 'left',
    color: dark
  },


  headerInner: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30
  },

  subtitleWrapper: {
    width: 128,
    height: 41,
    padding: 10,
    borderRadius: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    backgroundColor: darkRed,
    textAlign: 'center'
  },

  subtitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: white
  },

  headerImage: {
    maxWidth: 158,
    height: 72,
  },

  vector: {
    position: 'absolute',
    bottom: -7,
    left: '50%'
  },

  form: {
    padding: 20,
    gap: 18,
    flex: 1,
    flexGrow:1
  },
  label: {
    paddingBottom: 9,
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'left',
    color: black,
  },
  errorText: {
    color: 'red',
    padding: 5
  },
  btnWrapper: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 210
  }
});

export default LoginScreen;
