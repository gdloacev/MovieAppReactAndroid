import React from 'react';
import {IconButton} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Movie from '../screens/Movie';
import News from '../screens/News';
import Popular from '../screens/Popular';
import Search from '../screens/Search';

const Stack = createStackNavigator();

export default function StackNavigation(props){

    const {navigation} = props;

    const buttonLeft = (screen = '') => {

        switch(screen){
            case 'Search':
            case 'Movie':
                return (
                    <IconButton icon='arrow-left' onPress={() => {
                        navigation.goBack();
                    }} />
                );
            default:
                return (
                    <IconButton icon='menu' onPress={() => {
                        navigation.openDrawer();
                    }} />
                );
        }        
    }

    const buttonRight = () => {
        return (
            <IconButton icon='magnify' onPress={() => {
                navigation.navigate('Search');
            }} />
        );
    }

    return(
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} options={{title: 'The Movie App', headerLeft: () => buttonLeft(), headerRight: () => buttonRight()}} />
            <Stack.Screen name='Movie' component={Movie} options={{title: '', headerLeft: () => buttonLeft('Movie'), headerRight: () => buttonRight()}} />
            <Stack.Screen name='News' component={News} options={{title: 'New Movies', headerLeft: () => buttonLeft(), headerRight: () => buttonRight()}} />
            <Stack.Screen name='Popular' component={Popular} options={{title: 'Trend Movies', headerLeft: () => buttonLeft(), headerRight: () => buttonRight()}} />
            <Stack.Screen name='Search' component={Search} options={{title: '', headerLeft: () => buttonLeft('Search')}} />
        </Stack.Navigator>
    );
}