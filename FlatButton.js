import React, {
	Component
} from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

class FlatButton extends Component {
	constructor(props){
		super(props);

		const {
			backgroundColor,
			borderColor,
			borderLeftWidth,
			borderRadius,
			borderRightWidth,
			shadowHeight,
			pressShadowHeight,
			type,
		} = this.props;

		let pressInStyle = {
			borderColor      : 'transparent',
			borderBottomWidth: 0,
			borderLeftWidth  : 0,
			borderRightWidth : 0
		};

		let buttonContainer = {
			borderRadius     : props.borderRadius,
			borderTopWidth 	 : props.shadowHeight,
			borderBottomWidth: props.shadowHeight,
			backgroundColor  : props.backgroundColor,
			borderColor      : props.borderColor,
			borderLeftWidth  : props.borderLeftWidth,
			borderRightWidth : props.borderRightWidth,
            justifyContent   : 'center',
            alignItems       : 'center'
		};

		this.state = {
			style 			: [ buttonContainer, props.buttonStyle ],
			pressInStyle 	: [ pressInStyle, props.buttonPressStyle ],
			isBorderPresent : true,
		}

		this._pressIn = this._pressIn.bind(this);
		this._pressOut = this._pressOut.bind(this);
	}

	_pressIn(){
		this.setState({ isBorderPresent: false, });
	}

	_pressOut(){
		this.setState({ isBorderPresent: true, });
	}

	render() {
		const { activeOpacity, buttonContainer, containerStyle, contentStyle, onPress, shadowHeight, pressShadowHeight, child, buttonText } = this.props;
		const { isBorderPresent, style } = this.state;

		return (
			<TouchableOpacity
				{...this.props}
				onPress={onPress}
				onPressIn={this._pressIn}
				onPressOut={this._pressOut}
				activeOpacity={activeOpacity}
				style={[ buttonContainer, style, { borderBottomWidth: isBorderPresent ? shadowHeight : pressShadowHeight }, containerStyle]}>
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
						style={[ styles.text, this.props.contentStyle ]} >
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
	text:{
		color: 'white',
		fontSize: 18,
		// fontWeight: 'bold'
	}
});

FlatButton.defaultProps = {
	borderRadius 		: 8,
	shadowHeight 		: 2,
	pressShadowHeight 	: 0,
	activeOpacity 		: 0.9,
	backgroundColor 	: '#34495e',
	borderColor 		: '#2c3e50',
	borderLeftWidth 	: 0.5,
	borderRightWidth	: 0.5
};
export default FlatButton;
