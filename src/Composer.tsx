import PropTypes from 'prop-types'
import React from 'react'
import { Platform, StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import { MIN_COMPOSER_HEIGHT, DEFAULT_PLACEHOLDER } from './Constant'
import Color from './Color'

const styles = StyleSheet.create({
  textInputContainer :{
    backgroundColor: "#f0f0f0",
    borderRadius: 22,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.05)",
    flex: 0.85,
    paddingBottom:1,
    paddingTop:1,
  },
  textInput: {
    marginRight:16,
    marginLeft:16,
    fontSize: 15,
    lineHeight:20,
    textAlignVertical:"center",
    ...Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4,
      },
    }),
    marginTop: Platform.select({
      ios: 0,
      android: 0,
      web: 6,
    }),
    marginBottom: Platform.select({
      ios: 0,
      android: 3,
      web: 4,
    }),
  },
})

export interface ComposerProps {
  composerHeight?: number
  text?: string
  placeholder?: string
  placeholderTextColor?: string
  textInputProps?: Partial<TextInputProps>
  textInputStyle?: TextInputProps['style']
  textInputAutoFocus?: boolean
  keyboardAppearance?: TextInputProps['keyboardAppearance']
  multiline?: boolean
  disableComposer?: boolean
  onTextChanged?(text: string): void
  onInputSizeChanged?(contentSize: { width: number; height: number }): void
}

export default class Composer extends React.Component<ComposerProps> {
  static defaultProps = {
    composerHeight: MIN_COMPOSER_HEIGHT,
    text: '',
    placeholderTextColor: Color.defaultColor,
    placeholder: DEFAULT_PLACEHOLDER,
    textInputProps: null,
    multiline: true,
    disableComposer: false,
    textInputStyle: {},
    textInputAutoFocus: false,
    keyboardAppearance: 'default',
    onTextChanged: () => {},
    onInputSizeChanged: () => {},
  }

  static propTypes = {
    composerHeight: PropTypes.number,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    textInputProps: PropTypes.object,
    onTextChanged: PropTypes.func,
    onInputSizeChanged: PropTypes.func,
    multiline: PropTypes.bool,
    disableComposer: PropTypes.bool,
    textInputStyle: PropTypes.any,
    textInputAutoFocus: PropTypes.bool,
    keyboardAppearance: PropTypes.string,
  }

  contentSize?: { width: number; height: number } = undefined

  onContentSizeChange = (e: any) => {
    const { contentSize } = e.nativeEvent

    // Support earlier versions of React Native on Android.
    if (!contentSize) {
      return
    }

    if (
      !this.contentSize ||
      (this.contentSize &&
        (this.contentSize.width !== contentSize.width ||
          this.contentSize.height !== contentSize.height))
    ) {
      this.contentSize = contentSize
      this.props.onInputSizeChanged!(this.contentSize!)
    }
  }

  onChangeText = (text: string) => {
    this.props.onTextChanged!(text)
  }

  render() {
    console.tron.log("this.props.composerHeight",this.props.composerHeight)
    return (
      <View style={[styles.textInputContainer,this.props.composerHeight > 34 ?{marginBottom:3,marginTop:3}:{marginTop:1,marginBottom:1}]}>
        <TextInput
              testID={this.props.placeholder}
              accessible
              accessibilityLabel={this.props.placeholder}
              placeholder={this.props.placeholder}
              placeholderTextColor={this.props.placeholderTextColor}
              multiline={this.props.multiline}
              editable={!(this.props.disableComposer)}
              onChange={this.onContentSizeChange}
              onContentSizeChange={this.onContentSizeChange}
              onChangeText={this.onChangeText}
              style={[
                styles.textInput,
                this.props.textInputStyle,
                { 
                  height: this.props.composerHeight,
                  ...Platform.select({
                    web: {
                      outlineWidth: 0,
                      outlineColor: 'transparent',
                      outlineOffset: 0,
                    },
                  }),
                },
              ]}
              autoFocus={this.props.textInputAutoFocus}
              value={this.props.text}
              enablesReturnKeyAutomatically
              underlineColorAndroid='transparent'
              keyboardAppearance={this.props.keyboardAppearance}
              {...this.props.textInputProps}
            />
      </View>
   
    )
  }
}
