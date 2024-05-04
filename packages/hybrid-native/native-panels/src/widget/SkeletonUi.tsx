import { LinearGradient } from 'tamagui/linear-gradient';

export default function Skeleton() {
  return (
    <LinearGradient
      width="100%"
      height="$5"
      borderRadius="$4"
      colors={['$gray7Light', '$gray11Light']}
      start={[0, 2]}
      end={[6, 0]}
    />
  );
}
