import { GFormRhfProvider, GSubmitButtonRhf, GuiDateRangePickerRhf, YStack } from '@uidu/native'

export default function DateDocsPage() {
    return (
        <GFormRhfProvider
            defaultValues={{
                preselect: '1980-02-21',
            }}
        >
            <YStack space>
                {/* <GuiDateSelectionRhf name={'birthday'} label={'Birthday'} required />
                <GuiDateSelectionRhf name={'preselect'} label={'Preselect'} required /> */}
                <GuiDateRangePickerRhf
                    start={'rangeReq'}
                    end={'rangeEndReq'}
                    label={'Range Required'}
                    required
                    labelInline
                />
                <GuiDateRangePickerRhf
                    start={'rangeStartP'}
                    end={'rangeEndP'}
                    label={'Range Preselect'}
                    labelInline
                />
                <GSubmitButtonRhf
                    onSubmit={(form) => {
                        console.log(form)
                    }}
                >
                    Submit
                </GSubmitButtonRhf>
            </YStack>
        </GFormRhfProvider>
    )
}