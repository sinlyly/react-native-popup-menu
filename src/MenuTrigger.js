import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { debug } from './logger.js';
import { makeTouchable } from './helpers';

export default class MenuTrigger extends Component {

  _onPress() {
    debug('trigger onPress');
    this.props.onPress && this.props.onPress();
    this.context.menuActions.openMenu(this.props.menuName);
  }

  _onLongPress(){
      this.props.onLongPress && this.props.onLongPress();
      this.context.menuActions.openMenu(this.props.menuName);
  }

  render() {
    const { disabled, onRef, text, children, style, customStyles, ...other } = this.props;
    let longDisable = this.props.longDisable;
    if(longDisable == undefined){
      longDisable = true
    }
    const onPress = () => !disabled && this._onPress();
    const onLongPress = () => !longDisable && this._onLongPress();
    const { Touchable, defaultTouchableProps } = makeTouchable(customStyles.TriggerTouchableComponent);
    return (
      <View ref={onRef} collapsable={false} style={customStyles.triggerOuterWrapper}>
        <Touchable
          onPress={onPress}
          onLongPress={onLongPress}
          {...defaultTouchableProps}
          {...customStyles.triggerTouchable}
        >
          <View {...other} style={[customStyles.triggerWrapper, style]}>
            {text ? <Text style={customStyles.triggerText}>{text}</Text> : children}
          </View>
        </Touchable>
      </View>
    );
  }

}

MenuTrigger.propTypes = {
  disabled: PropTypes.bool,
  text: PropTypes.string,
  onPress: PropTypes.func,
  customStyles: PropTypes.object,
};

MenuTrigger.defaultProps = {
  disabled: false,
  customStyles: {},
};

MenuTrigger.contextTypes = {
  menuActions: PropTypes.object,
};
