import React from 'react';
import { View, Text, StyleSheet, AsyncStorage, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

import api from '../../services/api';

class Faltas extends React.Component {
    constructor() {
        super();
        this.state = {
            matricula: '',
            aluno_id: '',
            faltas: [],
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
        const response = await api.get("/faltas/faltasaluno", { headers: { aluno_id } });
        // console.log(response.data);
        this.setState({ faltas: response.data });
    }

    render() {
        const columns = 3;
        function createRows(data, columns) {
            const rows = Math.floor(data.length / columns); // [A]
            let lastRowElements = data.length - rows * columns; // [B]  while (lastRowElements !== columns) { // [C]

            while (lastRowElements !== columns){
                lastRowElements += 1; // [E]
                data.push({ // [D]
                id: `empty-${lastRowElements}`,
                dia: `empty-${lastRowElements}`,
                empty: true
              });
            }
            return data; // [F]
          }

        return (
            <View style={style.form}>
                <Text style={style.titulo}>Faltas</Text>
                <FlatList
                    data={createRows(this.state.faltas, columns)}
                    renderItem={({ item }) =>{
                        if (item.empty) {
                            return <View style={[style.item, style.itemEmpty]} />;
                          }

                        return (
                            <View style={style.item}>
                              <Text style={style.texto}>{"Dia: " + new Date(item.dia).toLocaleDateString()}</Text>
                            </View>
                          );
                    }
                    }
                    keyExtractor={item => item._id}
                    numColumns={columns}
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
        alignItems: 'center',
        backgroundColor: '#ff4545',
        flexGrow: 1,
        margin: 4,
        padding: 20,
        flexBasis: 0,
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

export default Faltas;