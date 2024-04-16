import { Dimensions } from 'react-native';

const SIZES = {
  IMAGE_HEIGHT: 300,
  IMAGE_WIDTH: '80%',
  MIN_IMAGE_WIDTH: Dimensions.get('screen').width - 130,
  BUBBLE_CHAT_WIDTH: Dimensions.get('screen').width - 130,
  BUBBLE_CHAT_PADDING: 20,
  BUBBLE_CHAT_MARGIN: 20,
  BUBBLE_CHAT_LINE_HEIGHT: 30,
};

export default SIZES;
