import React from 'react';
import { View, AsyncStorage, Text, StyleSheet } from 'react-native';

import api from '../../services/api';

class DadosAluno extends React.Component {

    constructor() {
        super();
        this.state = {
            matricula: '',
            dadosPessoais: '',
            dadosResponsavel: '',
            dadosTurma: '',
            dadosSerie: '',
            dadosEscola: '',
            aluno_id: '',
            series_id: '',
            turma_id: '',
            escola_id: '',
        };
        this.buscaDadosPessoais();
    }

    async buscaDadosPessoais() {
        this.setState({ matricula: await AsyncStorage.getItem('matricula') });

        let matricula = this.state.matricula;
        //console.log("Matricula: " + matricula);
        const response = await api.post("/aluno/listAluno", { matricula });

        //Quebra o retorno do response em partes
        this.setState({ dadosPessoais: response.data });
        this.setState({ dadosResponsavel: response.data.responsavel_id });
        this.setState({ dadosTurma: response.data.turma_id });
        this.setState({ series_id: response.data.turma_id.series_id });
        this.setState({ aluno_id: response.data._id });

        //Busca informações da escola e turma
        let _id = this.state.series_id;
        const responseEscola = await api.post("/series/listSerie", { _id });
        this.setState({ dadosSerie: responseEscola.data }); //Objeto series
        this.setState({ dadosEscola: responseEscola.data.escola_id }); //Objeto escola_id
        this.setState({ escola_id: responseEscola.data.escola_id._id }); 

        await AsyncStorage.setItem('aluno_id', this.state.aluno_id);
        await AsyncStorage.setItem('series_id', this.state.series_id);
        await AsyncStorage.setItem('turma_id', this.state.dadosTurma._id);
        await AsyncStorage.setItem('escola_id', this.state.escola_id);
    }

    render() {
        return (
            <View style={style.container}>
                <Text style={style.titulo}>Dados pessoais</Text>

                <View style={style.formDados}>
                    <Text style={style.label}>Matrícula: </Text>
                    <Text style={style.textoDados}>{this.state.matricula}</Text>
                </View>

                <View style={style.formDados}>
                    <Text style={style.label}>Nome: </Text>
                    <Text style={style.textoDados}>{this.state.dadosPessoais.nome}</Text>
                </View>

                <View style={style.formDados}>
                    <Text style={style.label}>E-mail: </Text>
                    <Text style={style.textoDados}>{this.state.dadosPessoais.email}</Text>
                </View>

                <View style={style.formDados}>
                    <Text style={style.label}>Telefone: </Text>
                    <Text style={style.textoDados}>{this.state.dadosPessoais.telefone}</Text>
                </View>

                <View style={style.formDados}>
                    <Text style={style.label}>Endereço: </Text>
                    <Text style={style.textoDados}>{this.state.dadosPessoais.dataNasc}</Text>
                </View>


                <Text style={style.titulo}>Dados do Responsável</Text>

                <View style={style.formDados}>
                    <Text style={style.label}>Nome: </Text>
                    <Text style={style.textoDados}>{this.state.dadosResponsavel.nome}</Text>
                </View>

                <View style={style.formDados}>
                    <Text style={style.label}>Telefone: </Text>
                    <Text style={style.textoDados}>{this.state.dadosResponsavel.telefone}</Text>
                </View>

                <View style={style.formDados}>
                    <Text style={style.label}>E-mail: </Text>
                    <Text style={style.textoDados}>{this.state.dadosResponsavel.email}</Text>
                </View>

                <View style={style.formDados}>
                    <Text style={style.label}>Endereço: </Text>
                    <Text style={style.textoDados}>{this.state.dadosResponsavel.logradouro}</Text>
                </View>

                <Text style={style.titulo}>Dados da Escola</Text>

                <View style={style.formDados}>
                    <Text style={style.label}>Escola: </Text>
                    <Text style={style.textoDados}>{this.state.dadosEscola.nome}</Text>
                </View>

                <View style={style.formDados}>
                    <Text style={style.label}>Endereço: </Text>
                    <Text style={style.textoDados}>{this.state.dadosEscola.endereco} - {this.state.dadosEscola.bairro}</Text>
                </View>

                <View style={style.formDados}>
                    <Text style={style.label}>Série: </Text>
                    <Text style={style.textoDados}>{this.state.dadosSerie.nome}</Text>
                </View>

                <View style={style.formDados}>
                    <Text style={style.label}>Turma: </Text>
                    <Text style={style.textoDados}>{this.state.dadosTurma.nome}</Text>
                </View>

            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        padding: 8,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },

    formDados: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
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

    label: {
        fontWeight: "bold",
        color: "#333",
    },

    textoDados: {
        color: "#333",
        fontStyle: 'italic',
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

export default DadosAluno;