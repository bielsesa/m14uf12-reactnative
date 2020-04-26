import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons'

const CameraComponent = () => {
    const [camera, setCamera] = useState({
        hasCameraPermission: true,
        type: Camera.Constants.Type.back,
    });
    const camRef = useRef(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [open, setOpen] = useState(false);

    // useEffect(async () => {
    //     const { status } = await Permissions.askAsync(Permissions.CAMERA);

    //     setCamera(prevState => ({ ...prevState, hasCameraPermission: status === 'granted' }));
    // }, []);

    async function askPermissions() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        setCamera(prevState => ({ ...prevState, hasCameraPermission: status === 'granted' }));
    }

    async function takePicture() {
        if (camRef) {
            const data = await camRef.current.takePictureAsync();
            setCapturedPhoto(data.uri);
            setOpen(true);
            console.log(data);
        }
    }

    askPermissions();

    if (camera.hasCameraPermission === null) {
        return <View />
    } else if (camera.hasCameraPermission === false) {
        return <Text>No access to camera granted</Text>
    } else {
        return (
            <View style={{ flex: 1 }}>
                <Camera
                    style={{ flex: 1 }}
                    type={camera.type}
                    ref={camRef}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                            style={{
                                flex: 0.1,
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                setCamera({
                                    type:
                                        camera.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
                                });
                            }}>
                            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                {' '}
                    Flip{' '}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
                <TouchableOpacity style={styles.button} onPress={takePicture}>
                    <FontAwesome name="camera" size={23} color="#FFF" />
                </TouchableOpacity>
                {capturedPhoto &&
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={open}
                    >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                            <TouchableOpacity style={{ margin: 10 }} onPress={() => setOpen(false)}>
                                <FontAwesome name="window-close" size={50} color="#FF0000" />
                            </TouchableOpacity>

                            <Image
                                style={{ width: '100%', height: 300, borderRadius: 20 }}
                                source={{ uri: capturedPhoto }}
                            />
                        </View>
                    </Modal>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#bada55'
    }
});

export default CameraComponent;