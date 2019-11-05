import React from 'react';
import { View, Text, StyleSheet, AsyncStorage, FlatList, TouchableHighlight } from 'react-native';
import Moment from 'moment';

import api from '../../services/api';
import { SearchBar } from 'react-native-elements';

class ListaAlunosResponsavel extends React.Component {
    constructor() {
        super();
        this.state = {
            listaAlunos: [],
            termo: '',
            alunoIdCadastroAgenda: '',
            responsavel_id: '',
        };

        this.arrayHolder = [''];
        this.buscaAlunos();
    }

    async buscaAlunos() {
        this.setState({ responsavel_id: await AsyncStorage.getItem('responsavel_id') });
        let responsavel_id = this.state.responsavel_id;
        const response = await api.post("/aluno/listAlunoResponsavel", responsavel_id);
        this.arrayHolder = response.data;
        //console.log(response.data);
        this.setState({ listaAlunos: response.data });
    }

    cabecalhoPesquisa = () => {
        return <SearchBar
            placeholder="Pesquisar por nome"
            lightTheme round
            onChangeText={text => this.buscaAlunoNome(text)}
            value={this.state.termo} />
    }

    buscaAlunoNome(text) {
        const novoVet = this.arrayHolder.filter((item) => {
            return item.nome === text;
        });

        this.setState({ listaAlunos: novoVet });
        this.setState({ termo: text });
    }

    async cadastrarAgenda(params) {
        this.setState({alunoIdCadastroAgenda: params});
        await AsyncStorage.setItem('alunoIdCadastroAgenda', params);
        console.log("teste");

        const { navigate } = this.props.navigation;
        navigate('VacinacaoCadastro');
    }

    render() {
        return (
            <View style={style.form}>
                <Text style={style.titulo}>Agenda vai/vem</Text>
                <Text style={style.titulo}>Selecione um aluno</Text>
                <FlatList
                    data={this.state.listaAlunos}
                    renderItem={({ item }) => {
                        return (
                            
                                <TouchableHighlight onPress={() => this.cadastrarAgenda(item._id)}>
                                    <View style={style.item}>
                                        <Text style={style.texto}>{"Nome: " + item.nome}</Text>
                                        <Text style={style.texto}>{"Matrícula: " + item.matricula}</Text>
                                    </View>
                                </TouchableHighlight>
                        );
                    }
                    }
                    keyExtractor={item => item._id}
                    ListHeaderComponent={this.cabecalhoPesquisa}
                />
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

    avisoTotal: {
        marginTop: 40,
        fontSize: 16,
        textAlign: 'center',
    },

    item: {
        backgroundColor: '#f7f7f7',
        flexGrow: 1,
        margin: 0,
        padding: 10,
    },

    texto: {
        fontWeight: 'bold',
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 20,
    },

    itemEmpty: {
        backgroundColor: "transparent"
    },

});

export default ListaAlunosResponsavel;