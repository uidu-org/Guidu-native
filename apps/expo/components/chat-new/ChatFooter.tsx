import { useCallback, useMemo, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useChatContext } from './context/WrapperContext';
import { GUser } from './types';

export default function ChatFooter({ onPressSend }) {
    const { message, setMessage } = useChatContext()
    const [mentions, setMentions] = useState<GUser[]>(basicMentions);
    const [filteredMentions, setFilteredMentions] = useState<GUser[]>([]);
    const [openSheetMentions, setOpenSheetMentions] = useState(false);
    const [textMessage, setTextMessage] = useState("");
    const textInputRef = useRef<TextInput>(null);

    const onChangeText = useCallback(
        (text: string) => {
            const foundMentions: GUser[] = [];
            let currentWord = "";
            let triggeredBySpace = false; // Flag to track space after "@"

            // Iterate over each character
            for (let i = 0; i < text.length; i++) {
                const char = text[i];

                // Handle "@" symbol
                if (char === "@") {
                    // If starts with "@" or space before "@", show all mentions
                    if (i === 0 || text[i - 1] === " ") {
                        setOpenSheetMentions(true); // Open mentions sheet
                        setFilteredMentions(basicMentions); // Show all mentions
                        currentWord = ""; // Reset current word
                        triggeredBySpace = true; // Space triggered the mention sheet
                    } else {
                        currentWord += char; // Add "@" to current word
                        triggeredBySpace = false; // Reset space trigger flag
                    }
                } else if (char === " ") {
                    // Check if current word is a mention and add to foundMentions
                    if (currentWord.length > 1) {
                        const matchedUser = basicMentions.find((user) =>
                            user.username.toLowerCase() === currentWord.slice(1).toLowerCase()
                        );
                        if (matchedUser) {
                            foundMentions.push(matchedUser);
                        }
                    }
                    currentWord = ""; // Reset current word

                    // Don't filter if space follows "@" triggered by space
                    if (!triggeredBySpace) {
                        setFilteredMentions(basicMentions.filter((user) =>
                            user.username.toLowerCase().startsWith(text.slice(text.lastIndexOf("@") + 1).toLowerCase())
                        ));
                    }
                } else {
                    currentWord += char;

                    // Filter mentions only if not triggered by space
                    if (!triggeredBySpace) {
                        setFilteredMentions(basicMentions.filter((user) =>
                            user.username.toLowerCase().startsWith(text.slice(text.lastIndexOf("@") + 1).toLowerCase())
                        ));
                    }
                }
            }

            // Handle last word as a mention
            if (currentWord.length > 1) {
                const matchedUser = basicMentions.find((user) =>
                    user.username.toLowerCase() === currentWord.slice(1).toLowerCase()
                );
                if (matchedUser) {
                    foundMentions.push(matchedUser);
                }
            }

            // Update mentions state and text state
            setMentions(foundMentions);
            setTextMessage(text);
        },
        [basicMentions]
    );

    // const onPressSend = useCallback(() => {
    //     props.onPressSend({
    //       text: message,
    //       repliedTo: props.replyingTo,
    //       media: image,
    //     });
    //     setMessage('');
    //     setImage([]);
    //   }, [message, props, image]);

    const cuttedText = useMemo(() => {
        if (message) {
            return message.text.slice(0, 100) + '...';
        }
        return null;
    }, [message]);

    const handleMentionSelect = (username: string) => {
        const currentText = textMessage;
        const atPosition = currentText.lastIndexOf("@");

        // Check if there's already a username after "@"
        let newText = currentText;
        if (atPosition !== -1) {
            newText = currentText.slice(0, atPosition + 1); // Keep "@" symbol
        } else {
            newText = currentText + " "; // Add space after "@" if none exists
        }

        // Append selected username
        setTextMessage(newText + username);
        setOpenSheetMentions(false); // Close mentions sheet
    };


    const _onPressSend = useCallback(() => {
        onPressSend()
    }, [message]);

    return (
        <>
            <View style={[styles.container]}>
                {message && (
                    <View style={[styles.reply, { width: "100%" }]}>
                        <View style={styles.replyBody}>
                            <Text
                                style={[styles.replyUsername]}
                            >
                                {message.user.username}
                            </Text>
                            <Text>{cuttedText}</Text>
                        </View>
                        <Button title="cancel" onPress={() => setMessage(null)} />
                    </View>
                )}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        //   onPress={onPressImage}
                        style={{ paddingHorizontal: 5 }}>
                        <Text style={{ fontSize: 15 }}>📷</Text>
                    </TouchableOpacity>
                    <TextInput
                        // ref={textInputRef}
                        value={textMessage}
                        onChangeText={onChangeText}
                        style={[
                            styles.textInput,
                        ]}
                        placeholder={'Type a message...'}
                    />
                    <Button title="Send"
                        onPress={onPressSend}
                        color="#0084ff" />

                </View>
            </View>
            {/* <GuiSheet status={openSheetMentions} setStatus={setOpenSheetMentions} snapPoints={[60]} zIndex={-9999} >
                <FlatList data={filteredMentions} keyExtractor={(item) => item.id.toString()} renderItem={({ item: user }) => (
                    <GuiView onPress={() => handleMentionSelect(user.username)}>
                        <GuiText>{user.username}</GuiText>
                    </GuiView>
                )} />
            </GuiSheet> */}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
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
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderLeftColor: '#c8faaf',
        borderLeftWidth: 6,
        position: "absolute",
        bottom: 45
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