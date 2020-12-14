import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('2.4'),
    backgroundColor: 'blue',
  },
  innerContainer: {
    alignItems: 'center',
    paddingHorizontal: wp('1.4'),
    paddingVertical: hp('0.6'),
  },
  text: {fontSize: wp('4.8'), color: 'white', marginBottom: -hp('0.6')},
});
