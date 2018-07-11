// 사용법
//  - 사용할 function을 기재
//  import {
//     ServerRequest,
// }  from './Common';

/******************************************************************************************
EmailCheck (mail)
 - 이메일 주소 검사

PhoneNumberCheck (phone)
CellphoneNumberCheck (phone)
HomephoneNumberCheck (phone)
 - 전화번호 검증 

PhoneFomatter (phone, type)
 - 전화번호 출력 
 - type이 0인 경우 중간 번호 ****로 표시

FontNormalize (size)
 - 화면 크기에 따라 글자 크기 조정

NumberFormat (value, c, d, t)
 - 숫자(value)를 지정한 양식의 문자열로 변환
 - 소수점 이하 자리수(c), 소수점 구분 기호(.), 천단위 구분 기호(,)

NumberAddUnit (value, referenceValue, unitType, c)
 - 숫자(value)를 지정한 단위 양식에 맞춰 출력
 - 단위 구분 기준값(referenceValue), 단위(unitType, array로 입력), 소수점 이하 자리수(c)

RandomColor () 
 - 무작위 색상 (Hex code) 반환

ServerRequest(url, method, token, data)
 - RestAPI 호출
 - method : GET, POST, PUT, DELETE, POST_FILE, PUT_FILE, LOGIN, PASSWORD
 - data : object or string
******************************************************************************************/

import React from 'react';
import {
	AppState,
	Dimensions,
	Platform,
	PixelRatio,
	NetInfo,
} from 'react-native';

import base64  		from 'base64-js';

const ServerURL 	= "http://teamsf.co.kr/";
const TokenType 	= "bearer ";
const DeviceWidth 	= Dimensions.get('window').width;
const DeviceHeight 	= Dimensions.get('window').height;
const DisplayRate 	= DeviceWidth / 375;

export function GetServerURL () {
	return ServerURL;
}
// 디자인 가로 길이에 맞게 비율 조정
export function GetDisplayRate (value) {
	return Math.floor(DisplayRate * value);
}

// iPhone X 여부 Check
export function isIPhoneX () {
	if (Platform.OS === 'ios' && DeviceHeight == 812) {
		return true;
	}

	return false;
}

// 지정한 TextInput으로 커서 이동
export function FocusNextField (params) {
	let self;
	let nextField;

	if (typeof(params) === 'string') {
		self = this;
		nextField = params;
	} else {
		self = params[0];
		nextField = params[1];
	}

	setTimeout(function () {
		self.refs[nextField].focus();
	}, 200);
}

// 이메일 정규식
export function EmailCheck (mail) {
	var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
	if (!regExp.test(mail)) {
		return false;
	} else {
		return true;
	}
}

export function PhoneNumberCheck (phone) {
	var regExp1 = /^\d{2,3}-?\d{3,4}-?\d{4}$/;
	var regExp2 = /^\d{4}-?\d{4}$/;
	var regExp3 = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
	if (!regExp1.test(phone) && !regExp2.test(phone) && !regExp3.test(phone)) {
		return false;
	} else {
		return true;
	}
}

// 휴대전화 번호 정규식
export function CellphoneNumberCheck (phone) {
	var regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
	if (!regExp.test(phone)) {
		return false;
	} else {
		return true;
	}
}

// 일반 전화 정규식 (ex: 054-123-1234, 1677-1677 ...)
export function HomephoneNumberCheck (phone) {
	var regExp1 = /^\d{2,3}-?\d{3,4}-?\d{4}$/;
	var regExp2 = /^\d{4}-?\d{4}$/;
	if (!regExp1.test(phone) && !regExp2.test(phone)) {
		return false;
	} else {
		return true;
	}
}

