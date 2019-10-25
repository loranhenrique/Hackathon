import React, { useState } from 'react';
import { View, AsyncStorage, Alert, Picker, KeyboardAvoidingView, ImageBackground, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';
import image from '../../assets/fundo_login.jpg';
import logo from '../../assets/FaminSchool.png';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            matricula: '',
            senha: '',
            perfil: ''
        };
    }

    msgErro(){
        Alert.alert(
            "Não foi possível acessar!",
            "Os dados informados não estão corretos",
            [
                { text: "Voltar", onPress: () => console.log("Dados de acesso incorretos!") },
            ],
            { cancelable: true }
        );
    }

    async handleSubmit() {
        if (this.state.perfil === 'vazio' || this.state.perfil === '') {
            Alert.alert(
                "Atenção!",
                "Por favor, selecione um perfil.",
                [
                    { text: "Voltar", onPress: () => console.log("sem perfil selecionado") },
                ],
                { cancelable: true }
            );
        } else {
            await AsyncStorage.setItem('perfil', this.state.perfil);
            await AsyncStorage.setItem('matricula', this.state.matricula);
            var response = null;

            let matricula = this.state.matricula;
            let senha = this.state.senha;
            const { navigate } = this.props.navigation;

            switch (this.state.perfil) {
                case "aluno":
                    try {
                        response = await api.post("/aluno/authenticate", { matricula, senha });
                        var situacao = response.data.aluno.situacao;

                        if (situacao === 'matriculado') {
                            navigate('menuAluno');
                        }
                    } catch (err) {
                        console.log(err);
                        this.msgErro();
                    }
                    break;
                case "professor":
                        try {
                            response = await api.post("/professor/authenticate", { matricula, senha });
                            console.log(response);
                            if(response != null){
                                navigate('menuProfessor');
                            }
                        } catch (err) {
                            console.log(err);
                            this.msgErro();
                        }
                    break;
                case "escola":
                        try {
                            response = await api.post("/escola/authenticate", { matricula, senha });
                            console.log(response);
                            if(response != null){
                                navigate('menuEscola');
                            }
                        } catch (err) {
                            console.log(err);
                            this.msgErro();
                        }
                    break;
                case "responsavel":
                        try {
                            response = await api.post("/responsavel/authenticate", { matricula, senha });
                            console.log(response);
                            if(response != null){
                                navigate('menuResponsavel');
                            }
                        } catch (err) {
                            console.log(err);
                            this.msgErro();
                        }
                    break;
            }

            // console.log("matricula: " + this.state.matricula);
            // console.log("senha: " + this.state.senha);
            // console.log("perfil: " + this.state.perfil);
        }
    }

    render() {
        return (
            <ImageBackground source={image} style={style.image}>
                <KeyboardAvoidingView behavior="padding" style={style.container}>
                    <Image source={logo} style={style.logo}></Image>

                    <View style={style.form}>
                        <Text style={style.label}>Selecione o seu tipo de acesso</Text>
                        <Picker style={style.picker}
                            selectedValue={this.state.perfil}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({ perfil: itemValue });
                            }}>
                            <Picker.Item label="Selecione..." value="vazio" />
                            <Picker.Item label="Aluno" value="aluno" />
                            <Picker.Item label="Escola" value="escola" />
                            <Picker.Item label="Professor" value="professor" />
                            <Picker.Item label="Responsável" value="responsavel" />
                        </Picker>

                        <Text style={style.label}>Martícula</Text>
                        <TextInput
                            style={style.input}
                            placeholder="Informe sua matrícula"
                            placeholderTextColor="#999"
                            onChangeText={(text) => this.setState({ matricula: text })} />

                        <Text style={style.label}>Senha</Text>
                        <TextInput
                            style={style.input}
                            placeholder="Informe sua senha"
                            placeholderTextColor="#999"
                            textContentType="password"
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({ senha: text })} />

                        <TouchableOpacity onPress={() => this.handleSubmit()} style={style.button}>
                            <Text style={style.buttonText}>Acessar</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const style = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        marginBottom: 50,
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 20,
    },

    picker: {
        height: 50,
        paddingHorizontal: 30,
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: '#EEE',
    },

    label: {
        fontWeight: "bold",
        color: "#333",
        marginBottom: 2,
    },

    input: {
        borderWidth: 1,
        borderColor: "#CCC",
        backgroundColor: '#FFF',
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

export default Login;