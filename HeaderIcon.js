/***************************************************************************************************************
<HeaderIcon
	onPress={() => {

	}}
	iconName={"menu"}
	iconColor={"rgb(24, 24, 24)"}
	iconSize={24} />
****************************************************************************************************************/

import React from 'react';
import {
	Animated,
	Easing,
	Text,
	Platform,
	View,
	TouchableHighlight,
	TouchableNativeFeedback,
} from 'react-native';

import Icon 	from 'react-native-vector-icons/MaterialIcons';

const EaseInOut = Easing.inOut(Easing.ease);
const ANDROID_VERSION_LOLLIPOP = 21;

class HeaderIcon extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			position: new Animated.Value(0),
		};
	}

	componentWillMount () {

	}

	componentWillUnmount () {

	}

	render () {
	    if (Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP) {
			return (
				<TouchableNativeFeedback
			        accessibilityComponentType="button"
			        accessibilityLabel={this.props.accessibilityLabel}
			        accessibilityTraits="button"
					delayPressIn={0}
					pressColor={'rgba(0, 0, 0, .16)'}
					background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .16)', true)}
					onPress={() => {
						this.pressIcon();

						if (this.props.onPress !== undefined) {
							this.props.onPress();
						}
					}}>
					<View>
						<Icon name={this.props.iconName} size={this.props.iconSize} style={{ margin: 16, }} color={this.props.iconColor} />
						<Animated.View style={{ opacity: this.state.position.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }), }} />
					</View>
				</TouchableNativeFeedback>
			);
		} else {
			return (
				<TouchableHighlight
			        accessibilityComponentType="button"
			        accessibilityLabel={this.props.accessibilityLabel}
			        accessibilityTraits="button"
					underlayColor={'transparent'}
					onPress={() => {
						if (this.props.onPress !== undefined) {
							this.props.onPress();
						}
					}}>
					<Icon name={this.props.iconName} size={this.props.iconSize} style={{ margin: Platform.OS === "android" ? 16 : 10, }} color={this.props.iconColor} />
				</TouchableHighlight>
			);
		}
	}

	pressIcon () {
		let firstAnimation = Animated.timing(
			this.state.position,
			{
				toValue: 1,
				duration: 250,
		        easing: EaseInOut,
			}
		)
		let lastAnimation = Animated.timing(
			this.state.position,
			{
				toValue: 0,
				duration: 250,
		        easing: EaseInOut,
			}
		)

		Animated.sequence([firstAnimation, lastAnimation]).start();
	}
}

HeaderIcon.defaultProps = {
	iconName 	: 'list',
	iconColor 	: 'rgb(24, 24, 24)',
	iconSize 	: 24,
	accessibilityLabel: '',
};

module.exports = HeaderIcon;
