import { GuiView, SegmentedControl } from '@uidu/native';
import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native';

type GuiTabViewProps = {
    data: { title: string; component: React.ReactNode }[];
    windowWidth: number;
    shouldEachRerendered?: boolean
};

const GuiTabView: React.FC<GuiTabViewProps> = ({ data, windowWidth, shouldEachRerendered = false }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null)

    const handleScrollToIndex = (selectedOption: string) => {
        // Find the index of the option in the data array
        const index = data.findIndex((item) => item.title === selectedOption);

        // Guard against invalid index and infinite loop
        if (index !== -1 && index !== currentIndex) {
            flatListRef.current?.scrollToIndex({ index });
            setCurrentIndex(index);
        }

        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index });
        }
    };

    return (
        <>
            <GuiView fd='row' jc='center' py={"$2"}>
                <SegmentedControl
                    options={data.map((item) => item.title)}
                    selectedOption={data[currentIndex].title}
                    onOptionPress={handleScrollToIndex}
                    internalPadding={10}
                    segmentWidth={250}
                />
            </GuiView>
            <FlatList
                ref={flatListRef}
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={(event) => {
                    const index = Math.round(event.nativeEvent.contentOffset.x / windowWidth);
                    setCurrentIndex(index);
                }}
                bounces={false}
                keyExtractor={(_item, index) => index.toString()}

                renderItem={({ item, index }) => shouldEachRerendered ? (
                    index === currentIndex ? (
                        <GuiView w={windowWidth}>{item.component}</GuiView>
                    ) : null
                ) : (
                    <GuiView w={windowWidth} >{item.component}</GuiView>
                )}

            />
        </>
    );
}

// export { GuiTabView };
