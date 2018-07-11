/****************************************************************************************************************
import AlertMessage       from './lib/AlertMessage';
AlertMessage("title", "message", [{ text: '예', action: this.sample, params: "aaa" }, { text: '예', action: this.sample, params: [this, "aaa"]}, { text: '아니오' }]);
*****************************************************************************************************************/

import React from 'react';
import {
	Alert,
	Platform,
} from 'react-native';

export default function AlertMessage(title, message, answer) {
	let option = [];

	if (answer === undefined) {
		option.push({ text: "확인", onPress: () => { return true; }});
	} else if (answer.length == undefined) {
		option.push({ text: "확인", onPress: () => { return true; }});
	} else {
		answer.map((item) => {
			let alertText = "Button";
			if (item.text !== undefined) {
				alertText = item.text;
			}

			let parameter = null;
			if (item.params !== undefined) {
				parameter = item.params;
			}

			if (item.action !== undefined) {
				option.push({ text: alertText, onPress: () => { item.action(parameter); return true; }});
			} else {
				option.push({ text: alertText, onPress: () => { return true; }});
			}
		})
	}

	Alert.alert(title, message, option);
}
