import React from 'react';
import {View, Text} from 'react-native';

export default function Movie(props){
    
    const {route} = props;
    const movie = route.params.movie;

    console.log(movie);

    return(
        <View>
            <Text>Movie</Text>
        </View>
    );
}