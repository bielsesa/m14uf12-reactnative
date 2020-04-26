import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';

class SQLiteComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: null,
            datos: null,
            db: null
        };

        this.state.db = SQLite.openDatabase('db.db');
        this.state.db.transaction(tx => {
            /* tx.executeSql("drop table if exists coordenadas"); */
            tx.executeSql(
                "create table if not exists coordenadas (id integer primary key not null, latitud real, longitud real);"
            );
            console.log('transacció crear taula');
            tx.executeSql("select * from coordenadas", [], (_, { rows }) => {
                console.log(JSON.stringify(rows));
                this.setState({ datos: JSON.stringify(rows) });
                console.log("Los datos son los siguientes= " + this.state.datos)
            });

        });
    }

    inserirDadesProva = () => {
        console.log('abans d`inserció dades');
        this.state.db.transaction(
            tx => {
                tx.executeSql("insert into coordenadas (latitude, longitude) values (41.4388402,2.2396605)");
                tx.executeSql("insert into coordenadas (latitude, longitude) values (41.42241,2.1993313)");
                tx.executeSql("select * from coordenadas", [], (_, { rows }) => {
                    console.log(JSON.stringify(rows));
                    this.setState({ datos: JSON.stringify(rows) });
                    console.log("Los datos son los siguientes= " + this.state.datos)
                });
            }
        );
        console.log('inserció dades');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titol}>Punts guardats a SQLite</Text>
                <Text style={styles.puntsContainer}>Punts: {this.state.datos}</Text>
                <Button title='Inserir dades de prova' onPress={this.inserirDadesProva} style={styles.button} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titol: {
        flex: 1,
        fontSize: 32,
        alignSelf: 'center',
        padding: 15
    },
    puntsContainer: {
        flex: 4,
        fontSize: 16,
        alignSelf: 'stretch',
        padding: 30,
    },
    button: {
        flex: 1,
        alignSelf: 'center',
        margin: 10,
    }
})

export default SQLiteComponent;