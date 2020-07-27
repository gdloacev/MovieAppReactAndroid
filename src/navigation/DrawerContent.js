import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer, Switch, TouchableRipple, Text} from 'react-native-paper';
import usePreferences from '../Hooks/usePreferences';

export default function DrawerContent(props){

    const {navigation} = props;
    const [active, setActive] = useState('Home');
    const {theme, toggleTheme} = usePreferences();

    const onChangeScreen = (screen) => {
        navigation.navigate(screen);
        setActive(screen);
    };

    const getActive = (screen) => {
        return screen == active ? true : false;
    };

    return(
        <DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item label='Inicio' active={getActive('Home')} onPress={() => onChangeScreen('Home')} />
                <Drawer.Item label='New Movies' active={getActive('News')} onPress={() => onChangeScreen('News')}/>
                <Drawer.Item label='Trend Movies' active={getActive('Popular')} onPress={() => onChangeScreen('Popular')}/>
            </Drawer.Section>
            <Drawer.Section title='Options'>
                <TouchableRipple>
                    <View style={styles.preferences}>
                        <Text>Dark Theme</Text>
                        <Switch value={theme == 'dark'} onValueChange={toggleTheme}/>
                    </View>
                </TouchableRipple>
            </Drawer.Section>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    preferences:{
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       paddingVertical: 12,
       paddingHorizontal: 16 
    },
});