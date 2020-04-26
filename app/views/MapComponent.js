import React from 'react';
import { StyleSheet, Dimensions, Text, View, Button } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, UrlTile } from 'react-native-maps';

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
    }
});

const guardarCoordenada = () => {
    console.log('Guardar coordenada pressed');
}

class MapComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            urlTemplate: 'http://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> Mapa </Text>
                <MapView
                    style={styles.mapStyle}
                    initialRegion={{
                        latitude: 41.3948976,
                        longitude: 2.0787282,
                        latitudeDelta: 2.2,
                        longitudeDelta: 2.2,
                    }}>
                    {matches.map((marker, index) => {
                        return (
                            <MapMarker
                                key={index}
                                mapMarker={marker}
                                handlePress={() => {
                                    this.map.animateToRegion({
                                        latitude: marker.location.latlng.latitude,
                                        longitude: marker.location.latlng.longitude
                                    }, 100)
                                }}
                            />
                        )
                    })}
                </MapView>
                <Button title="Guardar coordenada" onPress={guardarCoordenada} />
            </View>
        );
    }
}

export default MapComponent;