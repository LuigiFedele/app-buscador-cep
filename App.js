import React, { useState,useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';

import api from './src/services/api'

export default function App() {
  const [cep, setCep] =useState('');
  const inputRef = useRef(null);
  const [result, setResult] = useState(null);

  function clear(){
    setCep('');
    inputRef.current.focus();
  }

  async function search(){
    if(cep == ''){
      alert('Preencha o campo com o CEP!')
      setCep('');
      return;
    }

    try{
      const response = await api.get(`/${cep}/json`)
      console.log(response.data);
      setResult(response.data);
      Keyboard.dismiss();
    }catch(error){
      console.log('Error: ' + error );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems:'center'}}>
        <Text style={styles.title}>Digite o cep desejado</Text>
        <TextInput
        style={styles.input}
        placeholder='Ex: 79003241'
        value={cep}
        onChangeText={ (texto) => setCep(texto) }
        keyboardType='numeric'
        ref={inputRef}
        />
      </View>
      <View style={styles.areaButton}>
        <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#1d75cd'}]}
        onPress={ search }
        >
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#FF0000'}]} 
        onPress={ clear }
        >
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      { result &&
        <View style={styles.result}>
          <Text style={styles.resultText}>CEP: {result.cep}</Text>
          <Text style={styles.resultText}>Endereço: {result.logradouro}</Text>
          <Text style={styles.resultText}>Bairro: {result.bairro}</Text>
          <Text style={styles.resultText}>Cidade: {result.localidade}</Text>
          <Text style={styles.resultText}>Estado: {result.uf}</Text>
        </View>
      }
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:15,
  },
  title:{
    marginTop:25,
    marginBottom:15,
    fontSize: 25,
    fontWeight:'bold',
  },
  input:{
    backgroundColor:'#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius:5,
    width:'90%',
    padding:10,
    fontSize:18,
  },
  areaButton:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:15,
    justifyContent:'space-around'
  },
  button:{
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    padding:15,
  },
  buttonText:{
    fontSize:18,
    color:'#fff'
  },
  result:{
    alignItems:'center',
    justifyContent:'center',
    flex:1
  },
  resultText:{
    fontSize:18,
  }
});
