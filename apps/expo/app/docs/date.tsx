import { GFormRhfProvider, GuiDateRangePickerRhf } from '@uidu/native'

export default function DateDocsPage() {
    return (
        <GFormRhfProvider
            defaultValues={{
                single: '2022-12-24',
                singleDate: new Date('2022-12-31'),
                rangeStartP: '2022-12-24',
                rangeEndP: '2022-12-31',
            }}
        >
            <GuiDateRangePickerRhf
                start={'rangeReq'}
                end={'rangeEndReq'}
                label={'Range Required'}
                required
                labelInline
            />
        </GFormRhfProvider>

    )
}