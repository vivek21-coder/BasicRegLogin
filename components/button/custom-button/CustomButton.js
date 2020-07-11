import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const customButton = (props) => {
  return (
    <TouchableOpacity
      style={props.styleBG}
      onPress={props.click}>

      <Text style={props.styleTxt}>
        {props.title}
      </Text>

    </TouchableOpacity>
  )
}

export default customButton;
