import { GAutocompleteRhf, GFormRhfProvider, YStack } from "@uidu/native";
import { useState } from "react";

export default function kitchen() {

    const [form, setForm] = useState<any>({
        pre: [{ value: 'Pear', label: 'Pear' }],
        pre_matched: ['Pear'],
    })

    return (
        <>
            <GFormRhfProvider>
                <YStack space>
                    <GAutocompleteRhf
                        label={'Multiple - Match ID'}
                        name={'pre_matched'}
                        matchId
                        options={options}
                        multiple
                    />
                </YStack>
            </GFormRhfProvider>
        </>
    )
}

const options = [
    { label: 'Apple' },
    { label: 'Pear' },
    { label: 'Blackberry' },
    { label: 'Peach' },
    { label: 'Apricot' },
    { label: 'Melon' },
    { label: 'Honeydew' },
    { label: 'Starfruit' },
    { label: 'Blueberry' },
    { label: 'Rasberry' },
    { label: 'Strawberry' },
    { label: 'Mango' },
    { label: 'Pineapple' },
    { label: 'Lime' },
    { label: 'Lemon' },
    { label: 'Coconut' },
    { label: 'Guava' },
    { label: 'Papaya' },
    { label: 'Orange' },
    { label: 'Grape' },
    { label: 'Jackfruit' },
    { label: 'Durian' }
].map(i => ({
    value: i.label,
    label: i.label
}))