import PropTypes from 'prop-types'
import React from 'react'
import {
  Text,
  Clipboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  Dimensions,
} from 'react-native'

import QuickReplies from './QuickReplies'

import MessageText from './MessageText'
import MessageImage from './MessageImage'
import MessageVideo from './MessageVideo'

import Time from './Time'
import Color from './Color'

import { isSameUser, isSameDay } from './utils'
import {
  User,
  IMessage,
  LeftRightStyle,
  Reply,
  Omit,
  MessageVideoProps,
} from './types'

const styles = {
  left: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: '#fff',
      marginRight: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
      marginBottom: 4,
    },
    wrapperWelcomeImage: {
      borderRadius: 15,
      backgroundColor: 'transparent',
      minHeight: 20,
      padding: 3,
      marginLeft: -40,
      marginBottom: 4,
      justifyContent: 'flex-end',
      width: Dimensions.get('window').width - 24,
    },
    containerToNext: {
      borderBottomLeftRadius: 3,
    },
    containerToPrevious: {
      borderTopLeftRadius: 3,
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    talkBubble: {
      backgroundColor: 'transparent',
    },
    talkBubbleSquare: {
      borderRadius: 10,
    },
    talkBubbleTriangle: {
      position: 'absolute',
      left: -12,
      top: 4,
      width: 0,
      height: 0,
      borderTopColor: 'transparent',
      borderTopWidth: 4,
      borderRightWidth: 26,
      borderRightColor: '#fff',
      borderBottomWidth: 13,
      borderBottomColor: 'transparent',
    },
  }),
  right: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-end',
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: '#8CDB66',
      marginLeft: 60,
      minHeight: 20,
      marginRight: 2,
      marginBottom: 4,
      justifyContent: 'flex-end',
    },
    containerToNext: {
      borderBottomRightRadius: 16,
    },
    containerToPrevious: {
      borderTopRightRadius: 20,
      // borderTopWidth:20
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    talkBubble: {
      backgroundColor: 'transparent',
    },
    talkBubbleSquare: {
      borderRadius: 10,
    },
    talkBubbleTriangle: {
      position: 'absolute',
      right: -10,
      top: 6,
      width: 0,
      height: 0,
      borderTopColor: 'transparent',
      borderTopWidth: 4,
      borderLeftWidth: 26,
      borderLeftColor: '#8CDB66',
      borderBottomWidth: 13,
      borderBottomColor: 'transparent',
    },
  }),
  content: StyleSheet.create({
    tick: {
      fontSize: 10,
      backgroundColor: Color.backgroundTransparent,
      color: Color.white,
    },
    tickView: {
      flexDirection: 'row',
      marginRight: 10,
    },
    username: {
      top: -3,
      left: 0,
      fontSize: 12,
      backgroundColor: 'transparent',
      color: '#aaa',
    },
    usernameView: {
      flexDirection: 'row',
      marginHorizontal: 10,
    },
  }),
}

const DEFAULT_OPTION_TITLES = ['Copy Text', 'Cancel']

export type RenderMessageImageProps<TMessage extends IMessage> = Omit<
  BubbleProps<TMessage>,
  'containerStyle' | 'wrapperStyle'
> &
  MessageImage['props']

export type RenderMessageVideoProps<TMessage extends IMessage> = Omit<
  BubbleProps<TMessage>,
  'containerStyle' | 'wrapperStyle'
> &
  MessageVideoProps<TMessage>

export type RenderMessageTextProps<TMessage extends IMessage> = Omit<
  BubbleProps<TMessage>,
  'containerStyle' | 'wrapperStyle'
> &
  MessageText['props']

