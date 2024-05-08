import { GuiText } from "@uidu/native";
import React, { Ref, useImperativeHandle, useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GFabRef, GScrollToBottomProps } from "../types";

function _ScrollToBottom(_: GScrollToBottomProps, ref: Ref<GFabRef>) {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useImperativeHandle(
        ref,
        () => ({
            show: () => setIsVisible(true),
            hide: () => setIsVisible(false),
        }),
        []
    );

    if (!isVisible) return null;

    return (
        <TouchableOpacity
            style={_.containerStyle ?? styles.button}
            onPress={_.onPress}
        >
            {_.content ?? <GuiText style={styles.label}>DOWN</GuiText>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 50,
        zIndex: 1,
        height: 50,
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 50,
        position: 'absolute',
        bottom: 50,
        right: 20,
    },
    label: {
        textAlign: 'center',
        fontSize: 10,
    },
});

export const ScrollToBottom = React.memo(React.forwardRef(_ScrollToBottom));