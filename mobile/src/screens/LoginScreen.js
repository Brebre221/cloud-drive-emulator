import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../store';
import { authService } from '../services/api';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login(email, password);
      dispatch(setUser(response.user));
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password || !username) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.register(email, password, username);
      dispatch(setUser(response.user));
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      Alert.alert('Sign Up Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎮 Cloud Gaming</Text>
        <Text style={styles.subtitle}>Play Games from the Cloud</Text>
      </View>

      <View style={styles.form}>
        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#666"
            value={username}
            onChangeText={setUsername}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={isSignUp ? handleSignUp : handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Login')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
          <Text style={styles.toggleText}>
            {isSignUp
              ? 'Already have an account? Login'
              : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.demoSection}>
        <Text style={styles.demoTitle}>Demo Credentials:</Text>
        <Text style={styles.demoText}>Email: demo@example.com</Text>
        <Text style={styles.demoText}>Password: demo123</Text>
        <TouchableOpacity
          onPress={() => {
            setEmail('demo@example.com');
            setPassword('demo123');
          }}
        >
          <Text style={styles.fillDemoText}>← Tap to fill</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6B00',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
  },
  form: {
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  button: {
    backgroundColor: '#FF6B00',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleText: {
    color: '#FF6B00',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
  },
  demoSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 40,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B00',
  },
  demoTitle: {
    color: '#FF6B00',
    fontWeight: '600',
    marginBottom: 8,
  },
  demoText: {
    color: '#ddd',
    fontSize: 13,
    marginBottom: 4,
  },
  fillDemoText: {
    color: '#FF6B00',
    fontSize: 13,
    marginTop: 8,
    fontWeight: '500',
  },
});

export default LoginScreen;
