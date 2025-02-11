import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import {
  StyleSheet,
  Text,
  View,
  
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native'
import moment from 'moment'

import Color from './Color'

import { isSameDay } from './utils'
import { DATE_FORMAT } from './Constant'
import { IMessage } from './types'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10,
    
  },
  text: {
    backgroundColor: Color.backgroundTransparent,
    color: "#fff",
    fontSize: 9,
    fontWeight: '600',
  },
  wrapperStyle:{
    backgroundColor:"#B6BEC9",
    height:24,
    minWidth:60,
    paddingHorizontal:8,
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:10
  }
})

export interface DayProps<TMessage extends IMessage> {
  currentMessage?: TMessage
  nextMessage?: TMessage
  previousMessage?: TMessage
  containerStyle?: StyleProp<ViewStyle>
  wrapperStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  dateFormat?: string
  inverted?: boolean
}

export default class Day<
  TMessage extends IMessage = IMessage
> extends PureComponent<DayProps<TMessage>> {
  static contextTypes = {
    getLocale: PropTypes.func,
  }

  static defaultProps = {
    currentMessage: {
      // TODO: test if crash when createdAt === null
      createdAt: null,
    },
    previousMessage: {},
    nextMessage: {},
    containerStyle: {},
    wrapperStyle: {},
    textStyle: {},
    dateFormat: DATE_FORMAT,
  }

  static propTypes = {
    currentMessage: PropTypes.object,
    previousMessage: PropTypes.object,
    nextMessage: PropTypes.object,
    inverted: PropTypes.bool,
    containerStyle: {},
    wrapperStyle: {},
    textStyle: PropTypes.any,
    dateFormat: PropTypes.string,
  }
  render() {
   
    const {
      dateFormat,
      currentMessage,
      previousMessage,
      containerStyle,
      wrapperStyle,
      textStyle,
    } = this.props
    if (currentMessage && !isSameDay(currentMessage, previousMessage!)) {
      return (
        <View style={[styles.container, containerStyle]}>
          <View style={[wrapperStyle,styles.wrapperStyle]}>
            <Text style={[styles.text, textStyle]}>
            {moment(currentMessage.createdAt)
                .locale(this.context.getLocale())
                .format(dateFormat)}
              {/* {moment(currentMessage.createdAt, "HH:mm DD-MM-YYYY").format("ll")} */}
            </Text>
          </View>
        </View>
      )
    }
    return null
  }
}
