/****************************************************************************************************************
<NumberInput
	defaultValue={20}
	step={1}
	minValue={0}
	maxValue={100}
	borderColor={'red'}
	textSize={20}
	onChange={(value) => {

	}} />
*****************************************************************************************************************/

import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableHighlight,
} from 'react-native';
import { 
	FontNormalize,
	NumberFormat
} from './Common';

class NumberInput extends Component<{}> {
	constructor(props) {
		super(props);

		this.state = {
			numberValue : this.props.defaultValue,
			stepValue 	: this.props.step,
			minValue 	: this.props.minValue,
			maxValue 	: this.props.maxValue,
		};
	}

	componentWillMount () {

	}

	componentWillUnmount () {

	}

	render() {
		return (
			<View style={ styles.container }>
				<TouchableHighlight
					underlayColor="transparent"
					style={{ width: 50, height: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, borderColor: this.props.borderColor, }}
					onPress={() => { this.downPress(); }} >
					<Text style={{ fontSize: FontNormalize(this.props.textSize), }}>-</Text>
				</TouchableHighlight>

				<View style={{ width: 100, height: 40, alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderBottomWidth: 1, borderColor: this.props.borderColor, }} >
					<Text style={{ fontSize: FontNormalize(this.props.textSize), }}>{NumberFormat(this.state.numberValue, 0)}</Text>
				</View>

				<TouchableHighlight
					underlayColor="transparent"
					style={{ width: 50, height: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderTopRightRadius: 20, borderBottomRightRadius: 20, borderColor: this.props.borderColor, }}
					onPress={() => { this.upPress(); }} >
					<Text style={{ fontSize: FontNormalize(this.props.textSize), }}>+</Text>
				</TouchableHighlight>
			</View>
		);
	}

	upPress () {
		let upValue = this.state.numberValue + this.state.stepValue;
		if (this.state.maxValue >= upValue) {
			this.setState({ numberValue: upValue, });
			if (this.props.onChange != undefined) {
				this.props.onChange(upValue);
			}
		}
	}

	downPress () {
		let downValue = this.state.numberValue - this.state.stepValue;
		if (this.state.minValue <= downValue) {
			this.setState({ numberValue: downValue, });
			if (this.props.onChange != undefined) {
				this.props.onChange(downValue);
			}
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});

NumberInput.defaultProps = {
	defaultValue: 0,
	step: 1,
	minValue: 0,
	maxValue: 100,

	borderColor: 'black',
	textSize: 18,
};
module.exports = NumberInput;
