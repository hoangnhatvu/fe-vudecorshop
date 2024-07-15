import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroTrackingStateConstants,
} from '@viro-community/react-viro';
import {StyleSheet, View} from 'react-native';
import {Object3D} from '../../components';
import React from 'react';
import {useRoute} from '@react-navigation/native';

export default function ViroAR3DObjectPage({navigation}) {
  const route = useRoute();
  const {item} = route.params;
  return (
    <View style={styles.outer}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: () => <Ui3DObjectPage url={item.product_3d} />,
        }}
        style={styles.rootContainer}
      />
    </View>
  );
}

class Ui3DObjectPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    function onInitialized(state, reason) {
      console.log('onInitialized', state, reason);
      if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
        // Handle loss of tracking
      }
    }
    return (
      <ViroARScene style={styles.container} onTrackingUpdated={onInitialized}>
        <ViroDirectionalLight direction={[1, 0, 0]} color="#ffffff" />
        <ViroDirectionalLight direction={[-1, 0, 0]} color="#ffffff" />
        <ViroDirectionalLight direction={[0, 1, 0]} color="#ffffff" />

        <ViroAmbientLight color="#ffffff" />
        <Object3D url={this.props.url} />
      </ViroARScene>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 18,
    color: '#FFFFFF',
  },
  container: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    height: 200,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outer: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
  },
  buttons: {
    height: 80,
    width: 80,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  },
  fab3DButton: {
    position: 'absolute',
    left: 20,
    right: 0,
    bottom: 30,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  location: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});
