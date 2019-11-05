import React from 'react';
import { View, Text, StyleSheet, AsyncStorage, FlatList, TouchableHighlight } from 'react-native';
import Moment from 'moment';

import api from '../../services/api';
import { SearchBar } from 'react-native-elements';

class AgendaAluno extends React.Component {
    constructor() {
        super();
        this.state = {
            listaAgenda: [],
            aluno_matricula: '',
        };

        this.buscaAgenda();
    }

    async buscaAgenda() {
        this.setState({ aluno_matricula: await AsyncStorage.getItem('aluno_id') });
        let aluno_matricula = this.state.aluno_matricula;
        const response = await api.get("/agenda/agendaAluno", {headers : {aluno_matricula} });
        this.setState({ listaAgenda: response.data });
    }

    render() {
        return (
            <View style={style.form}>
                <Text style={style.titulo}>Agenda vai/vem</Text>
                <FlatList
                    data={this.state.listaAgenda}
                    renderItem={({ item }) => {
                        return (
                            <View style={style.item}>
                                <Text style={style.texto}>{"Dia: " + Moment(item.dia).format('DD/MM/YY')}</Text>
                                <Text style={style.texto}>{"Mensagem: " + item.assunto}</Text>
                            </View>
                        );
                    }
                    }
                    keyExtractor={item => item._id}
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

export default AgendaAluno;