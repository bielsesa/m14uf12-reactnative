import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class HomeComponent extends React.Component {
    state = {}
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Pantalla Home</Text>
                <Button
                    title="SQLite"
                    onPress={() => this.props.navigation.navigate('SQLite')}
                />
                <Button
                    title="Map"
                    onPress={() => this.props.navigation.navigate('MapComponent')}
                />
                <Button
                    title="Image Picker"
                    onPress={() => this.props.navigation.navigate('ImagePickerComponent')}
                />
                <Button
                    title="Camera"
                    onPress={() => this.props.navigation.navigate('CameraComponent')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BADA55'
    }
})

export default HomeComponent;