import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';

const CardObject = ({ frontImage, backImage }) => {
  const cardRef = useRef();
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState([0, 0]);

  useFrame(() => {
    if (!dragging) {
      cardRef.current.rotation.y += 0.01; // Auto-spin spd
    }
  });

  const handlePointerDown = (e) => {
    setDragging(true);
    setStartPos([e.clientX, e.clientY]);
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    const [startX, startY] = startPos;
    const deltaX = (e.clientX - startX) * 0.01;
    const deltaY = (e.clientY - startY) * 0.01;
    setRotation([deltaY, deltaX, 0]);
  };

  const handlePointerUp = () => setDragging(false);

  return (
    <mesh
      ref={cardRef}
      rotation={rotation}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerUp}
    >
      <boxGeometry args={[0.05, 3.75, 6]} />
      <meshBasicMaterial attach="material-1" map={frontImage} />
      <meshBasicMaterial attach="material-0" map={backImage} />
      <meshStandardMaterial attach="material-2" color="#fff" transparent={true} opacity={0} />
      <meshStandardMaterial attach="material-3" color="#fff" transparent={true} opacity={0} />
      <meshStandardMaterial attach="material-4" color="#fff" transparent={true} opacity={0} />
      <meshStandardMaterial attach="material-5" color="#fff" transparent={true} opacity={0} />
    </mesh>
  );
};

const MemberCard = () => {
  const frontTexture = new TextureLoader().load('mcard/mcard-front.png');
  const backTexture = new TextureLoader().load('/mcard/mcard-back.png');

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} intensity={1} />
      <CardObject frontImage={frontTexture} backImage={backTexture} />
    </Canvas>
  );
};

export default MemberCard;
