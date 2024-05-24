import { render } from '@testing-library/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../src/index';

describe('Accordion', () => {
  it('should render correctly', () => {
    const wrapper = render(
      <Accordion type="single">
        <AccordionItem value="1">
          <AccordionTrigger />
          <AccordionContent>ciao sono un accordion</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
