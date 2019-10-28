import React, { useState } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Picker, TextInput, TouchableOpacity } from 'react-native';

import api from '../../services/api';

class CadastraAgenda extends React.Component {
    constructor() {
        super();
        this.state = {
            aluno_matricula: '',
            professor_id: '',
            tipoAviso: '',
            assunto: '',
            dia: '',
            agenda_id: '',
        };

        this.buscaIds();
    }

    async buscaIds() {
        this.setState({ aluno_matricula: await AsyncStorage.getItem('alunoIdCadastroAgenda') });
        this.setState({ professor_id: await AsyncStorage.getItem('professor_id') });

        console.log(this.state.aluno_matricula);
        console.log(this.state.professor_id);
    }

    async handleSubmit() {
        const { navigate } = this.props.navigation;
        let id = 11;
        let dia = Date.now();
        let assunto = this.state.assunto;
        let tipoAviso = this.state.tipoAviso;
        let arquivo = '';
        let aluno_matricula = this.state.aluno_matricula;
        let professor_id = this.state.professor_id;
        response = await api.post("/agenda/register", { id, dia, assunto, tipoAviso, arquivo }, { headers: { aluno_matricula, professor_id } });

        console.log(response.data);
    }

    render() {
        return (
            <View style={style.form}>
                <Text style={style.titulo}>Cadastrar agenda vai/vem</Text>

                <Text style={style.label}>Selecione o seu tipo de aviso</Text>
                <Picker style={style.picker}
                    selectedValue={this.state.tipoAviso}
                    onValueChange={(itemValue) => {
                        this.setState({ tipoAviso: itemValue });
                    }}>
                    <Picker.Item label="Selecione..." value="vazio" />
                    <Picker.Item label="Comportamento" value="comportamento" />
                    <Picker.Item label="Desempenho" value="desempenho" />
                    <Picker.Item label="Saída antecipada" value="saida" />
                    <Picker.Item label="Outros" value="outros" />
                </Picker>

                <Text style={style.label}>Escreva a ocorrência</Text>
                <TextInput
                    style={style.input}
                    placeholder="Informe o que aconteceu"
                    placeholderTextColor="#999"
                    multiline={true}
                    onChangeText={(text) => this.setState({ assunto: text })} />

                <TouchableOpacity onPress={() => this.handleSubmit()} style={style.button}>
                    <Text style={style.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

            </View>


        );
    }
}

const style = StyleSheet.create({
    titulo: {
        marginTop: 100,
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
    
    titulo: {
        marginTop: 30,
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        height: 25,
        marginBottom: 5,
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

export default CadastraAgenda;