import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Dimensions, Touchable, TouchableWithoutFeedback} from 'react-native';
import {Title, Text} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import {map, size} from 'lodash';
import {BASE_IMAGE_URL} from '../utils/constants';
import {getGenreMovieApi} from '../api/movies';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.7);

export default function CarouselVertical(props){
    const {data, navigation} = props;

    return (
        <Carousel 
            layout='default'
            data={data}
            renderItem={(movie) => <RenderItem data={movie} navigation={navigation}/>} 
            sliderWidth = {width}
            itemWidth = {ITEM_WIDTH}
        />
    );
}

function RenderItem(props){
    const {data, navigation} = props;
    const movie = data.item;
    const image_url = `${BASE_IMAGE_URL}/w500${movie.poster_path}`
    const [genres, setGenres] = useState(null);

    const onNavigate = () => {
        navigation.navigate('Movie', {movie: movie});
    };

    useEffect(() => {
        getGenreMovieApi(movie.genre_ids).then((response) => {
            setGenres(response);
        });
    }, []);

    return (
        <TouchableWithoutFeedback onPress={() => onNavigate()}>
            <View style={styles.card}>
                <Image style={styles.image} source={{uri: image_url}}/>
                <Title style={styles.title}>{movie.title}</Title>
                <View style={styles.genres}>
                    {genres && (
                        map(genres, (genre, index) => (
                            <Text key={index} styles={styles.genre}>
                                {genre}
                                {index != size(genres)-1 ? ', ': ''}
                            </Text>
                        ))
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    card:{
        shadowColor: '#000',
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowOpacity: 1,
        shadowRadius: 10
    },
    genre:{
        color: '#8967a5',
        fontSize: 10
    },
    genres:{
        flexDirection: 'row',
        marginHorizontal: 10
    },
    image:{
        borderRadius: 20,
        height: 450,
        width: '100%'
    },
    title:{
        marginHorizontal: 10,
        marginTop: 10
    },
});