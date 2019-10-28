import React from 'react';
import { View, Text, StyleSheet, AsyncStorage, FlatList } from 'react-native';
import Moment from 'moment';

import api from '../../services/api';

class Notas extends React.Component {
    constructor() {
        super();
        this.state = {
            matricula: '',
            aluno_id: '',
            notas: [],
        };

        this.buscaDados();
    }

    async buscaDados() {
        this.setState({ aluno_id: await AsyncStorage.getItem('aluno_id') });

        // console.log("Escola ID: " + this.state.escola_id);
        // console.log("Aluno ID: " + this.state.aluno_id);

        this.buscaFaltas();
    }

    async buscaFaltas() {
        let aluno_id = this.state.aluno_id;
        const response = await api.get("/notas/notasAluno", { headers: { aluno_id } });
        // console.log(response.data);
        this.setState({ notas: response.data });
    }

    render() {
        return (
            <View style={style.form}>
                <Text style={style.titulo}>Notas</Text>
                <Text style={style.avisoTotal}>{"Total de notas: " + this.state.notas.length }</Text>
                <FlatList
                    data={this.state.notas}
                    renderItem={({ item }) =>{
                        return (
                            <View style={style.item}>
                                <Text style={style.texto}>Nota:</Text>
                                <Text style={style.texto}>{item.nota}</Text>
                            </View>
                          );
                    }
                    }
                    keyExtractor={item => item._id}
                    numColumns={3}
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
        alignItems: 'center',
        backgroundColor: '#ff4545',
        flexGrow: 1,
        margin: 4,
        padding: 20,
        flexBasis: 0,
        maxWidth: '30%'
    },

    texto:{
        justifyContent: 'center',
        textAlign: 'center',
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

export default Notas;