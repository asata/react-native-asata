1. Common
 1. Import
```
import {
		ServerRequest,
} from './Common';
```
 2. FocusNextField
	- 지정한 TextInput으로 Focus 이동
	- Parameter : params (array - this, textinput ref value)
 3. EmailCheck
	- 입력한 메일 주소 검증
	- Parameter : mail (string)
 4. PhoneNumberCheck
	- 입력한 전화번호 검증 (일반 전화, 휴대 전화, 0000-0000)
	- Parameter : phone (string)
 5. CellphoneNumberCheck
	- 입력한 휴대 전화 번호 검증
	- Parameter : phone (string)
 6. HomephoneNumberCheck
	- 입력한 휴대 전화 번호 검증 (일반 전화, 0000-0000)
	- Parameter : phone (string)
 7. PhoneFomatter
	- 전화번호에 - 추가
	- Parameter : phone, type (0일 경우 가운데 번호 *로 처리, 010-****-0000)
 8. FontNormalize
	- 화면 크기별로 글자 크기 조정
	- Parameter : size (기본 글자 크기)
 9. NumberFormat
	- 숫자 양식 지정, 소수점 자리수 및 천단위 구분자 등
	- Parameter
		- value : 숫자
		- c : 소수점 이하 자리수 (기본값 : 2)
		- d : 소수점 구분 기호 (기본값 : .)
		- t : 천단위 구분 기호 (기본값 : ,)
 10. NumberAddUnit
	- 지정한 단위로 숫자 표기
	- Parameter
		- value : 측정값
		- referenceValue : 단위 구분 기준값 (예 : 1000)
		- unitType : 단위, array로 전달 (예 : ["W/h", "kW/h", "MW/h"])
		- c : 소수점 이하 출력 자리수 (기본값 : 2)
 11. RandomColor
	- 랜덤한 색상 반환
 12. ServerRequest
	- 서버로 질의 보냄
	- Parameter
		- url : RestAPI 이름
		- method : GET, POST, PUT, DELETE, LOGIN, PASSWORD, POST_FILE, PUT_FILE
		- token : LOGIN 등 사용하지 않을 경우 빈값으로 전달
		- data : 요청시 사용할 값, json value로 전달
2. UI 라이브러리
 1. Import
```
import {
		AlertMessage,
		HeaderIcon,
		LoadingView,
} from './lib';
```
 2. AlertMessage
	- Alert 메시지 표시
	- 사용법
```
AlertMessage("title", "message", [{ text: '예', action: this.sample, params: "aaa" }, { text: '예', action: this.sample, params: [this, "aaa"]}, { text: '아니오' }]);
```
	- Parameter
		- title : Alert 메시지 제목
		- message : Alert 메시지 내용
		- answer : 답변 문구 및 처리 함수, 없을 경우 "확인"
 3. CheckBox
```
<CheckBox
	text="check box test"
	textPosition="right"
	iconColor="red"
	checked={this.state.isChecked}
	onPress={() => {
		this.setState({ isChecked: !this.state.isChecked, });
	}} />
```
 4. Custom Button
```
<CustomButton
	activeOpacity={0.7}
	buttonStyle={{ }}
	buttonTextStyle={{ }}
	onPress={() => { }}
	buttonText=" " />
```
 5. HeaderIcon
```
<HeaderIcon
	iconName={"menu"}
	iconColor={"rgb(24, 24, 24)"}
	iconSize={24}
    onPress={() => { }} />
```
 6. LoadingView
```
<LoadingView
	visible={this.state.visible}
	backgroundColor={'rgba(0, 0, 0, 0.1)'} />
```
 7. LoginFormView
```
<LoginFormView
	width={ }
	appColor={ }
	loginStyle={{ }}
	loginButtonStyle={{ }}
	loginButtonTextStyle={{ }}
	onLoginComplete={(userID, password, token) => { }}
	useJoin={true}
	joinButtonStyle={{ }}
	joinButtonTextStyle={{ }}
	onJoin={() => { }}
	useFind={false}
	onFindID={() => { }}
	onFindPassword={() => { }} />
```
 8. NumberInput
```
<NumberInput
	defaultValue={20}
	step={1}
	minValue={0}
	maxValue={100}
	borderColor={'red'}
	textSize={20}
	onChange={(value) => { }} />
```
 9. PasswordInput
```
<PasswordInput
	value={}
	rowStyle={{ width: 200, backgroundColor: 'white', }}
	returnKeyType="done"
	onChangeText={(value) => { }}
	onSubmitEditing={() => { }} />
```
 10. Toast
```
<Toast ref="toast" position="bottom" style={{ }} />
```
```
showToastMessage (message) {
	this.refs.toast.show(message, ToastDuration.LENGTH_LONG);
}
```
 11. Radio Form 
```
<RadioForm
	radio_props={[
    	{label: 'param1', value: 0 },
    	{label: 'param2', value: 1 }
    ]}
	initial={0}
	onPress={(value) => { this.setState({value:value}); }} />
```
```
<RadioForm
	radio_props={this.state.types}
	initial={0}
	formHorizontal={false}
	labelHorizontal={true}
	buttonColor={'#2196f3'}
	animation={true}
	onPress={(value) => { this.setState({value:value}); }} />
```
```
<RadioForm
	formHorizontal={true}
	animation={true} >
	{radio_props.map((obj, i) => {
		<RadioButton labelHorizontal={true} key={i} >
			<RadioButtonInput
				obj={obj}
				index={i}
				isSelected={this.state.value3Index === i}
				onPress={onPress}
				borderWidth={1}
				buttonInnerColor={'#e74c3c'}
				buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
				buttonSize={40}
				buttonOuterSize={80}
				buttonStyle={{}}
				buttonWrapStyle={{marginLeft: 10}} />
			<RadioButtonLabel
				obj={obj}
				index={i}
				labelHorizontal={true}
				onPress={onPress}
				labelStyle={{fontSize: 20, color: '#2ecc71'}}
				labelWrapStyle={{}} />
		</RadioButton>
	})}
</RadioForm>
```
