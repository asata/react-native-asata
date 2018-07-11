/****************************************************************************************************************
<CheckBox
	text="check box test"
	textPosition="right"
	iconColor="red"
	checked={this.state.isChecked}
	onPress={() => {
		this.setState({ isChecked: !this.state.isChecked, });
	}} />
*****************************************************************************************************************/

import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableHighlight,
} from 'react-native';

import Icon 	from 'react-native-vector-icons/MaterialIcons';

import {
	FontNormalize,
} from './Common';

class CheckBox extends Component<{}> {
	constructor(props) {
		super(props);

		this.state = {
			isChecked : this.props.checked,
		};
	}

	componentWillMount () {

	}

	componentWillUnmount () {

	}

	render() {
		let iconName = "check-box-outline-blank";
		if (this.state.isChecked) {
			iconName = "check-box";
		}

		let leftText;
		let rightText;

		if (this.props.textPosition == "left") {
			leftText = <Text style={[ styles.textStyle, { fontSize: FontNormalize(this.props.fontSize), color: this.props.textColor, }]}> {this.props.text}</Text>;
		} else if (this.props.textPosition == "right") {
			rightText = <Text style={[ styles.textStyle, { fontSize: FontNormalize(this.props.fontSize), color: this.props.textColor, }]}>{this.props.text} </Text>;
		}

		return (
			<TouchableHighlight
				underlayColor="transparent"
				onPress={() => {
					if (this.props.onPress != undefined) {
						this.props.onPress();
					}

					this.setState({ isChecked: !this.state.isChecked, });
				}}>

				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', }}>
					{leftText}
					<Icon name={iconName} size={this.props.iconSize} color={this.props.iconColor} />
					{rightText}
				</View>
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	textStyle: {
		// alignItems: 'center'
	}
});

CheckBox.defaultProps = {
	text 		: "",
	textPosition: "none",
	checked 	: false,
	textColor 	: 'black',
	iconColor 	: 'black',
	iconSize 	: 24,
	fontSize 	: 14,
};
module.exports = CheckBox;
