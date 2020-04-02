import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {AppText} from './AppText';

export const AppButton1 = ({children, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
            <View style={{...styles.button}}>
                <AppText style={styles.text}>{children}</AppText>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        opacity: 0.85,
        width: 250,
        height: 50,
        marginBottom: 30,
    },
    text: {
        color: '#fff',
        fontSize: 18,
    }
})