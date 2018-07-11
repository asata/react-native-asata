/****************************************************************************************************************
 - 로그인 입력창 UI
	<LoginFormView
		width=
		appColor={ }
		loginStyle={{ }}
		loginButtonStyle={{ }}
		loginButtonTextStyle={{ }}
		onLoginComplete={(userID, password, token) => {

		}}
		useJoin={true}
		joinButtonStyle={{ }}
		joinButtonTextStyle={{ }}
		onJoin={() => {

		}}

		useFind={false}
		onFindID={() => {

		}}
		onFindPassword={() => {

		}} />

	 * appColor : Button 및 TextInput 색상
	 * loginStyle : LoginFormView의 Style
	 * loginButtonStyle : Login Button Style
	 * loginButtonTextStyle : Login Text Style
	 * onJoin : 회원가입 버튼 터치시
	 * onLoginComplete : 로그인 성공시 처리할 함수
*****************************************************************************************************************/

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableHighlight,
	View,
} from 'react-native';

import Icon 			from 'react-native-vector-icons/MaterialIcons';

import {
	FontNormalize,
	FocusNextField,
	ServerRequest
} from './Common';
import {
	AlertMessage,
	FlatButton
} from './';

class LoginFormView extends Component<{}> {
	constructor(props) {
		super(props);

		this.state = {
			userID      : '',
			password    : '',

			isSecure    : true,
		};
	}

	componentWillMount () {

	}

	componentWillUnmount () {

	}

	render() {
		let appColor 		= this.props.appColor;
		let buttonWidthHalf = (this.props.width - 20) / 2;
		let buttonWidthFull = this.props.width;

		let secureIcon  = 'visibility';
		if (this.state.isSecure) {
			secureIcon = 'visibility-off';
		}

		return (
			<View style={[this.props.loginStyle, { width: this.props.width, }]}>
				<View style={{ flexDirection: 'row', }}>
					<TextInput
						underlineColorAndroid="transparent"
						placeholder={"ID를 입력 해 주세요."}
						placeholderTextColor="#BEBEBE"
						ref="userid"
						autoCapitalize={"none"}
						autoCorrect={false}
						blurOnSubmit={false}
						returnKeyType="next"
						value={this.state.userID}
						style={[ styles.textInputStyle, { width: this.props.width, height: 55, borderColor: appColor, }]}
						onChangeText={(text) => {
							this.setState({ userID: text.replace(/[^a-zA-Z0-9]/g, ''), });
						}}
						onSubmitEditing={() => {
							FocusNextField([this, 'password']);
						}} />
				</View>

				<View style={{ flexDirection: 'row', width: this.props.width, }}>
					<TextInput
						underlineColorAndroid="transparent"
						placeholder={"비밀번호를 입력 해 주세요."}
						placeholderTextColor="#BEBEBE"
						ref="password"
						autoCapitalize={"none"}
						autoCorrect={false}
						returnKeyType="done"
						secureTextEntry={this.state.isSecure}
						style={[ styles.textInputStyle, { width: (this.props.width - 53), height: 55, borderColor: appColor, borderTopWidth: 0, borderRightWidth: 0, }]}
						onChangeText={(text) => {
							this.setState({ password: text });
						}}
						onSubmitEditing={() => {
							this.onLogin();
						}} />
					<TouchableHighlight
						underlayColor="white"
						style={[ styles.showPasswordView, { borderColor: appColor, }]}
						onPress={() => {
							this.setState({ isSecure: !this.state.isSecure, });
						}}>
						<Icon name={secureIcon} size={24} color={'#8C8C8C'} />
					</TouchableHighlight>
				</View>

				<View style={{ flexDirection: 'row', justifyContent: this.props.useJoin ? 'space-between' : 'center', width: this.props.width, marginTop: 20, }}>
					{this.props.useJoin ?
						<View style={{ borderColor: appColor, borderWidth: 1, }}>
							<FlatButton
								borderRadius={0}
								backgroundColor={'transparent'}
								borderColor={'transparent'}
								shadowHeight={2}
								pressShadowHeight={0}
								containerStyle={[
									styles.buttonStyle,
									{ width: buttonWidthHalf, height: 38, borderWidth: 2, },
									this.props.joinButtonStyle
								]}
								contentStyle={[ styles.buttonTextStyle, this.props.joinButtonTextStyle, { color: appColor, }]}
								onPress={() => {
									if (this.props.onJoin != undefined) {
										this.props.onJoin();
									}
								}} >
								{this.props.joinText}
							</FlatButton>
						</View> : null}

					<FlatButton
						borderRadius={0}
						borderColor={appColor}
						backgroundColor={appColor}
						pressShadowHeight={0}
						containerStyle={[
							styles.buttonStyle,
							{ width: this.props.useJoin ? buttonWidthHalf : buttonWidthFull, },
							this.props.loginButtonStyle
						]}
						contentStyle={[ styles.buttonTextStyle, this.props.loginButtonTextStyle ]}
						onPress={() => {
							this.onLogin();
						}} >
						{this.props.loginText}
					</FlatButton>
				</View>

				{this.props.useFind ?
					<View style={{ flexDirection: 'row', justifyContent: 'center', width: this.props.width, marginTop: 20, }}>
						<TouchableHighlight
							underlayColor="transparent"
							onPress={() => {
								if (this.props.onFindID != undefined) {
									this.props.onFindID();
								}
							}}>
							<Text style={[ styles.buttonTextStyle, this.props.joinButtonTextStyle, { color: appColor, }]}>ID 찾기</Text>
						</TouchableHighlight>
						<Text style={[ styles.buttonTextStyle, this.props.joinButtonTextStyle, { color: appColor, backgroundColor: 'transparent', }]}> | </Text>
						<TouchableHighlight
							underlayColor="transparent"
							onPress={() => {
								if (this.props.onFindPassword != undefined) {
									this.props.onFindPassword();
								}
							}}>
							<Text style={[ styles.buttonTextStyle, this.props.joinButtonTextStyle, { color: appColor, }]}>비밀번호 찾기</Text>
						</TouchableHighlight>
					</View> : null}
			</View>
		);
	}

