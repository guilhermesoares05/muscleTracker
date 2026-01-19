import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import BodyModel from './BodyModel';

interface AvatarViewerProps {
  measurements: {
    chest: number;
    waist: number;
    hips: number;
    biceps: number;
    thighs: number;
  };
}

const AvatarViewer: React.FC<AvatarViewerProps> = ({ measurements }) => {
  return (
    <div className="w-full h-full min-h-[500px] bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 relative">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />

        <Suspense fallback={null}>
            <BodyModel measurements={measurements} />
            <Environment preset="city" />
        </Suspense>

        <ContactShadows resolution={1024} scale={10} blur={1} opacity={0.25} far={10} color="#8a8a8a" />
        <OrbitControls
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.8}
            minDistance={3}
            maxDistance={8}
        />
      </Canvas>

      <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-black/80 p-2 rounded text-xs">
         <p>Rotate to view from different angles</p>
      </div>
    </div>
  );
};

export default AvatarViewer;
