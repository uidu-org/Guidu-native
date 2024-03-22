import { MarkdownStyle, MarkdownTextInput } from '@expensify/react-native-live-markdown';
import {
    BottomSheetFlatList,
    BottomSheetModal,
    BottomSheetModalProvider
} from '@gorhom/bottom-sheet';
import { PlusCircle, SendHorizontal, X } from '@tamagui/lucide-icons';
import { GuiButton, GuiText } from '@uidu/native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useChatContext } from './context/WrapperContext';
import { GFooterProps, GUser } from './types';

export const _ChatFooter = (props: GFooterProps) => {
    const { mentions, onPressSend } = props
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => ["30%", '50%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);


    const { message, setMessage } = useChatContext()
    const [text, setText] = useState("");

    const _onPressSend = useCallback(() => {
        onPressSend(text, message);
        setText("")
    }, [message, text]);

    const cuttedText = useMemo(() => {
        if (message) {
            return message.text.slice(0, 100) + '...';
        }
        return null;
    }, [message]);


    const renderItem = useCallback(({ item }) => (
        <GuiButton>
            <GuiText>{item.username}</GuiText>
        </GuiButton>
    ), [])

    return (
        <BottomSheetModalProvider>
            <View>
                {message && (
                    <View style={{ width: "100%", flexDirection: "row", position: "absolute", bottom: 45, backgroundColor: "white", padding: 5 }}>
                        <View style={styles.replyBody}>
                            <Text
                                style={[styles.replyUsername]}
                            >
                                {message.user.username}
                            </Text>
                            <Text>{cuttedText}</Text>
                        </View>
                        <X size={20} onPress={() => setMessage(null)} />
                    </View>
                )}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 10 }}>
                    <View>
                        <PlusCircle size={30} onPress={() => handlePresentModalPress()} />
                    </View>
                    <View style={{ flexDirection: "row", flexGrow: 1 }}  >
                        <MarkdownTextInput
                            value={text}
                            onChangeText={setText}
                            markdownStyle={markdownStyle}
                            placeholder='type a message..'
                            style={{}}

                        />
                    </View>
                    <View style={{ padding: 2, backgroundColor: "green", borderRadius: 30, margin: 3 }} >
                        <SendHorizontal color={"white"} size={29} margin={4} onPress={_onPressSend} />
                    </View>
                </View>
            </View>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >


                <BottomSheetFlatList data={mentions} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />


            </BottomSheetModal>
        </BottomSheetModalProvider>
    )
}

const stylesSheet = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

const styles = StyleSheet.create({
    textInput: {
        padding: 5,
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
        // flexDirection: 'row',
        // padding: 10,
        // backgroundColor: '#f5f5f5',
        // borderLeftColor: '#c8faaf',
        // borderLeftWidth: 6,
        // position: "absolute",
        // bottom: 45
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


const basicMentions: GUser[] = [
    {

        id: 1,
        username: 'Jane',
        avatar: { uri: 'https://i.pravatar.cc/200' },
    },
    {
        id: 2,
        username: 'Flavio',
        avatar: { uri: 'https://i.pravatar.cc/200' },
    },
    {
        id: 3,
        username: 'Checco zalone',
        avatar: { uri: 'https://i.pravatar.cc/200' },
    }
]



const markdownStyle: MarkdownStyle = {
    syntax: {
        color: 'gray',
    },
    link: {
        color: 'blue',
    },
    h1: {
        fontSize: 25,
    },
    blockquote: {
        borderColor: 'gray',
        borderWidth: 6,
        marginLeft: 6,
        paddingLeft: 6,
    },
    code: {
        fontFamily: 'monospace',
        color: 'black',
        backgroundColor: 'lightgray',
    },
    pre: {
        fontFamily: 'monospace',
        color: 'black',
        backgroundColor: 'lightgray',
    },
    mentionHere: {
        color: 'green',
        backgroundColor: 'lime',
    },
    mentionUser: {
        color: 'blue',
        backgroundColor: 'cyan'
    }
}

export default React.memo(_ChatFooter)


{/* <MentionInput
                            value={text}
                            onChange={setText}
                            placeholder='Type a message...'
                            partTypes={[
                                {
                                    trigger: '@',
                                    renderSuggestions: (p) => {
                                        console.log();
                                        setText("triggered")
                                        return renderSuggestions(
                                            mentions.map((m) => ({
                                                id: m.id.toString(),
                                                name: m.name,
                                            }))
                                        )(p)
                                    },
                                    textStyle: { fontWeight: 'bold', color: 'blue' }, // The mention style in the input
                                },
                            ]}
                        /> */}