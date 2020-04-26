import * as React from 'react';
import { Button, Image, View, TextInput, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as SQLite from 'expo-sqlite';

class ImagePickerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { img: null, latitude: null, longitude: null, };
    }

    onChangeText(coord, type) {
        console.log('De: ' + type);
        console.log('coord: ' + coord);
        this.state[type] = coord;
        console.log('de state: ' + this.state[type]);
    }

    saveAddress() {
        console.log('saveAddress');
        this.state.db = SQLite.openDatabase('db.db');
        this.state.db.transaction(tx => {
            tx.executeSql(
                "create table if not exists coordenadas (id integer primary key not null, latitude real, longitude real, img text);"
            );
            tx.executeSql(`insert into coordenadas (latitude, longitude, img) values (${this.state.latitude},${this.state.longitude},'${this.state.img}')`);
        });
        console.log('transaction');
        console.log(`insert into coordenadas (latitude, longitude, img) values (${this.state.latitude},${this.state.longitude},'${this.state.img}')`);
    }

    render() {
        let { img } = this.state;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Escull una imatge de la gal·leria" onPress={this._pickImage} />
                {img && <Image source={{ uri: img }} style={{ width: 200, height: 200 }} />}
                <View>
                    <Text>Latitud: </Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => this.onChangeText(text, 'latitude')}
                        value={41.4103908}
                    />
                </View>
                <View>
                    <Text>Longitud: </Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => this.onChangeText(text, 'longitude')}
                        value={2.1943033}
                    />
                </View>
                <TouchableOpacity style={styles.Button} onPress={() => this.saveAddress()}>
                    <Text style={styles.ButtonText}>Guardar coordenades i imatge</Text>
                </TouchableOpacity>
            </View>
        );
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                this.setState({ img: result.uri });
            }
            
            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };
}

const styles = {
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
}

export default ImagePickerComponent;