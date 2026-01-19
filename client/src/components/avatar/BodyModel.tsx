import React, { useMemo } from 'react';
import { useThree } from '@react-three/fiber';

interface BodyModelProps {
  measurements: {
    chest: number;
    waist: number;
    hips: number;
    biceps: number;
    thighs: number;
  };
}

const BodyModel: React.FC<BodyModelProps> = ({ measurements }) => {
  // Base scale factors (arbitrary units adjusted for visual proportion)
  // Assuming input in cm, we map them to model scale.
  // Standard "mannequin" dimensions (approximate)
  const baseMeasurements = {
    chest: 100,
    waist: 80,
    hips: 100,
    biceps: 35,
    thighs: 60,
  };

  const scale = useMemo(() => {
    return {
      chest: measurements.chest / baseMeasurements.chest,
      waist: measurements.waist / baseMeasurements.waist,
      hips: measurements.hips / baseMeasurements.hips,
      biceps: measurements.biceps / baseMeasurements.biceps,
      thighs: measurements.thighs / baseMeasurements.thighs,
    };
  }, [measurements]);

  const color = "#e0e0e0"; // Neutral mannequin color

  return (
    <group position={[0, -1, 0]}>
      {/* Head */}
      <mesh position={[0, 3.8, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 3.4, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.5, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Torso Group */}
      <group position={[0, 2.2, 0]}>
        {/* Chest area */}
        <mesh position={[0, 0.6, 0]} scale={[scale.chest, 1, scale.chest * 0.8]}>
            <boxGeometry args={[0.9, 0.9, 0.5]} />
             {/* Using box with bevels or just primitives for simplicity.
                 Cylinders might look better for organic shapes but box implies "chest block" */}
             {/* Let's try to make it slightly more organic with a Cylinder for the main torso */}
             <cylinderGeometry args={[0.45, 0.4, 1.2, 32]} />
            <meshStandardMaterial color={color} />
        </mesh>

        {/* Waist area */}
        <mesh position={[0, -0.4, 0]} scale={[scale.waist, 1, scale.waist * 0.8]}>
             <cylinderGeometry args={[0.4, 0.42, 1.0, 32]} />
            <meshStandardMaterial color={color} />
        </mesh>
      </group>

      {/* Hips */}
      <mesh position={[0, 1.3, 0]} scale={[scale.hips, 1, scale.hips * 0.8]}>
        <cylinderGeometry args={[0.42, 0.45, 0.8, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>


      {/* Arms */}
      {/* Left Arm */}
      <group position={[0.6 + (scale.chest - 1) * 0.2, 2.9, 0]}>
          {/* Shoulder */}
          <mesh>
             <sphereGeometry args={[0.25, 32, 32]} />
             <meshStandardMaterial color={color} />
          </mesh>
          {/* Upper Arm (Biceps) */}
          <mesh position={[0.2, -0.6, 0]} rotation={[0, 0, 0.2]} scale={[scale.biceps, 1, scale.biceps]}>
              <cylinderGeometry args={[0.12, 0.1, 1.2, 32]} />
              <meshStandardMaterial color={color} />
          </mesh>
          {/* Forearm */}
          <mesh position={[0.4, -1.8, 0]} rotation={[0, 0, 0.2]}>
              <cylinderGeometry args={[0.1, 0.08, 1.2, 32]} />
              <meshStandardMaterial color={color} />
          </mesh>
      </group>

      {/* Right Arm */}
      <group position={[-0.6 - (scale.chest - 1) * 0.2, 2.9, 0]}>
          {/* Shoulder */}
          <mesh>
             <sphereGeometry args={[0.25, 32, 32]} />
             <meshStandardMaterial color={color} />
          </mesh>
          {/* Upper Arm */}
          <mesh position={[-0.2, -0.6, 0]} rotation={[0, 0, -0.2]} scale={[scale.biceps, 1, scale.biceps]}>
              <cylinderGeometry args={[0.12, 0.1, 1.2, 32]} />
              <meshStandardMaterial color={color} />
          </mesh>
           {/* Forearm */}
           <mesh position={[-0.4, -1.8, 0]} rotation={[0, 0, -0.2]}>
              <cylinderGeometry args={[0.1, 0.08, 1.2, 32]} />
              <meshStandardMaterial color={color} />
          </mesh>
      </group>

      {/* Legs */}
      {/* Left Leg */}
      <group position={[0.25 + (scale.hips - 1) * 0.1, 0.9, 0]}>
           {/* Thigh */}
          <mesh position={[0, -0.7, 0]} scale={[scale.thighs, 1, scale.thighs]}>
              <cylinderGeometry args={[0.18, 0.15, 1.6, 32]} />
              <meshStandardMaterial color={color} />
          </mesh>
          {/* Calf */}
           <mesh position={[0, -2.2, 0]}>
              <cylinderGeometry args={[0.14, 0.1, 1.6, 32]} />
              <meshStandardMaterial color={color} />
          </mesh>
      </group>

       {/* Right Leg */}
       <group position={[-0.25 - (scale.hips - 1) * 0.1, 0.9, 0]}>
           {/* Thigh */}
          <mesh position={[0, -0.7, 0]} scale={[scale.thighs, 1, scale.thighs]}>
              <cylinderGeometry args={[0.18, 0.15, 1.6, 32]} />
              <meshStandardMaterial color={color} />
          </mesh>
          {/* Calf */}
           <mesh position={[0, -2.2, 0]}>
              <cylinderGeometry args={[0.14, 0.1, 1.6, 32]} />
              <meshStandardMaterial color={color} />
          </mesh>
      </group>

    </group>
  );
};

export default BodyModel;