// 전화번호 - 넣음, type을 0으로 지정시 중간 숫자 숨김
export function PhoneFomatter(phone, type) {
	var formatNum = '';

	if (phone.length == 11) {
		if (type == 0) {
			formatNum = phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
		} else {
			formatNum = phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
		}
	} else if (phone.length == 8) {
		formatNum = phone.replace(/(\d{4})(\d{4})/, '$1-$2');
	} else {
		if (phone.indexOf('02') == 0) {
			if (type == 0) {
				if (phone.length == 10) {
					formatNum = phone.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');
				} else {
					formatNum = phone.replace(/(\d{2})(\d{3})(\d{4})/, '$1-***-$3');
				}
			} else {
				if (phone.length == 10) {
					formatNum = phone.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
				} else {
					formatNum = phone.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
				}
			}
		} else {
			if (type == 0) {
				formatNum = phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');
			} else {
				formatNum = phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
			}
		}
	}

	return formatNum;
}

export function FontNormalize(size) {
	if (Platform.OS === 'ios') {
		if (DeviceWidth == 320) {
			// iPhone 3GS, 4, 4S
			// 320 * 480
			// iPhone5, 5S, SE
			// 320 * 568
			return Math.round(PixelRatio.roundToNearestPixel(size)) - 2;
		} else if (DeviceWidth == 375) {
			// iPhone6, 6S, 7
			// 375 * 667
			return Math.round(PixelRatio.roundToNearestPixel(size));
		} else if (DeviceWidth == 414) {
			// iPhone6+, 6S+, 7+
			// 414 * 739
			return Math.round(PixelRatio.roundToNearestPixel(size)) + 2;
		} else {
			// iPad (3~5), iPad Mini (2~4), iPad Air (1~2), iPad Pro 9.7"
			// 768 * 1024
			//  -> 320 * 480
			// iPad Pro 10.5"
			// 834 x 1112
			//  -> 320 * 480
			// iPad Pro 12.9"
			// 1024 x 1366
			//  -> 320 * 568
			return Math.round(PixelRatio.roundToNearestPixel(size)) + 2;
		}
	} else {
		return Math.round(PixelRatio.roundToNearestPixel(size));
	}
}

// value    : 숫자
// c        : 소수점 이하 자리수 (기본값 : 2)
// d        : 소수점 구분 기호 (기본값 : .)
// t        : 천단위 구분 기호 (기본값 : ,)
export function NumberFormat (value, c, d, t) {
	var c = isNaN(c = Math.abs(c)) ? 2 : c,
		d = d == undefined ? "." : d,
		t = t == undefined ? "," : t,
		s = value < 0 ? "-" : "",
		i = parseInt(value = Math.abs(+value || 0).toFixed(c)) + "",
		j = (j = i.length) > 3 ? j % 3 : 0;

	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(value - i).toFixed(c).slice(2) : "");
}

// let unitType2 = ["W/h", "kW/h", "MW/h"];
// value            : 측정값
// referenceValue   : 단위 구분 기준값
// unitType         : 단위, array로 전달, unitType2 = ["W/h", "kW/h", "MW/h"]
// c                : 소수점 이하 출력 자리수 (기본값 : 2)
export function NumberAddUnit (value, referenceValue, unitType, c = 2) {
	let unitIndex = 0;
	for (let i = unitType.length - 1; i > 0; i--) {
		if (value > Math.pow(referenceValue, i)) {
			unitIndex = i;
			break;
		}
	}

	return numberFormat(value / Math.pow(referenceValue, unitIndex), c) + unitType[unitIndex];
}

export function RandomColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// base64 문자열을 반환
function toUTF8Array(str) {
	var utf8 = [];

	for (var i=0; i < str.length; i++) {
		var charcode = str.charCodeAt(i);

		if (charcode < 0x80) {
			utf8.push(charcode);
		} else if (charcode < 0x800) {
			utf8.push(0xc0 | (charcode >> 6),
				0x80 | (charcode & 0x3f));
		} else if (charcode < 0xd800 || charcode >= 0xe000) {
			utf8.push(0xe0 | (charcode >> 12),
				0x80 | ((charcode>>6) & 0x3f),
				0x80 | (charcode & 0x3f));
		} else {
			i++;
			// UTF-16 encodes 0x10000-0x10FFFF by
			// subtracting 0x10000 and splitting the
			// 20 bits of 0x0-0xFFFFF into two halves
			charcode = 0x10000 + (((charcode & 0x3ff)<<10)
				| (str.charCodeAt(i) & 0x3ff));
				utf8.push(0xf0 | (charcode >>18),
				0x80 | ((charcode>>12) & 0x3f),
				0x80 | ((charcode>>6) & 0x3f),
				0x80 | (charcode & 0x3f));
		}
	}

	return utf8;
}

