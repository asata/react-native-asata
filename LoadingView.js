/***************************************************************************************************************
<LoadingView
	visible={this.state.visible}
	backgroundColor={'rgba(0, 0, 0, 0.1)'} />
****************************************************************************************************************/

import React from 'react';
import {
	ActivityIndicator,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

class LoadingView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: props.visible,
		};
	}

	componentWillMount () {

	}

	componentWillUnmount () {

	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.visible != undefined) {
			this.setState({ visible: nextProps.visible, });
		}
	}

	render () {
		if (this.state.visible) {
			return (
				<TouchableWithoutFeedback onPress={() => { }}>
					<View style={[{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: this.props.backgroundColor, }, this.props.loadingStyle]}>
						<ActivityIndicator size="large" color={this.props.color} />
					</View>
				</TouchableWithoutFeedback>
			)
		} else {
			return (
				<View />
			)
		}
	}
}

LoadingView.defaultProps = {
	visible 		: false,
	loadingStyle 	: {},
	color 			: 'grey',
	backgroundColor : 'rgba(0, 0, 0, 0.1)'
};

module.exports = LoadingView;