	onLogin() {
		var self = this;

		if (self.state.userID == "") {
			AlertMessage(
				"로그인 실패",
				"ID를 입력 해 주세요.",
				[{ text: "확인", action: FocusNextField, params: [this, "userid"] }]
			);
		} else if (self.state.password == "") {
			AlertMessage(
				"로그인 실패",
				"비밀번호를 입력 해 주세요.",
				[{ text: "확인", action: FocusNextField, params: [this, "password"] }]
			);
		} else {
			ServerRequest("users/signIn", 'LOGIN', '', self.state.userID + ":" + self.state.password)
			.then((responseJson) => {
				if (responseJson.result == "success") {
					let memberInfo = {
						memberID 	: self.state.userID,
						memberIdx 	: responseJson.userIdx,
						memberType 	: responseJson.userType,
						token 		: responseJson.token
					};

					// 로그인 성공시
					if (self.props.onLoginComplete != undefined) {
						self.props.onLoginComplete(memberInfo);
					}
				} else {
					AlertMessage("로그인 실패", responseJson.message);
				}
			}).catch((error) => {
				if (error.title != undefined && error.msg != undefined)
					AlertMessage(error.title, error.msg);
			});
		}
	}
}

const styles = StyleSheet.create({
	textInputStyle: {
		borderWidth: 1,
		paddingLeft: 10,
		backgroundColor: 'white',
	},
	buttonStyle: {
		margin: 0,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',

		height: 40,
	},
	buttonTextStyle: {
		fontSize: FontNormalize(14),
		fontWeight: 'bold',
	},

	showPasswordView: {
		position: 'absolute',
		right : 0,
		top: 0,
		bottom: 0,

		width: 55,
		height: 55,

		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',

		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
	},
});

LoginFormView.defaultProps = {
	width				: 300,
	appColor			: 'black',
	loginStyle			: { justifyContent: 'center', alignItems: 'center', },
	useJoin				: false,
	joinText			: "회원가입",
	joinButtonStyle		: {},
	joinButtonTextStyle	: {},
	loginText			: "로그인",
	loginButtonStyle	: {},
	loginButtonTextStyle: {},
	useFind				: false,
};
module.exports = LoginFormView;
