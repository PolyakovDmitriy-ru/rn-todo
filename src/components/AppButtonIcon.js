import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import { THEME } from '../theme';

export const AppButtonIcon = ({name, onPress, color=THEME.MAIN_COLOR}) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <View style={{...styles.button, backgroundColor: THEME.GREY_COLOR}}>
              <Ionicons name={name} size={24} color={color}/>

              
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 32,
        height: 32,
        marginRight: 5,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
})