export interface BubbleProps<TMessage extends IMessage> {
  user?: User
  touchableProps?: object
  renderUsernameOnMessage?: boolean
  isCustomViewBottom?: boolean
  inverted?: boolean
  position: 'left' | 'right'
  currentMessage?: TMessage
  nextMessage?: TMessage
  previousMessage?: TMessage
  optionTitles?: string[]
  containerStyle?: LeftRightStyle<ViewStyle>
  wrapperStyle?: LeftRightStyle<ViewStyle>
  textStyle?: LeftRightStyle<TextStyle>
  bottomContainerStyle?: LeftRightStyle<ViewStyle>
  tickStyle?: StyleProp<TextStyle>
  containerToNextStyle?: LeftRightStyle<ViewStyle>
  containerToPreviousStyle?: LeftRightStyle<ViewStyle>
  usernameStyle?: TextStyle
  quickReplyStyle?: StyleProp<ViewStyle>
  onLongPress?(context?: any, message?: any): void
  onQuickReply?(replies: Reply[]): void
  renderMessageImage?(props: RenderMessageImageProps<TMessage>): React.ReactNode
  renderMessageVideo?(props: RenderMessageVideoProps<TMessage>): React.ReactNode
  renderMessageText?(props: RenderMessageTextProps<TMessage>): React.ReactNode
  renderCustomView?(bubbleProps: BubbleProps<TMessage>): React.ReactNode
  renderTime?(timeProps: Time['props']): React.ReactNode
  renderTicks?(currentMessage: TMessage): React.ReactNode
  renderUsername?(): React.ReactNode
  renderQuickReplySend?(): React.ReactNode
  renderQuickReplies?(quickReplies: QuickReplies['props']): React.ReactNode
}

export default class Bubble<
  TMessage extends IMessage = IMessage
