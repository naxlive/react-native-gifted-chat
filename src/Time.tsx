import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native'

import moment from 'moment'

import Color from './Color'
import { TIME_FORMAT } from './Constant'
import { LeftRightStyle, IMessage } from './types'

const containerStyle = {
  marginLeft: 18,
  marginRight: 10,
  marginBottom: 5,
}

const textStyle = {
  fontSize: 9,
  backgroundColor: 'transparent',
  textAlign: 'left',
}

const styles = {
  left: StyleSheet.create({
    container: {
      flexDirection:"column",
  
      ...containerStyle,
    },
    text: {
      color: Color.timeTextColor,
      ...textStyle,
    },
  }),
  right: StyleSheet.create({
    container: {
      flexDirection:"column",
      justifyContent:"flex-end",
      alignItems:"flex-end",
      ...containerStyle,
    },
    text: {
      color:"#6F7783",
      ...textStyle,
    },
  }),
}

export interface TimeProps<TMessage extends IMessage> {
  position: 'left' | 'right'
  currentMessage?: TMessage
  containerStyle?: LeftRightStyle<ViewStyle>
  timeTextStyle?: LeftRightStyle<TextStyle>
  timeFormat?: string
}

export default class Time<
  TMessage extends IMessage = IMessage
> extends Component<TimeProps<TMessage>> {
  static contextTypes = {
    getLocale: PropTypes.func,
  }

  static defaultProps = {
    position: 'left',
    currentMessage: {
      createdAt: null,
    },
    containerStyle: {},
    timeFormat: TIME_FORMAT,
    timeTextStyle: {},
  }

  static propTypes = {
    position: PropTypes.oneOf(['left', 'right']),
    currentMessage: PropTypes.object,
    containerStyle: PropTypes.shape({
      left: PropTypes.any,
      right: PropTypes.any,
    }),
    timeFormat: PropTypes.string,
    timeTextStyle: PropTypes.shape({
      left: PropTypes.any,
      right: PropTypes.any,
    }),
  }

  render() {
    const {
      position,
      containerStyle,
      currentMessage,
      timeFormat,
      timeTextStyle,
    } = this.props

    if (!!currentMessage) {
      return (
        <View
          style={[
            styles[position].container,
            containerStyle && containerStyle[position],
          ]}
        >
          <Text
           style={
            [
              styles[position].text,
              timeTextStyle && timeTextStyle[position],
            ] as TextStyle
          }
          >อ่านแล้ว</Text>
          <Text
            style={
              [
                styles[position].text,
                timeTextStyle && timeTextStyle[position],
              ] as TextStyle
            }
          >
            {moment(currentMessage.createdAt, "YYYY-MM-DD HH:mm:ss").format("HH:mm")}
          </Text>
        </View>
      )
    }
    return null
  }
}
