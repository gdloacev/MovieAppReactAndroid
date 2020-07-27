import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {Title} from 'react-native-paper';
import {getNewsMoviesApi} from '../api/movies';
import CarouselVertical from '../components/CarouselVertical';

export default function Home(props){

    const {navigation} = props;
    const [newMovies, setNewMovies] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await getNewsMoviesApi();
            setNewMovies(data.results);
        }
        fetchData();
    }, 
    []);

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            {newMovies && (
                <View style={styles.news}> 
                    <Title style={styles.title}>Now Playing</Title>
                    <CarouselVertical data={newMovies} navigation={navigation}/>
                </View>
            )}

            <View>
            
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    news: {
        marginVertical: 10
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        marginHorizontal: 20
    },
});