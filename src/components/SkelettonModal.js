import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default class SkelettonModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	_mapSkelletton(skulldata) {
		return (
			skulldata.map((data) => {
				return (
					<>
						<SkeletonPlaceholder.Item marginTop={20} flexDirection="row" alignItems="">
							<SkeletonPlaceholder.Item width={'30%'} height={75} borderRadius={0} />
							<SkeletonPlaceholder.Item width={'100%'} marginLeft={10}>
								<SkeletonPlaceholder.Item width={'70%'} height={20} />
								<SkeletonPlaceholder.Item marginTop={6} width={'50%'} height={20} />
								<SkeletonPlaceholder.Item marginTop={6} width={'70%'} height={20} />
							</SkeletonPlaceholder.Item>
						</SkeletonPlaceholder.Item>
						<SkeletonPlaceholder.Item marginTop={20} width={'100%'} height={100} borderRadius={0} />
					</>

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
