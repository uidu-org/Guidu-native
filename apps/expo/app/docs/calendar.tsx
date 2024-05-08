// import { DateTimePicker, View } from '@uidu/native';
// import dayjs from 'dayjs';
// import { useState } from 'react';
// import { StyleSheet } from 'react-native';

// export default function App() {
//   const [date, setDate] = useState(dayjs());

//   return (
//     <View style={styles.container}>
//       <DateTimePicker
//         mode="single"
//         date={date}
//         onChange={(params) => setDate(params.date)}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//   },
// });

import React from 'react';
import { Text, View } from 'react-native';

export default function Calendar() {
  return (
    <View>
      <Text>Calendar</Text>
    </View>
  );
}
