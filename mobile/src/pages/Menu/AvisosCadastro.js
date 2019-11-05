import React from 'react';
import { View, Text, StyleSheet, AsyncStorage, TextInput, TouchableOpacity } from 'react-native';

import api from '../../services/api';

class AvisosCadastro extends React.Component {
    constructor() {
        super();
        this.state = {
            mensagem: '',
            filename: '',
            escola_id: '',
        };

        //this.buscaDados();
    }

    async handleSubmit() {
        if (this.state.mensagem === '') {
            Alert.alert(
                "Atenção!",
                "Por favor, digite uma mensagem.",
                [
                    { text: "Voltar", onPress: () => console.log("sem mensagem") },
                ],
                { cancelable: true }
            );
        }else{
            this.setState({ escola_id: await AsyncStorage.getItem('escola_id') });
            let mensagem = this.state.mensagem;
            let filename = this.state.filename;
            let escola_id = this.state.escola_id;

            const response = await api.post("/avisos/register", { headers: { escola_id }, mensagem,  });

            console.log(response.data);

        }
    }


    async buscaDados() {
        this.setState({ escola_id: await AsyncStorage.getItem('escola_id') });
        this.setState({ aluno_id: await AsyncStorage.getItem('aluno_id') });

        // console.log("Escola ID: " + this.state.escola_id);
        // console.log("Aluno ID: " + this.state.aluno_id);

        this.buscaAvisos();
    }

    async buscaAvisos() {
        let aluno_id = this.state.aluno_id;
        const response = await api.get("/avisos/EscolaAviso", { headers: { aluno_id } });
        // console.log(response.data);
        this.setState({ avisos: response.data });
    }

    render() {
        return (
            <View style={style.form}>
                <Text style={style.titulo}>Cadastro de avisos</Text>

                <TextInput
                    style={style.input}
                    placeholder="Digite o aviso a ser enviado"
                    placeholderTextColor="#999"
                    onChangeText={(text) => this.setState({ mensagem: text })} />

                <TouchableOpacity onPress={() => this.handleSubmit()} style={style.button}>
                    <Text style={style.buttonText}>Enviar aviso</Text>
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

export default AvisosCadastro;