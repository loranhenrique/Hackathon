import React, {useState} from 'react';
import { View, KeyboardAvoidingView, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';

export default function Login() {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');

    async function handleSubmit(){
        const response = await api.post("/aluno/authenticate", {matricula, senha});

        console.log(response.data);
    }
  return ( 
    <KeyboardAvoidingView behavior='padding' style={style.container}>

        <View style={style.form}>
            <Text style={style.label}>Martícula</Text>
            <TextInput
                style={style.input}
                placeholder="Informe sua matrícula"
                placeholderTextColor="#999"
                value={matricula}
                onChangeText={setMatricula} /> 
            
            <Text style={style.label}>Senha</Text>
            <TextInput
                style={style.input}
                placeholder="Informe sua senha"
                placeholderTextColor="#999"
                textContentType="password"
                value={senha}
                onChangeText={setSenha} />

                <TouchableOpacity onPress={handleSubmit} style={style.button}>
                    <Text style={style.buttonText}>Acessar</Text>
                </TouchableOpacity>
        </View>
        
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    
    label: {
        fontWeight: "bold",
        color: "#333",
        marginBottom: 2,
    },

    input: {
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 3,
        paddingHorizontal: 20, 
        marginBottom: 20,
        height: 40,
        fontSize: 14,
        color: "#333",
    },

    button: {
        height: 40,
        borderRadius: 3,
        backgroundColor: '#CCC',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});