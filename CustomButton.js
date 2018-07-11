/****************************************************************************************************************
 - Custom Button
	<CustomButton
		activeOpacity={0.7}
		buttonStyle={{ }}
		buttonTextStyle={{ }}
		onPress={() => {}} >
		{Children Value}
	</Button>

	* underlayColor : Button Touch시 색상
	* buttonStyle : Button의 Style
	* buttonTextStyle : Button Text Style
	* buttonText : Button Text
*****************************************************************************************************************/
import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	TouchableHighlight,
} from 'react-native';

class CustomButton extends React.Component {
	constructor(props) {
		super(props);

		this.state = {

		};
	}

	componentDidMount () {

	}

	componentWillUnmount () {

	}

	render () {
		return (
			<TouchableOpacity
				accessibilityComponentType="button"
				accessibilityLabel={this.props.buttonText}
				accessibilityTraits="button"
				activeOpacity={this.props.activeOpacity}
				style={[styles.buttonStyle, this.props.buttonStyle]}
				onPressIn={() => {
					if (this.props.onPressIn != undefined) {
						this.props.onPressIn();
					}
				}}
				onPressOut={() => {
					if (this.props.onPressOut != undefined) {
						this.props.onPressOut();
					}
				}}
				onPress={() => {
					if (this.props.onPress != undefined) {
						this.props.onPress();
					}
				}} >
                {this.renderChildren()}
			</TouchableOpacity>
		)
	}

	renderChildren () {
    	let childElements = [];

		React.Children.forEach(this.props.children, (item) => {
			if (typeof item === 'string' || typeof item === 'number') {
				const element = (
					<Text
						key={item}
						style={[ styles.buttonTextStyle, this.props.buttonTextStyle ]} >
						{item}
					</Text>
				);
				childElements.push(element);
			} else if (React.isValidElement(item)) {
				childElements.push(item);
			}
		});

		return (childElements);
	}
}

const styles = StyleSheet.create({
	buttonStyle: {
		alignItems: 'center',
		justifyContent: 'center',

		width: 100,
		height: 50,
	},
	buttonTextStyle: {

	},
});

CustomButton.defaultProps = {
	buttonStyle 	: {},
	buttonTextStyle : {},
	activeOpacity 	: 0.4,
	underlayColor 	: "transparent",
	buttonText 		: "Custom Button",
};
module.exports = CustomButton;
