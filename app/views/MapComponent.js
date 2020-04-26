import React from 'react';
import { StyleSheet, Dimensions, Text, View, Button, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, UrlTile } from 'react-native-maps';
import * as SQLite from 'expo-sqlite';

import MapViewDirections from 'react-native-maps-directions';

const origin = { latitude: 41.4085324, longitude: 2.202106 };
const destination = { latitude: 41.4103908, longitude: 2.1943033 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyCHxJJeGEp1yveNJSDi6wwpZxPn0KcndYs';


const randomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}


export default class MapComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: 41.3948976,
                longitude: 2.0787282,
                latitudeDelta: 2.2,
                longitudeDelta: 2.2,
            },
            markers: {
                coordinate: {
                    latitude: 4,
                    longitude: 4,
                },
                key: 1,
                color: randomColor(),
            }
        };
    }

    saveAddress() {
        console.log(JSON.stringify(this.state.markers.coordinate.latitude));
        console.log(JSON.stringify(this.state.markers.coordinate.longitude));

        this.state.db = SQLite.openDatabase('db.db');
        this.state.db.transaction(tx => {
            tx.executeSql("drop table if exists coordenadas");
            tx.executeSql(
                "create table if not exists coordenadas (id integer primary key not null, latitude real, longitude real);"
            );
            console.log('transacció crear taula');
        });

        this.state.db.transaction(
            tx => {
                tx.executeSql(`insert into coordenadas (latitude, longitude) values (${this.state.markers.coordinate.latitude},${this.state.markers.coordinate.longitude})`);
            }
        );
    }


    onMapPress(e) {
        this.setState({
            markers:
            {
                coordinate: e.nativeEvent.coordinate,
                key: 1,
                color: randomColor(),
            },
        });


    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <MapView
                    provider={this.props.provider}
                    style={styles.mapStyle}
                    initialRegion={this.state.region}
                    onPress={e => this.onMapPress(e)}
                >
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                    />
                    <Marker
                        key={this.state.markers.key}
                        coordinate={this.state.markers.coordinate}
                        pinColor={this.state.markers.color}
                    >
                        <View style={styles.marker}>
                            <Text style={styles.text}>
                                {JSON.stringify(this.state.markers.coordinate)}</Text>
                        </View>
                    </Marker>
                </MapView>
                <TouchableOpacity style={styles.Button} onPress={() => this.saveAddress()}>
                    <Text style={styles.ButtonText}>Guardar coordenadas</Text>
                </TouchableOpacity>




            </View >

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 100,
    },
    button: {
        flex: 1
    },
    Button: {
        width: 80,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'black',
        alignItems: 'center'
    },
    ButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    }
});

