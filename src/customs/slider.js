/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {View, PanResponder, Animated} from 'react-native';

import PropTypes from 'prop-types';
import {ImageView} from '../res/widgets/ImageView';
import {R} from '../constant';
import {TextView} from '../res/widgets/TextView';

export class Slider extends Component {
  constructor(props) {
    super(props);
    this.canReachEnd = true;
    this.totalWidth = 0;
    this.state = {
      offsetX: new Animated.Value(0),
      squareWidth: 0,
      childOpacity: 1,
      width: 'auto',
      zIndex: -1,
      showChildren: false,
    };
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return !this.canReachEnd;
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return true;
      },
      onPanResponderGrant: (evt, gestureState) => {
        console.info('Pan grant.');
        this.maxWidth();
        this.props.onStart();
        this.canReachEnd = true;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (!this.props.disableSliding) {
          const margin = this.totalWidth - this.state.squareWidth * 1.025;
          if (gestureState.dx < -margin) {
            this.setState({childOpacity: 0});
            this.onEndReached();
            return;
          } else if (gestureState.dx > -margin && gestureState.dx < 0) {
            this.setState({
              offsetX: new Animated.Value(gestureState.dx),
              childOpacity: 1 - -gestureState.dx / margin,
            });
          } else if (gestureState.dx <= 0) {
            this.setState({
              offsetX: new Animated.Value(gestureState.dx),
              childOpacity: 1 - -gestureState.dx / margin,
            });
          }
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        console.info('Pan released.');
        this.resetWidth();
        this.resetBar();
        this.props.onStop();
        this.canReachEnd = true;
      },
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    });
  }

  onEndReached = () => {
    this.canReachEnd && this.props.onEndReached();
    this.canReachEnd = false;
    this.resetWidth();
    this.resetBar();
  };

  resetWidth() {
    if (!this.props.disableSliding) {
      this.setState({
        zIndex: -1,
        showChildren: false,
      });
    }
  }
  maxWidth() {
    if (!this.props.disableSliding) {
      this.setState({
        zIndex: 1,
        showChildren: true,
      });
    }
  }

  resetBar() {
    Animated.timing(this.state.offsetX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    this.setState({childOpacity: 1, offsetX: new Animated.Value(0)});
  }

  render() {
    return (
      <View
        onLayout={event => {
          this.totalWidth = event.nativeEvent.layout.width;
        }}
        style={[
          this.props.containerStyle,
          {
            alignItems: 'flex-end',
            width: '100%',
            zIndex: this.state.zIndex,
          },
        ]}>
        <Animated.View
          onLayout={event => {
            this.setState({squareWidth: event.nativeEvent.layout.width});
          }}
          style={[
            {transform: [{translateX: this.state.offsetX}]},
            this.props.slideOverStyle,
          ]}
          {...this._panResponder.panHandlers}>
          <View
            style={{
              marginStart: 12,
              marginEnd: 12,
              backgroundColor: this.state.showChildren
                ? R.color.chatInputMicActive
                : undefined,
              borderRadius: 32,
            }}>
            <ImageView
              src={
                this.props.disableSliding
                  ? R.drawable.ic_mute
                  : R.drawable.ic_record
              }
              height={24}
              width={24}
              marginBottom={6}
              marginEnd={6}
              marginTop={6}
              marginStart={6}
            />
          </View>
        </Animated.View>

        <View
          style={[
            {
              alignSelf: 'flex-start',
              position: 'absolute',
              zIndex: -1,
              opacity:
                this.props.isOpacityChangeOnSlide === true
                  ? this.state.childOpacity
                  : 1,
            },
            this.props.childrenContainer,
          ]}>
          {this.state.showChildren && (
            <View
              style={{
                marginStart: 12,
                marginEnd: 40,
                flexDirection: 'row',
                alignItems: 'center',
                height: 48,
              }}>
              <ImageView src={R.drawable.ic_delete} height={16} width={16} />
              <TextView
                singleLine={true}
                textSize={12}
                textColor={R.color.chatInputRecordingText}
                text="<< Slide to delete"
                marginStart={8}
              />
              <TextView
                singleLine={true}
                textSize={12}
                textStyle={'bold'}
                text={this.props.text}
                marginStart={8}
              />
            </View>
          )}
        </View>

        <View
          style={[
            {
              alignSelf: 'flex-end',
              position: 'absolute',
              width: this.state.offsetX._value,
              height: 100,
            },
            this.props.slideOverStyle,
          ]}></View>
      </View>
    );
  }
}

Slider.propTypes = {
  disableSliding: PropTypes.bool,
  childrenContainer: PropTypes.object,
  containerStyle: PropTypes.object,
  slideOverStyle: PropTypes.object,
  isOpacityChangeOnSlide: PropTypes.bool,
  text: PropTypes.string,
  onEndReached: PropTypes.func,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
};

Slider.defaultProps = {
  disableSliding: false,
  childrenContainer: {},
  containerStyle: {
    position: 'absolute',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    height: '100%',
    borderRadius: 8,
    backgroundColor: R.color.chatInputBackgroud,
  },
  slideOverStyle: {
    backgroundColor: 'rgba(255,255,255,0.0)',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  isOpacityChangeOnSlide: false,
  onEndReached: () => {},
};
