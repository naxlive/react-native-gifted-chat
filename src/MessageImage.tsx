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
} from 'react-native'
// TODO: support web
// @ts-ignore
import Lightbox from 'react-native-lightbox'
import { IMessage } from './types'

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 240,
    height: 160,
    borderRadius: 13,
    margin: 0,
    resizeMode: 'cover',
  },
  welcomeImage :{
    width:"100%",
    height:Dimensions.get("window").width/1.5,
    borderRadius: 13,
    marginBottom:3,
    resizeMode: 'cover',
  },
 
  imageActive: {
    flex: 1,
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
      if(currentMessage.messageType == "welcome_image"){
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
      }else{
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
                style={[styles.image, imageStyle]}
                source={{ uri: currentMessage.image }}
              />
            </Lightbox>
          </View>
        )
      }
      
    }
    return null
  }
}