> extends React.Component<BubbleProps<TMessage>> {
  static contextTypes = {
    actionSheet: PropTypes.func,
  }

  static defaultProps = {
    touchableProps: {},
    onLongPress: null,
    renderMessageImage: null,
    renderMessageVideo: null,
    renderMessageText: null,
    renderCustomView: null,
    renderUsername: null,
    renderTicks: null,
    renderTime: null,
    renderQuickReplies: null,
    onQuickReply: null,
    position: 'left',
    optionTitles: DEFAULT_OPTION_TITLES,
    currentMessage: {
      text: null,
      createdAt: null,
      image: null,
    },
    nextMessage: {},
    previousMessage: {},
    containerStyle: {},
    wrapperStyle: {},
    bottomContainerStyle: {},
    tickStyle: {},
    usernameStyle: {},
    containerToNextStyle: {},
    containerToPreviousStyle: {},
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    touchableProps: PropTypes.object,
    onLongPress: PropTypes.func,
    renderMessageImage: PropTypes.func,
    renderMessageVideo: PropTypes.func,
    renderMessageText: PropTypes.func,
    renderCustomView: PropTypes.func,
    isCustomViewBottom: PropTypes.bool,
    renderUsernameOnMessage: PropTypes.bool,
    renderUsername: PropTypes.func,
    renderTime: PropTypes.func,
    renderTicks: PropTypes.func,
    renderQuickReplies: PropTypes.func,
    onQuickReply: PropTypes.func,
    position: PropTypes.oneOf(['left', 'right']),
    optionTitles: PropTypes.arrayOf(PropTypes.string),
    currentMessage: PropTypes.object,
    nextMessage: PropTypes.object,
    previousMessage: PropTypes.object,
    containerStyle: PropTypes.shape({
      left: PropTypes.any,
      right: PropTypes.any,
    }),
    wrapperStyle: PropTypes.shape({
      left: PropTypes.any,
      right: PropTypes.any,
    }),
    bottomContainerStyle: PropTypes.shape({
      left: PropTypes.any,
      right: PropTypes.any,
    }),
    tickStyle: PropTypes.any,
    usernameStyle: PropTypes.any,
    containerToNextStyle: PropTypes.shape({
      left: PropTypes.any,
      right: PropTypes.any,
    }),
    containerToPreviousStyle: PropTypes.shape({
      left: PropTypes.any,
      right: PropTypes.any,
    }),
  }

  onLongPress = () => {
    const { currentMessage } = this.props
    if (this.props.onLongPress) {
      this.props.onLongPress(this.context, this.props.currentMessage)
    } else if (currentMessage && currentMessage.text) {
      const { optionTitles } = this.props
      const options =
        optionTitles && optionTitles.length > 0
          ? optionTitles.slice(0, 2)
          : DEFAULT_OPTION_TITLES
      const cancelButtonIndex = options.length - 1
      this.context.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex: number) => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setString(currentMessage.text)
              break
            default:
              break
          }
        },
      )
    }
  }

  styledBubbleToNext() {
    const {
      currentMessage,
      nextMessage,
      position,
      containerToNextStyle,
    } = this.props
    if (
      currentMessage &&
      nextMessage &&
      position &&
      isSameUser(currentMessage, nextMessage) &&
      isSameDay(currentMessage, nextMessage)
    ) {
      return [
        styles[position].containerToNext,
        containerToNextStyle && containerToNextStyle[position],
      ]
    }
    return null
  }

  styledBubbleToPrevious() {
    const {
      currentMessage,
      previousMessage,
      position,
      containerToPreviousStyle,
    } = this.props
    if (
      currentMessage &&
      previousMessage &&
      position &&
      isSameUser(currentMessage, previousMessage) &&
      isSameDay(currentMessage, previousMessage)
    ) {
      return [
        styles[position].containerToPrevious,
        containerToPreviousStyle && containerToPreviousStyle[position],
      ]
    }
    return null
  }

  renderQuickReplies() {
    const {
      currentMessage,
      onQuickReply,
      nextMessage,
      renderQuickReplySend,
      quickReplyStyle,
    } = this.props
    if (currentMessage && currentMessage.quickReplies) {
      const { containerStyle, wrapperStyle, ...quickReplyProps } = this.props
      if (this.props.renderQuickReplies) {
        return this.props.renderQuickReplies(quickReplyProps)
      }
      return (
        <QuickReplies
          {...{
            currentMessage,
            onQuickReply,
            nextMessage,
            renderQuickReplySend,
            quickReplyStyle,
          }}
        />
      )
    }
    return null
  }

  renderMessageText() {
    if (this.props.currentMessage && this.props.currentMessage.text) {
      const {
        containerStyle,
        wrapperStyle,
        optionTitles,
        ...messageTextProps
      } = this.props
      if (this.props.renderMessageText) {
        return this.props.renderMessageText(messageTextProps)
      }
      return <MessageText {...messageTextProps} />
    }
    return null
  }

  renderMessageImage() {
    if (this.props.currentMessage && this.props.currentMessage.image) {
      const { containerStyle, wrapperStyle, ...messageImageProps } = this.props
      if (this.props.renderMessageImage) {
        return this.props.renderMessageImage(messageImageProps)
      }
      return <MessageImage {...messageImageProps} />
    }
    return null
  }

  renderMessageVideo() {
    if (this.props.currentMessage && this.props.currentMessage.video) {
      const { containerStyle, wrapperStyle, ...messageVideoProps } = this.props
      if (this.props.renderMessageVideo) {
        return this.props.renderMessageVideo(messageVideoProps)
      }
      return <MessageVideo {...messageVideoProps} />
    }
    return null
  }

  renderTicks() {
    const { currentMessage, renderTicks, user } = this.props
    if (renderTicks && currentMessage) {
      return renderTicks(currentMessage)
    }
    if (
      currentMessage &&
      user &&
      currentMessage.user &&
      currentMessage.user._id !== user._id
    ) {
      return null
    }
    if (
      currentMessage &&
      (currentMessage.sent || currentMessage.received || currentMessage.pending)
    ) {
      return (
        <View style={styles.content.tickView}>
          {!!currentMessage.sent && (
            <Text style={[styles.content.tick, this.props.tickStyle]}>✓</Text>
          )}
          {!!currentMessage.received && (
            <Text style={[styles.content.tick, this.props.tickStyle]}>✓</Text>
          )}
          {!!currentMessage.pending && (
            <Text style={[styles.content.tick, this.props.tickStyle]}>🕓</Text>
          )}
        </View>
      )
    }
    return null
  }

  renderTime() {
    if (this.props.currentMessage && this.props.currentMessage.createdAt) {
      const {
        containerStyle,
        wrapperStyle,
        textStyle,
        ...timeProps
      } = this.props
      if (this.props.renderTime) {
        return this.props.renderTime(timeProps)
      }
      return <Time {...timeProps} />
    }
    return null
  }

  renderUsername() {
    const { currentMessage, user } = this.props
    if (this.props.renderUsernameOnMessage && currentMessage) {
      if (user && currentMessage.user._id === user._id) {
        return null
      }
      return (
        <View style={styles.content.usernameView}>
          <Text
            style={
              [styles.content.username, this.props.usernameStyle] as TextStyle
            }
          >
            ~ {currentMessage.user.name}
          </Text>
        </View>
      )
    }
    return null
  }

  renderCustomView() {
    if (this.props.renderCustomView) {
      return this.props.renderCustomView(this.props)
    }
    return null
  }

  renderBubbleContent() {
    return this.props.isCustomViewBottom ? (
      <View>
        <View style={styles[this.props.position].talkBubble}>
          <View style={styles[this.props.position].talkBubbleSquare} />
          <View style={styles[this.props.position].talkBubbleTriangle} />
        </View>
        {this.renderMessageImage()}
        {this.renderMessageVideo()}
        {this.renderMessageText()}
        {this.renderCustomView()}
      </View>
    ) : (
      <View>
        <View style={styles[this.props.position].talkBubble}>
          <View style={styles[this.props.position].talkBubbleSquare} />
          <View style={styles[this.props.position].talkBubbleTriangle} />
        </View>
        {this.renderCustomView()}
        {this.renderMessageImage()}
        {this.renderMessageVideo()}
        {this.renderMessageText()}
      </View>
    )
  }
  render() {
    const {
      position,
      containerStyle,
      wrapperStyle,
      bottomContainerStyle,
      currentMessage,
    } = this.props
    if (currentMessage.messageType == 'welcome_text' && position === 'left') {
      return (
        <View
          style={[
            styles[position].container,
            containerStyle && containerStyle[position],
          ]}
        >
          <View
            style={[
              styles[position].wrapper,
              this.styledBubbleToNext(),
              this.styledBubbleToPrevious(),
              wrapperStyle && wrapperStyle[position],
            ]}
          >
            <TouchableWithoutFeedback
              onLongPress={this.onLongPress}
              accessibilityTraits='text'
              {...this.props.touchableProps}
            >
              <View>
                {this.renderBubbleContent()}
                <View
                  style={[
                    styles[position].bottom,
                    bottomContainerStyle && bottomContainerStyle[position],
                  ]}
                >
                  <View style={{ position: 'absolute', right: -60, top: -24 }}>
                    {this.renderUsername()}
                    {this.renderTime()}
                    {this.renderTicks()}
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          {this.renderQuickReplies()}
        </View>
      )
    } else if (
      currentMessage.messageType == 'welcome_image' &&
      position == 'left'
    ) {
      return (
        <View
          style={[
            styles[position].container,
            containerStyle && containerStyle[position],
          ]}
        >
          <View
            style={[
              styles[position].wrapperWelcomeImage,
              this.styledBubbleToNext(),
              this.styledBubbleToPrevious(),
              wrapperStyle && wrapperStyle[position],
            ]}
          >
            <TouchableWithoutFeedback
              onLongPress={this.onLongPress}
              accessibilityTraits='text'
              {...this.props.touchableProps}
            >
              <View>
                {this.renderBubbleContent()}
                <View
                  style={[
                    styles[position].bottom,
                    bottomContainerStyle && bottomContainerStyle[position],
                  ]}
                >
                  <View style={{ position: 'absolute', right: -4, top: 6 }}>
                    {this.renderUsername()}
                    {this.renderTime()}
                    {this.renderTicks()}
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          {/* {this.renderQuickReplies()} */}
        </View>
      )
    } else if (currentMessage.messageType == 'text' && position == 'right') {
      return (
        <View
          style={[
            styles[position].container,
            containerStyle && containerStyle[position],
          ]}
        >
          <View
            style={[
              styles[position].wrapper,
              this.styledBubbleToNext(),
              this.styledBubbleToPrevious(),
              wrapperStyle && wrapperStyle[position],
            ]}
          >
            <TouchableWithoutFeedback
              onLongPress={this.onLongPress}
              accessibilityTraits='text'
              {...this.props.touchableProps}
            >
              <View>
                {this.renderBubbleContent()}
                <View
                  style={[
                    styles[position].bottom,
                    bottomContainerStyle && bottomContainerStyle[position],
                  ]}
                >
                  <View style={{ backgroundColor: 'red' }}>
                    {this.renderUsername()}
                    {this.renderTime()}
                    {this.renderTicks()}
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* {this.renderQuickReplies()} */}
        </View>
      )
    } else {
      return (
        <View
          style={[
            styles[position].container,
            containerStyle && containerStyle[position],
          ]}
        >
          <View
            style={[
              styles[position].wrapper,
              this.styledBubbleToNext(),
              this.styledBubbleToPrevious(),
              wrapperStyle && wrapperStyle[position],
            ]}
          >
            <TouchableWithoutFeedback
              onLongPress={this.onLongPress}
              accessibilityTraits='text'
              {...this.props.touchableProps}
            >
              <View>
                {this.renderBubbleContent()}
                <View
                  style={[
                    styles[position].bottom,
                    bottomContainerStyle && bottomContainerStyle[position],
                  ]}
                >
                  <View style={{ position: 'absolute', left: -54, top: -24 }}>
                    {this.renderUsername()}
                    {this.renderTime()}
                    {this.renderTicks()}
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          {/* {this.renderQuickReplies()} */}
        </View>
      )
    }
  }
}
