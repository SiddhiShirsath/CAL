import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const Calculator = () => {
  const [display, setDisplay] = useState('0');

  const handlePress = (value: string) => {
    setDisplay((prev) => {
      if (prev === '0') {
        return value;
      }
      return prev + value;
    });
  };

  const handleClear = () => {
    setDisplay('0');
  };

  const handleCalculate = () => {
    try {
      setDisplay(eval(display).toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  const renderButton = (value: string, color: string = '#8A2BE2') => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={() => handlePress(value)}
    >
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{display}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {renderButton('7')}
        {renderButton('8')}
        {renderButton('9')}
        {renderButton('/')}
        {renderButton('4')}
        {renderButton('5')}
        {renderButton('6')}
        {renderButton('*')}
        {renderButton('1')}
        {renderButton('2')}
        {renderButton('3')}
        {renderButton('-')}
        {renderButton('0')}
        {renderButton('.')}
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleClear}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
        {renderButton('+')}
      </View>
      <TouchableOpacity style={[styles.button, styles.equalsButton]} onPress={handleCalculate}>
        <Text style={styles.buttonText}>=</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>Made by Siddhi</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082',
    justifyContent: 'flex-end',
  },
  display: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
  },
  displayText: {
    fontSize: 48,
    color: 'white',
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    width: '22%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#8A2BE2',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
  clearButton: {
    backgroundColor: '#9370DB',
  },
  equalsButton: {
    width: '95%',
    aspectRatio: 4,
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: '#32CD32',
  },
  footer: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
});

export default Calculator;

