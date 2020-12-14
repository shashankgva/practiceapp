import React, {useState, useEffect, useCallback} from 'react';
import {Text, View} from 'react-native';
import styles from './indexCss';
import PropTypes from 'prop-types';

const Timer = props => {
  const {start, containerStyle, textStyle} = props;
  let [duration, setDuration] = useState(start);
  let [secs, setSecs] = useState('');
  let [mins, setMins] = useState(start - 1);

  React.useEffect(() => {
    startInterval();
  }, [startInterval]);

  const startInterval = React.useCallback(() => {
    var interval = 1000;
    var counter = start * 60 * 1000;
    let loopCount = 1;
    var intervalId = setInterval(() => {
      counter = counter - interval;

      if (counter === 0) {
        clearInterval(intervalId);
        alert('Time Up');
      } else {
        if (loopCount == 60) {
          setMins(prevState => prevState && prevState - 1);
          loopCount = 1;
        } else {
          loopCount++;
        }
        setSecs(60 - loopCount);
      }
    }, interval);
  }, []);

  return (
    <View style={{...styles.container, ...containerStyle}}>
      <View style={styles.innerContainer}>
        <Text styles={{...styles.text, ...textStyle}}>{mins}</Text>
        <Text styles={{...styles.text, ...textStyle}}>Min</Text>
      </View>
      <View>
        <Text styles={{...styles.text, ...textStyle}}>:</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text styles={{...styles.text, ...textStyle}}>{secs}</Text>
        <Text styles={{...styles.text, ...textStyle}}>Sec</Text>
      </View>
    </View>
  );
};

Timer.propTypes = {};

Timer.defaultProps = {
  start: 1,
};

export default Timer;
