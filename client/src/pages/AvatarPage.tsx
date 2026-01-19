import React, { useState } from 'react';
import AvatarViewer from '@/components/avatar/AvatarViewer';
import AvatarInput from '@/components/avatar/AvatarInput';

const AvatarPage: React.FC = () => {
  const [measurements, setMeasurements] = useState({
    chest: 100,
    waist: 80,
    hips: 100,
    biceps: 35,
    thighs: 60,
  });

  const handleMeasurementChange = (key: string, value: number) => {
    setMeasurements((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Body Progress Avatar</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
        Visualize your body measurements with this interactive 3D avatar. Update your measurements to see how your body shape changes.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <AvatarInput measurements={measurements} onChange={handleMeasurementChange} />
        </div>
        <div className="lg:col-span-2 min-h-[500px]">
          <AvatarViewer measurements={measurements} />
        </div>
      </div>
    </div>
  );
};

export default AvatarPage;
