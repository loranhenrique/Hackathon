import React from 'react';
import { View, Text, StyleSheet, AsyncStorage, TextInput, TouchableOpacity } from 'react-native';

import api from '../../services/api';

class VacinacaoCadastro extends React.Component {
    constructor() {
        super();
        this.state = {
            nome: '',
            dataVacinacao: '',
            aluno_id: '',
        };

        this.buscaDados();
    }

    async handleSubmit() {
        if (this.state.nome === '' || this.state.dataVacinacao === '') {
            Alert.alert(
                "Atenção!",
                "Por favor, preencha todos os campos.",
                [
                    { text: "Voltar", onPress: () => console.log("sem valores") },
                ],
                { cancelable: true }
            );
        }else{
            this.setState({ aluno_id: await AsyncStorage.getItem('alunoIdCadastroAgenda') });
            let nome = this.state.peso;
            let dataVacinacao = this.state.altura;
            let aluno_id = this.state.aluno_id;
            
            const response = await api.post("/vacina/register", { nome, dataVacinacao, aluno_id  });

            if(response.data != null){
                Alert.alert(
                    "Sucesso",
                    "Dados gravados com sucesso!",
                    [
                        { text: "Voltar", onPress: () => console.log("Vacinação cadastrada") },
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
                    placeholder="Digite qual foi a vacina"
                    placeholderTextColor="#999"
                    onChangeText={(text) => this.setState({ nome: text })} />

                    
                <TextInput
                    style={style.input}
                    placeholder="Digite a data da vacinação"
                    placeholderTextColor="#999"
                    onChangeText={(text) => this.setState({ dataVacinacao: text })} />

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

export default VacinacaoCadastro;