// url는 필수, method는 없을 경우 GET으로 처리, token, formBody는 없을 경우 보내지 않음
//  - method별 필요 변수, 로그인 token이 필요 없을 경우 token은 보내지 않아도 됨
//  - 회원 가입 등 token이 없을 경우 token은 '' 또는 undefined로 전달
// 		GET 		(url, method, token, data(object))
// 		DELETE 		(url, method, token, data(object))
// 		POST 		(url, method, token, data(object))
// 		PUT 		(url, method, token, data(object))
// 		POST_FILE	(url, method, token, data(object))
// 		PUT_FILE	(url, method, token, data(object))
// 		LOGIN 		(url, method, '', data(string))
// 		PASSWORD 	(url, method, token, data(string))
export function ServerRequest(url, method, token, data) {
	if (method == undefined || method == '') {
		method = "GET";
	}
	method = method.toUpperCase();

	let option = {
		method: method,
		headers: {
			'Accept': 'application/json',
		}
	};

	if (token != undefined || token != '') {
		option.headers['Authorization'] = TokenType + token;
	}

	if (method == "GET" || method == "DELETE") {
		option.headers['Content-Type'] = 'application/json';

		if (data != undefined && typeof(data) === 'object') {
			let paramUrl = '';
			for (let key in data) {
				let concatStr = paramUrl.length == 0 ? '?' : '&';
				paramUrl += concatStr + key + "=" + data[key];
			}

			url += paramUrl;
		}
		
	} else if (method == "POST" || method == "PUT") {
		// POST, PUT (등록, 수정시)
		option.headers['Content-Type'] = 'application/x-www-form-urlencoded';

		if (data != undefined && typeof(data) === 'object') {
			let formBody = [];
			for (let key in data) {
				formBody.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
			}
			formBody = formBody.join("&");
			option.body = formBody;
		}

	} else if (method == "POST_FILE" || method == "PUT_FILE") {
		// POST, PUT - 파일 업로드 등
		option.method = method == "POST_FILE" ? "POST" : "PUT";		
		option.headers['Content-Type'] = 'multipart/form-data;charset=UTF-8';

		if (data != undefined && typeof(data) === 'object') {
			let formData = new FormData();
			for (let key in data) {
				if (key === 'file') {
					for (let i = 0; i < data[key].length; i++) {
						formData.append('file[]', data[key][i]);
					}
				} else {
					formData.append(key, data[key]);
				}
			}
			option.body = formData;
		}

	} else if (method == "LOGIN") {
		// 로그인을 할 경우 
		option.method = "POST";
		option.headers['Authorization'] = TokenType + base64.fromByteArray(toUTF8Array(data));
		option.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	} else if (method == "PASSWORD") {
		option.method = "GET";
		option.headers['password'] = data;
		option.headers['Content-Type'] = 'application/json';
	}

	return requestServer(url, option);
}

function requestServer(apiName, option) {
	return new Promise(function(success, failed) {
		if (AppState.currentState == "active" || AppState.currentState == "unknown") {
			var errorFlag = false;
			
			fetch(ServerURL + apiName, option)
			.then((response) => {
				if (response.status == 200) {
					return response.json();
				} else {
					failed({ 'title': 'Network Error', 'msg': "잠시 뒤 다시 시도 해 주세요." });
				}
			})
			.then((responseJson) => {
				if (!errorFlag) success(responseJson);
			})
			.catch((error) => {
				errorFlag = true;
				if (error.message == undefined) {
					failed(error);
				} else if (error.message == "Network request failed") {
					failed({ 'title': 'Network Error', 'msg': "네트워크 연결 상태를 확인 해 주세요.", 'error': error });
				} else {
					failed(error);
				}
			});
		} else {
			failed("background");
		}
	});
}