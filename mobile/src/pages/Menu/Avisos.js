import React from 'react';
import { View, Text, StyleSheet, AsyncStorage, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

import api from '../../services/api';

class Avisos extends React.Component {
    constructor() {
        super();
        this.state = {
            matricula: '',
            aluno_id: '',
            escola_id: '',
            avisos: [],
        };

        this.buscaDados();
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
                <Text style={style.titulo}>Avisos</Text>
                <FlatList
                    data={this.state.avisos}
                    renderItem={({ item }) =>
                        <ListItem style={style.item}
                            title={"Mensagem: " + item.mensagem}
                            subtitle={"Data do aviso: " + new Date(item.diaCadastro).toLocaleDateString()}
                        />
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

    item: {
        backgroundColor: '#dbdbdb',
        padding: 8,
        marginVertical: 3,
        marginHorizontal: 3,
        borderRadius: 4,
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 20,
    },

});

export default Avisos;