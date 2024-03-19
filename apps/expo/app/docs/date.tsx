import { Button, GFormRhfProvider, GuiDatepickerRhf, XStack, YStack } from '@uidu/native';

export default function DateDocsPage() {
    return (
        <>
            <GFormRhfProvider
                defaultValues={{
                    date: new Date()
                }}
            >
                {({ control, handleSubmit, reset }) => (
                    <YStack gap={"$3"}>
                        <GuiDatepickerRhf
                            control={control}
                            name="date"
                            defaultDates={[new Date()]}
                        />
                        <XStack gap={"$3"}>
                            <Button onPress={() => reset()}>Reset</Button>
                            <Button
                                onPress={handleSubmit((data) => {
                                    console.log(data);
                                })}
                            >
                                Submit
                            </Button>
                        </XStack>
                    </YStack>
                )}
            </GFormRhfProvider>
        </>
    )
}