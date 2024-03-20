import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function ChatFooter() {
    return (
        <View style={[styles.container]}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    value={""}
                    // onChangeText={onChangeText}
                    style={[
                        styles.textInput,
                    ]}
                    placeholder={'Type a message...'}
                />

                <TouchableOpacity
                    //   onPress={onPressImage}
                    style={{ paddingHorizontal: 10 }}
                >
                    <Text style={{ fontSize: 20 }}>📷</Text>
                </TouchableOpacity>

                <Button title="Send"
                    // onPress={onPressSend} 
                    color="#0084ff" />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    textInput: {
        padding: 10,
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    shortedTextInput: {
        padding: 10,
        width: '70%',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        width: '20%',
        backgroundColor: '#fcba03',
    },
    reply: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderLeftColor: '#c8faaf',
        borderLeftWidth: 6,
    },
    replyBody: {
        flex: 1,
    },
    replyUsername: {
        fontWeight: 'bold',
    },

    addMore: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
    },
    imageClearButton: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: 18,
        height: 18,
        marginLeft: 10,
        marginTop: 5,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    media: {
        width: 110,
        height: 100,
        borderRadius: 15,
        marginRight: 10,
        marginBottom: 10,
    },
    mediaOverlay: {
        width: 100,
        height: 100,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 15,
    },
    mentionContainer: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        padding: 10,
        backgroundColor: '#E5EEFA',
    },
    mentionLabel: {
        padding: 10,
        color: '#1939B7',
    },
});