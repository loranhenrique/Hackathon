import React, {useState} from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';


class Notas extends React.Component{
    constructor() {
        super();
        this.state = {
          matricula: '',
          turma_id:'',
          perfil: ''
        };
        this.buscaTeste();
      }

      async buscaTeste(){
        this.setState({ turma_id: await AsyncStorage.getItem('turma_id') });
        console.log("TURMA ID: " + this.state.turma_id);
      }

      render(){
        return (  
            <View style={style.form}>
                <Text style={style.titulo}>Notas 2</Text>
                <Text style={style.titulo}>turma ID {this.state.turma_id}</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    titulo: {
        marginTop: 100,
    },

    container:{
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

    picker:{
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

export default Notas;