import React from "react";
import { View, StyleSheet, Text} from "react-native";  


export default function Board() {
    return (
        <View style={styles.container}>
            <Text> This is the Board</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
    }
});