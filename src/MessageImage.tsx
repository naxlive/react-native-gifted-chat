import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  View,
  ImageProps,
  ViewStyle,
  StyleProp,
  ImageStyle,
  Dimensions,
  ActivityIndicator,
} from 'react-native'
// TODO: support web
// @ts-ignore
import Lightbox from 'react-native-lightbox'
import { IMessage } from './types'
import FastImage from 'react-native-fast-image'
import { props } from 'ramda'
import values from 'ramda/es/values'

const styles = StyleSheet.create({
  container: {},
  image: {
    borderRadius: 12,
    margin: 0,
    resizeMode: 'contain',
  },
  welcomeImage: {
    width: '100%',
    height: Dimensions.get('window').width / 1.5,
    borderRadius: 12,
    resizeMode: 'cover',
  },

  imageActive: {
    flex: 1,
    borderRadius: 12,
    resizeMode: 'contain',
  },
})

export interface MessageImageProps<TMessage extends IMessage> {
  currentMessage?: TMessage
  containerStyle?: StyleProp<ViewStyle>
  imageStyle?: StyleProp<ImageStyle>
  imageProps?: Partial<ImageProps>
  lightboxProps?: object
}

export default class MessageImage<
  TMessage extends IMessage = IMessage
> extends Component<MessageImageProps<TMessage>> {
  state = {
    width: 240,
    height: 160,
    loading: false,
  }
  static defaultProps = {
    currentMessage: {
      image: null,
    },
    containerStyle: {},
    imageStyle: {},
    imageProps: {},
    lightboxProps: {},
  }

  static propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: {},
    imageStyle: PropTypes.object,
    imageProps: PropTypes.object,
    lightboxProps: PropTypes.object,
  }

  render() {
    const {
      containerStyle,
      lightboxProps,
      imageProps,
      imageStyle,
      currentMessage,
    } = this.props
    if (!!currentMessage) {
      if (currentMessage.messageType == 'welcome_image') {
        return (
          <View style={[styles.container, containerStyle]}>
            <Lightbox
              activeProps={{
                style: styles.imageActive,
              }}
              {...lightboxProps}
            >
              <Image
                {...imageProps}
                style={[styles.welcomeImage, imageStyle]}
                source={{ uri: currentMessage.image }}
              />
            </Lightbox>
          </View>
        )
      } else {
        return (
          <View style={[styles.container, containerStyle]}>
            <Lightbox
              activeProps={{
                style: styles.imageActive,
              }}
              {...lightboxProps}
            >
              <FastImage
                style={[
                  styles.image,
                  imageStyle,
                  {
                    width: this.state.width < this.state.height ? 240 :160 ,
                    height: this.state.height > this.state.width ? 240 : 160,
                  
                  },
                ]}
                onLoad={value => {
                  const { height, width } = value.nativeEvent
                  this.setState({ width: width, height: height })
                }}
                onLoadStart={() => {
                  this.setState({ loading: true })
                }}
                onLoadEnd={() => {
                  this.setState({ loading: false })
                }}
                source={{
                  uri: currentMessage.image,
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.immutable,
                }}
                
              >
                <ActivityIndicator
                  animating={this.state.loading}
                  style={{ alignSelf: 'center', height: '100%' }}
                />
              </FastImage>
            </Lightbox>
          </View>
        )
      }
    }
    return null
  }
}
