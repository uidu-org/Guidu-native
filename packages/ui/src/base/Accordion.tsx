

import { Accordion as TAccordion, styled } from 'tamagui'
export const Accordion = styled(TAccordion, {

    padding: 2,
    margin: 2,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#e6e1e10",
})


export const Item = styled(TAccordion.Item, {

    borderWidth: 0,
    backgroundColor: "#e6e1e10",

})

export const Trigger = styled(TAccordion.Trigger, {

    borderWidth: 0,
    borderRadius: 7,
    backgroundColor: "#e6e1e10",

})

export const Content = styled(TAccordion.Content, {

    borderWidth: 0,
    backgroundColor: "#e6e1e10",
})

export const CustomAccordion = { Accordion, Item, Trigger, Content }