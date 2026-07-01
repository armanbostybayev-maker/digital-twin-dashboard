import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { memo, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

export const cameraPresets = {
  overview: { position: [24, 19, 24], target: [4, 0, -2] },
  heap: { position: [-15, 10, 7], target: [-11, 0.7, -6] },
  sx: { position: [11, 8, 9], target: [7, 0.8, -2.1] },
  ew: { position: [26, 9, 8], target: [20, 1.1, 0] },
  cathodes: { position: [31, 7, 8], target: [26, 1, 1] },
};

function resolveTarget(cameraTarget) {
  if (cameraTarget?.position && cameraTarget?.target) return cameraTarget;
  return cameraPresets[cameraTarget?.id] || cameraPresets.overview;
}

function CameraController({ cameraTarget, shotRequest }) {
  const { camera, gl, scene } = useThree();
  const controlsRef = useRef();
  const targetRef = useRef(new THREE.Vector3(...cameraPresets.overview.target));
  const lastShot = useRef(0);
  const isMovingRef = useRef(true);
  const goal = useMemo(() => resolveTarget(cameraTarget), [cameraTarget]);

  useEffect(() => {
    isMovingRef.current = true;
  }, [goal]);

  useFrame(() => {
    if (!isMovingRef.current) {
      controlsRef.current?.update();
      return;
    }
    const desiredPosition = new THREE.Vector3(...goal.position);
    const desiredTarget = new THREE.Vector3(...goal.target);
    camera.position.lerp(desiredPosition, 0.085);
    targetRef.current.lerp(desiredTarget, 0.09);
    if (controlsRef.current) {
      controlsRef.current.target.copy(targetRef.current);
      controlsRef.current.update();
    } else {
      camera.lookAt(targetRef.current);
    }
    if (camera.position.distanceTo(desiredPosition) < 0.08 && targetRef.current.distanceTo(desiredTarget) < 0.04) {
      camera.position.copy(desiredPosition);
      targetRef.current.copy(desiredTarget);
      if (controlsRef.current) controlsRef.current.target.copy(desiredTarget);
      isMovingRef.current = false;
    }
  });

  useEffect(() => {
    if (shotRequest === 0 || shotRequest === lastShot.current) return;
    lastShot.current = shotRequest;
    requestAnimationFrame(() => {
      gl.render(scene, camera);
      const link = document.createElement('a');
      link.download = `sx-ew-digital-twin-${new Date().toISOString().replace(/[:.]/g, '-')}.png`;
      link.href = gl.domElement.toDataURL('image/png');
      link.click();
    });
  }, [camera, gl, scene, shotRequest]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableRotate
      enableZoom
      enablePan
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.75}
      zoomSpeed={0.9}
      panSpeed={0.55}
      maxPolarAngle={Math.PI * 0.49}
      minDistance={4}
      maxDistance={95}
      onStart={() => { isMovingRef.current = false; }}
    />
  );
}

export default memo(CameraController);
