import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {AppDispatch} from '../../redux/store';
import {useRoute} from '@react-navigation/native';

import { verifyOtpApi } from '../../redux/Slice/IndexApi';
import { useTheme } from '../../theme/ThemeContext';

const VerificationSchema = Yup.object().shape({
  otp1: Yup.string().required('Required'),
  otp2: Yup.string().required('Required'),
  otp3: Yup.string().required('Required'),
  otp4: Yup.string().required('Required'),
});

function VerificationScreen({navigation}:any) {
    const {theme } = useTheme()
  const route = useRoute();
  const {email} = route.params as {email: string};
  const dispatch = useDispatch<AppDispatch>();
  const {loading, error} = useSelector(
    (state: {auth: {loading: boolean; error: string}}) => state.auth,
  );
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleVerifyOTPSubmit = async (values: {
    otp1: string;
    otp2: string;
    otp3: string;
    otp4: string;
  }) => {
    const otp = `${values.otp1}${values.otp2}${values.otp3}${values.otp4}`;
  
    try {
      const result = await dispatch(verifyOtpApi({ email, otp })).unwrap();
      navigation.navigate('ResetPassword', { resetToken: result.resetToken });

    } catch (err) {
      const errorMessage =
        (err as { message?: string }).message || 'OTP verification failed. Please try again.';
      setSubmissionError(errorMessage);
      Alert.alert('Error', errorMessage);
    }
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.formContainer}>
        <View style={styles.headingContainer}>
          <Text style={[styles.subHeading, { color: theme.text }]}>
            We will send you a 4-digit one-time password to your email address.
            Please check it now.
          </Text>
        </View>
        <View style={styles.codeheading}>
          <Text style={[styles.label, { color: theme.text }]}>
            Code sent to <Text style={styles.emailText}>{email}</Text>
          </Text>
        </View>
        <Formik
          initialValues={{otp1: '', otp2: '', otp3: '', otp4: ''}}
          validationSchema={VerificationSchema}
          onSubmit={handleVerifyOTPSubmit}>
          {({handleChange, handleSubmit, values}) => (
            <>
              <View style={styles.otpContainer}>
                <TextInput
                   style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundColor }]}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={handleChange('otp1')}
                  value={values.otp1}
                />
                <TextInput
                   style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundColor }]}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={handleChange('otp2')}
                  value={values.otp2}
                />
                <TextInput
                  style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundColor }]}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={handleChange('otp3')}
                  value={values.otp3}
                />
                <TextInput
                  style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundColor }]}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={handleChange('otp4')}
                  value={values.otp4}
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleSubmit(); 
                }}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Verify</Text>
                )}
              </TouchableOpacity>

              {submissionError && (
                <Text style={styles.error}>{submissionError}</Text>
              )}
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  headingContainer: {
    paddingVertical: 30,
  },
  subHeading: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
    textAlign: 'left',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  codeheading: {
    marginBottom: 15,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
  },
  emailText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 5,
    fontSize: 16,
    textAlign: 'center',
    width: '23%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  button: {
    backgroundColor: '#FF681F',
    paddingVertical: 15,
    borderRadius: 15,
    width: '100%',
    alignSelf: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default VerificationScreen;
