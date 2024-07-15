import {
  ViroMaterials,
  Viro3DObject,
  ViroText,
} from '@viro-community/react-viro';
import React, {useEffect, useState} from 'react';
import {ViroRotateStateTypes} from '@viro-community/react-viro/dist/components/Types/ViroEvents';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedObject} from '../../redux/slices/selectedObject.slice';

const MultiObject3D = ({handleDrag}) => {
  const listCurrentObject = useSelector(state => state.listCurrentObject.value);

  useEffect(() => {
    console.log(listCurrentObject);
  }, []);

  return (
    listCurrentObject &&
    listCurrentObject.map(item => (
      <Object3D url={item.url} isShow={item.isShow} handleDrag={handleDrag} />
    ))
  );
};

function Object3D({url, handleDrag, isShow}) {
  const [isLoading, setIsLoading] = useState(true);
  const [scaleNumber, setScaleNumber] = useState(1);
  const [rotateNumber, setRotateNumber] = useState(0);
  const [constScaleNumber, setConstScaleNumber] = useState(1);
  const [constRotateNumber, setConstRotateNumber] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const dispatch = useDispatch();
  const selectedObject = useSelector(state => state.selectedObject.value);

  function scaleObject(pinchState, scaleFactor) {
    if (pinchState === 2) {
      setScaleNumber(scaleFactor * constScaleNumber);
    }
    if (pinchState === 3) {
      setConstScaleNumber(scaleNumber);
    }
  }

  function rotateObject(rotateState, rotationFactor) {
    if (rotateState === ViroRotateStateTypes.ROTATE_MOVE) {
      setRotateNumber(rotationFactor + constRotateNumber);
    }
    if (rotateState === ViroRotateStateTypes.ROTATE_END) {
      setConstRotateNumber(rotateNumber);
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

  const handleDragObject = () => {
    console.log(url)
    if (selectedObject !== url) {
      dispatch(setSelectedObject(url));
    }
    handleDrag();
  };

  return (
    <>
      <Viro3DObject
        source={{uri: url}}
        type="GLB"
        position={[0, 0, -1]}
        scale={[scaleNumber, scaleNumber, scaleNumber]}
        onPinch={scaleObject}
        onDrag={handleDragObject}
        onRotate={rotateObject}
        rotation={[0, rotateNumber, 0]}
        onSwipe={() => {}}
        visible={isShow}
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

export default MultiObject3D;
