import React from 'react';
import { View, Text, StyleSheet, AsyncStorage, FlatList, TouchableHighlight } from 'react-native';
import Moment from 'moment';

import api from '../../services/api';
import { SearchBar } from 'react-native-elements';

class Agenda extends React.Component {
    constructor() {
        super();
        this.state = {
            listaAlunos: [],
            termo: '',
            alunoIdCadastroAgenda: '',
        };

        this.arrayHolder = [''];
        this.buscaAlunos();
    }

    async buscaAlunos() {
        const response = await api.get("/aluno/listAll");
        this.arrayHolder = response.data;
        console.log(response.data);
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
        console.log(params);

        const { navigate } = this.props.navigation;
        navigate('CadastraAgenda');
    }

    render() {
        return (
            <View style={style.form}>
                <Text style={style.titulo}>Agenda vai/vem</Text>
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

export default Agenda;