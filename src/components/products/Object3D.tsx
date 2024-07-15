import {
  ViroMaterials,
  Viro3DObject,
  ViroSpinner,
  ViroText,
  ViroPolyline,
  ViroARPlaneSelector,
  ViroQuad,
  ViroSpotLight,
} from '@viro-community/react-viro';
import React, {useEffect, useRef, useState} from 'react';
import {ViroPinchState, ViroRotateState, ViroRotateStateTypes} from '@viro-community/react-viro/dist/components/Types/ViroEvents';

function Object3D({url}: {url: string}) {
  const [isLoading, setIsLoading] = useState(true);
  const [scaleNumber, setScaleNumber] = useState(1);
  const [rotateNumber, setRotateNumber] = useState(0);
  const [constScaleNumber, setConstScaleNumber] = useState(1);
  const [constRotateNumber, setConstRotateNumber] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  function scaleObject(pinchState: ViroPinchState, scaleFactor: number): void {
    if (pinchState === 2) {
      setScaleNumber(scaleFactor * constScaleNumber);
    }
    if (pinchState === 3) {
      setConstScaleNumber(scaleNumber);
    }
  }

  function rotateObject(rotateState: ViroRotateState, rotationFactor: number): void {
    if (rotateState === ViroRotateStateTypes.ROTATE_MOVE) {
      setRotateNumber(rotationFactor + constRotateNumber)
    }
    if (rotateState === ViroRotateStateTypes.ROTATE_END) {
      setConstRotateNumber(rotateNumber)
    }
  }

  useEffect(() => {
    ViroMaterials.createMaterials({
      label: {
        lightingModel: 'Blinn',
        diffuseColor: 'rgba(171,171,171,1)',
        writesToDepthBuffer: true,
        readsFromDepthBuffer: true,
      },
    });
    return () => {};
  }, []);

  return (
    <>
      {/* {isLoading && <ViroSpinner type="light" position={[0, 0, -2]} />} */}
      <Viro3DObject
        source={{uri: url}}
        type="GLB"
        position={[0, 0, -1]}
        onPinch={scaleObject}
        scale={[scaleNumber, scaleNumber, scaleNumber]}
        onDrag={() => setIsHolding(true)}
        onRotate={rotateObject}
        rotation={[0, rotateNumber, 0]}
       onLoadEnd={() => {
          setIsLoading(false);
        }}></Viro3DObject>
      <ViroText
        text="Vui lòng chờ..."
        position={[0, -1, -2]}
        style={{color: '#fff', fontSize: 16}}
        visible={isLoading}
      />
    </>
  );
}

export default Object3D;
