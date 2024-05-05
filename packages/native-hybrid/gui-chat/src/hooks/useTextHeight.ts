import { useEffect, useState } from 'react';
import MeasureText, { TSMeasureParams } from 'rn-text-size';

interface TextHeightProps extends TSMeasureParams {
  text: string;
}

const useTextHeight = ({ text, ...props }: TextHeightProps) => {
  const [measuredHeight, setMeasuredHeight] = useState(0);

  useEffect(() => {
    const measure = async () => {
      const { height } = await MeasureText.measure({
        text: text,
        ...props,
      });
      setMeasuredHeight(height);
    };

    measure();
  }, [text]);

  return measuredHeight;
};

export default useTextHeight;
