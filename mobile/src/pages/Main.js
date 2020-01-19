import React , { useState, useEffect }from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import  MapView, { Marker, Callout }  from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';


import api from '../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../services/socket';


function Main({ navigation }){

    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');


    useEffect(() =>{
        async function loadInitialPosition(){
            const { granted } = await requestPermissionsAsync();

            if(granted){
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })

            }
        }

        loadInitialPosition();
    },
     []);

    useEffect(() =>{
        subscribeToNewDevs(dev => setDevs([...devs, dev]));
    }, [devs]);

     function setupWebSocket(){
        disconnect();

        const { latitude, longitude } = currentRegion;

        connect(
            latitude,
            longitude,
            techs,
        );

        
     }

     async function loadDevs(){
         const { latitude, longitude } = currentRegion;

         const response = await api.get('/search', {
             params: {
                 latitude,
                 longitude,
                 techs
             }
         });

        
         setDevs(response.data.devs);
         setupWebSocket();

     }

     function handleRegionChanged(region){
        setCurrentRegion(region);
     }

     if(!currentRegion){
         return null;
     }

    return (
        <>
            <MapView onRegionChangeComplete={handleRegionChanged} 
            initialRegion={currentRegion} 
            style={styles.map}
            >
                {devs.map(dev =>(
                    <Marker key={dev._id} coordinate={{ 
                        longitude: dev.location.coordinates[0], 
                        latitude: dev.location.coordinates[1]}}>
                        <Image style={styles.avatar} source={{ uri: dev.avatar_url }}/>

                        <Callout onPress={() =>{
                            navigation.navigate('Profile', { github_username: dev.github_username });
                        }}>
                            <View style={styles.callout}>
                            <Text style={styles.devName}>{dev.name}</Text>
                            <Text style={styles.devBio}>{dev.bio}</Text>
                            <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>

                    </Marker>
                ))}
            </MapView>

            <KeyboardAvoidingView keyboardVerticalOffset={50} behavior="padding" enabled style={styles.searchForm}>
                <TextInput 
                style={styles.searchInput}
                placeholder='Buscar devs por techs...'
                placeholderTextColor='gray'
                autoCapitalize='words'
                autoCorrect={false}
                value={techs}
                onChangeText={setTechs}
                />

                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name='my-location' size={20} color='white'/>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </>
    );
}


const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    },

    callout:{
        width: 260,
        height: 90,
        
    },

    devName:{
        fontWeight: 'bold',
        color: '#7d40e7',
        fontSize: 15,
    },

    devBio:{
        fontSize: 9,
        color: 'gray',
        marginTop: 5,
        marginBottom: 1
    },

    devTechs:{
        marginTop: 5,
    },

    searchForm:{
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 100,
        flexDirection: 'row'
    },

    searchInput:{
        flex: 1,
        height: 50,
        backgroundColor: 'white',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 5
    },

    loadButton:{
        color: 'white',
        width: 50,
        height: 50,
        backgroundColor: '#7d40e7',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    }
})

export default Main;