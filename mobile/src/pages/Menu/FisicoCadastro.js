import React from 'react';
import { View, Text, StyleSheet, AsyncStorage, TextInput, TouchableOpacity } from 'react-native';

import api from '../../services/api';

class FisicoCadastro extends React.Component {
    constructor() {
        super();
        this.state = {
            altura: '',
            peso: '',
            medidaCintura: '',
            medidaQuadril: '',
            imc: '',
            aluno_id: '',
        };

        this.buscaDados();
    }

    async handleSubmit() {
        if (this.state.peso === '' || this.state.altura === '' || this.state.medidaCintura === '' || this.state.medidaQuadril === ''
            || this.state.imc === '') {
            Alert.alert(
                "Atenção!",
                "Por favor, preencha todos os campos.",
                [
                    { text: "Voltar", onPress: () => console.log("sem valores") },
                ],
                { cancelable: true }
            );
        }else{
            this.setState({ aluno_id: await AsyncStorage.getItem('aluno_id') });
            let peso = this.state.peso;
            let altura = this.state.altura;
            let medidaCintura = this.state.medidaCintura;
            let medidaQuadril = this.state.medidaQuadril;
            let imc = this.state.imc;
            let aluno_id = this.state.aluno_id;

            const response = await api.post("/saude/register", { peso, altura, medidaCintura, medidaQuadril, imc, aluno_id  });

            if(response.data != null){
                Alert.alert(
                    "Sucesso",
                    "Dados gravados com sucesso!",
                    [
                        { text: "Voltar", onPress: () => console.log("Dados físicos cadastrada") },
                    ],
                    { cancelable: true }
                );
            }

        }
    }


    async buscaDados() {
        this.setState({ aluno_id: await AsyncStorage.getItem('aluno_id') });
    }

    render() {
        return (
            <View style={style.form}>
                <Text style={style.titulo}>Cadastro de dados físicos</Text>

                <TextInput
                    style={style.input}
                    placeholder="Digite o valor da altura"
                    placeholderTextColor="#999"
                    onChangeText={(text) => this.setState({ altura: text })} />

                    
                <TextInput
                    style={style.input}
                    placeholder="Digite o valor do peso"
                    placeholderTextColor="#999"
                    onChangeText={(text) => this.setState({ peso: text })} />

                    
                <TextInput
                    style={style.input}
                    placeholder="Digite a medida da cintura"
                    placeholderTextColor="#999"
                    onChangeText={(text) => this.setState({ medidaCintura: text })} />

                    
                <TextInput
                    style={style.input}
                    placeholder="Digite a medida do quadril"
                    placeholderTextColor="#999"
                    onChangeText={(text) => this.setState({ medidaQuadril: text })} />

                    
                <TextInput
                    style={style.input}
                    placeholder="Digite o IMC"
                    placeholderTextColor="#999"
                    onChangeText={(text) => this.setState({ imc: text })} />

                <TouchableOpacity onPress={() => this.handleSubmit()} style={style.button}>
                    <Text style={style.buttonText}>Cadastrar dados</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    titulo: {
        marginTop: 30,
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        height: 25,
        marginBottom: 5,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 20,
    },

    label: {
        fontWeight: "bold",
        color: "#FFF",
        fontSize: 16,
        marginBottom: 2,
    },

    input: {
        borderWidth: 1,
        borderColor: "#CCC",
        backgroundColor: '#FFF',
        borderRadius: 8,
        shadowOffset: {
            width: 3,
            height: 1
        },
        shadowColor: '#eee',
        paddingHorizontal: 20,
        marginBottom: 20,
        height: 40,
        fontSize: 14,
        color: "#333",
    },

    button: {
        height: 40,
        borderRadius: 3,
        backgroundColor: '#1f2b33',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }

});

export default FisicoCadastro;