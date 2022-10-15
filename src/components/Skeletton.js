import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default class Skeletton extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	_mapSkelletton(skulldata) {
		return (
			skulldata.map((data) => {
				return (
					<SkeletonPlaceholder.Item marginTop={20} flexDirection="row" alignItems="">
						<SkeletonPlaceholder.Item width={'50%'} height={150} borderRadius={0} />
						<SkeletonPlaceholder.Item marginLeft={10}>
							<SkeletonPlaceholder.Item width={120} height={20} />
							<SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
							<SkeletonPlaceholder.Item marginTop={6} width={120} height={20} />
						</SkeletonPlaceholder.Item>
					</SkeletonPlaceholder.Item>
				)
			})
		)
	}

	render() {
		return (
			<SkeletonPlaceholder borderRadius={0}>
				{this._mapSkelletton(this.props.skulldata)}
			</SkeletonPlaceholder>
		);
	}
}
