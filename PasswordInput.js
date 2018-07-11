/****************************************************************************************************************
<PasswordInput
	value={}
	rowStyle={{ width: 200, backgroundColor: 'white', }}
	returnKeyType="done"
	onChangeText={(value) => {

	}}
	onSubmitEditing={() => {

	}} />
*****************************************************************************************************************/

import React, { Component } from 'react';
import {
	TextInput,
	TouchableHighlight,
	View,
	Platform,
} from 'react-native';

import Icon 	from 'react-native-vector-icons/MaterialIcons';

class PasswordInput extends Component<{}> {
	constructor(props) {
		super(props);

		this.state = {
			password 	: '',
			visable 	: true,
		};
	}

	componentWillMount () {

	}

	componentWillUnmount () {

	}

	render () {
		let secureIcon  = 'visibility';
		if (this.state.visable) {
			secureIcon = 'visibility-off';
		}

		return (
			<View style={[{ borderColor: this.props.borderColor, borderBottomWidth: 1, marginHorizontal: 5, marginVertical: 5, }, this.props.rowStyle ]}>
				<TextInput
					placeholder={this.props.placeholder}
					placeholderTextColor={this.props.placeholderTextColor}
					ref={"input"}
					autoCapitalize={'none'}
					autoCorrect={false}
					underlineColorAndroid={'transparent'}
					secureTextEntry={this.state.visable}
					returnKeyType={this.props.returnKeyType}
					style={{ height: 36, marginRight: 36, paddingHorizontal: 5, }}
					onChangeText={(text) => { if (this.props.onChangeText != undefined) this.props.onChangeText(text); }}
					onSubmitEditing={() => { if (this.props.onSubmitEditing != undefined) this.props.onSubmitEditing(); }}
					value={this.props.value} />

				<TouchableHighlight
					underlayColor="transparent"
					style={{ position: 'absolute', right : 0, top: 0, bottom: 0, width: 36, height: 36, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', }}
					onPress={() => {
						this.setState({ visable: !this.state.visable, });
					}}>
					<Icon name={secureIcon} size={24} color={this.props.iconColor} />
				</TouchableHighlight>
			</View>
		)
	}
}

PasswordInput.defaultProps = {
	name 					: "textinput",
	value 					: "textinput",
	visable 				: false,
	returnKeyType 			: 'done',
	rowStyle 				: {},
	placeholder 			: '',
	placeholderTextColor 	: 'rgb(199, 199, 205)',
	iconColor 				: 'grey',
	borderColor 			: 'grey',
};

module.exports = PasswordInput;
