import React, {
  useReducer,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import Timer from '../../components/Timer';
import * as authActions from '../../store/actions/auth';
import {WebView} from 'react-native-webview';
import htmlData from './htmlData';
import HTML from 'react-native-render-html';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const scrollViewRef = useRef();
  const videoRef = useRef();
  const [addScroll, setAddScroll] = useState(false);

  useEffect(() => {
    Orientation.lockToLandscape();

    // Orientation.addOrientationListener(onOrientationChangeHandler);
    return () => {
      Orientation.lockToPortrait();
      //   Orientation.removeOrientationListener(onOrientationChangeHandler);
    };
  }, []);

  const htmlPage = htmlData();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password,
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password,
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  const handleMessage = useCallback(event => {
    try {
      console.log('HANDLEMESSAGE>>', event);
      //Toast.show({text: 'HANDLEMESSAGE:::' + event.nativeEvent.data});

      if (!event.nativeEvent) {
        return;
      }
      let data = {};
      // Sometimes the message is invalid JSON, so we ignore that case
      try {
        data = JSON.parse(event.nativeEvent.data);
      } catch (error) {
        //console.error(error);
        return;
      }
      const {height, width} = data;
      console.log(`height>>${height}, prevwidth>>${width}`);
    } catch (err) {
      console.log('error :>> ', err);
    }
  }, []);

  // console.log('screenView :>> ', screenView);

  // return (
  //   <KeyboardAvoidingView
  //     behavior="padding"
  //     keyboardVerticalOffset={50}
  //     style={styles.screen}>
  //     <Timer start={2} />
  //     <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
  //       <Card style={styles.authContainer}>
  //         <ScrollView>
  //           <Input
  //             id="email"
  //             label="E-Mail gaga upd"
  //             keyboardType="email-address"
  //             required
  //             email
  //             autoCapitalize="none"
  //             errorText="Please enter a valid email address."
  //             onInputChange={inputChangeHandler}
  //             initialValue=""
  //           />
  //           <Input
  //             id="password"
  //             label="Password"
  //             keyboardType="default"
  //             secureTextEntry
  //             required
  //             minLength={5}
  //             autoCapitalize="none"
  //             errorText="Please enter a valid password."
  //             onInputChange={inputChangeHandler}
  //             initialValue=""
  //           />
  //           <View style={styles.buttonContainer}>
  //             {isLoading ? (
  //               <ActivityIndicator size="small" color={Colors.primary} />
  //             ) : (
  //               <Button
  //                 title={isSignup ? 'Sign Up' : 'Login'}
  //                 color={Colors.primary}
  //                 onPress={authHandler}
  //               />
  //             )}
  //           </View>
  //           <View style={styles.buttonContainer}>
  //             <Button
  //               title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
  //               color={Colors.accent}
  //               onPress={() => {
  //                 setIsSignup(prevState => !prevState);
  //               }}
  //             />
  //           </View>
  //         </ScrollView>
  //       </Card>
  //     </LinearGradient>
  //   </KeyboardAvoidingView>
  // );
  // return (
  //   <View style={styles.cardContainer}>
  //     <View style={styles.questionContainer}>
  //       {/* <View style={styles.container}> */}
  //       {/* <View style={styles.innerContainer}> */}
  //       <ScrollView
  //         key="qnaScrollView"
  //         disableScrollViewPanResponder={true}
  //         horizontal={false}
  //         persistentScrollbar={false}
  //         showsVerticalScrollIndicator={true}
  //         style={styles.scrollviewContainer}
  //         scrollEnabled={true}
  //         nestedScrollEnabled={true}
  //         keyboardDismissMode="interactive"
  //         keyboardShouldPersistTaps="never"
  //         automaticallyAdjustContentInsets={false}
  //         onResponderMove={() => {
  //           console.log('outer responding');
  //         }}>
  //         <WebView
  //           onMessage={handleMessage}
  //           source={{
  //             html: htmlPage,
  //           }}
  //           style={styles.webViewContainer}
  //         />
  //         {/* <HTML html={htmlPage} /> */}
  //       </ScrollView>
  //       <Button
  //         onPress={onBtnPressHandler}
  //         title="Add Scroll"
  //         color="#841584"
  //         accessibilityLabel="Learn more about this purple button"
  //       />
  //       {/* </View> */}
  //       {/* </View> */}
  //     </View>
  //   </View>
  // );
  videoRef && videoRef?.current?.presentFullscreenPlayer();
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{uri: 'http://techslides.com/demos/sample-videos/small.mp4'}} // Can be a URL or a local file.
          // ref={ref => {
          //   this.player = ref;
          // }} // Store reference
          onBuffer={{}} // Callback when remote video is buffering
          onError={{}} // Callback when video cannot be loaded
          style={styles.backgroundVideo}
          fullscreen={true}
          paused={false}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export const screenOptions = {
  headerTitle: 'Authenticate',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
  cardContainer: {
    // flexDirection: 'column',
    // alignItems: 'center',
    borderRadius: 21,
    paddingTop: 18,
    paddingBottom: 40,
    // marginLeft: getWp(12),
    // marginRight: getWp(12),
    marginBottom: 45,
    marginTop: 179,
    height: 630,
    width: 393,
    backgroundColor: 'white',
    // alignSelf: 'center',
  },
  questionContainer: {
    flex: 1,
    // alignSelf: 'center',
  },
  container: {
    // paddingBottom: 0,
    // justifyContent: 'center',
    // flex: 1,
  },
  innerContainer: {
    // backgroundColor: 'transparent',
  },
  webViewContainer: {
    marginTop: 27,
    marginBottom: 45,
    // marginStart: isRTL ? getWp(0) : getWp(16.5),
    // marginEnd: isRTL ? getWp(16.5) : getWp(0),
    width: 393,
    height: 400,
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
    backgroundColor: 'blue',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthScreen;
