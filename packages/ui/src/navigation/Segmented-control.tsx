import React, { SetStateAction } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';


type SegmentedControlProps = {
    options: string[];
    selectedOption: string;
    onOptionPress?: React.Dispatch<SetStateAction<string>>
    segmentWidth?: number
    internalPadding?: number
};

const Palette = {
    baseGray05: '#E5E2DC',
    baseGray80: '#30302E',
    background: '#F1EEE8',
};

const SegmentedControl: React.FC<SegmentedControlProps> = React.memo(
    ({ options, selectedOption, onOptionPress, segmentWidth, internalPadding }) => {
        const { width: windowWidth } = useWindowDimensions();

        const internalControlPadding = internalPadding ?? 20;
        const segmentedControlWidth = segmentWidth ?? windowWidth - 40;

        const itemWidth =
            (segmentedControlWidth - internalControlPadding) / options.length;

        const rStyle = useAnimatedStyle(() => ({
            left: withTiming(
                itemWidth * options.indexOf(selectedOption) + internalControlPadding / 3
            )
        }
        ), [selectedOption, options, itemWidth]);

        return (
            <View
                style={[
                    styles.container,
                    {
                        width: segmentedControlWidth,
                        borderRadius: 20,
                        paddingLeft: internalControlPadding / 2,
                    },
                ]}
            >
                <Animated.View
                    style={[
                        {
                            width: itemWidth,
                        },
                        rStyle,
                        styles.activeBox,
                    ]}
                />
                {options.map((option) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                onOptionPress?.(option);
                            }}
                            key={option}
                            style={[
                                {
                                    width: itemWidth,
                                },
                                styles.labelContainer,
                            ]}
                        >
                            <Text style={styles.label}>{option}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 55,
        backgroundColor: Palette.baseGray05,
    },
    activeBox: {
        position: 'absolute',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        elevation: 3,
        height: '80%',
        top: '10%',
        backgroundColor: Palette.background,
    },
    labelContainer: { justifyContent: 'center', alignItems: 'center' },
    label: {
        fontFamily: 'SF-Compact-Rounded-Medium',
        fontSize: 16,
    },
});

// export { SegmentedControl };
