# Avatar Visualization Module

This module provides a 3D visualization of body measurements using a procedural avatar. It is built with React, Three.js (`@react-three/fiber`), and `@react-three/drei`.

## Components

The module is located in `client/src/components/avatar/` and consists of:

1.  **`BodyModel.tsx`**: The core component that renders the 3D geometry. It accepts measurements and scales the corresponding body parts (chest, waist, hips, biceps, thighs) relative to a base mannequin size.
2.  **`AvatarViewer.tsx`**: A container for the 3D scene. It sets up the Canvas, lights, environment, and camera controls (`OrbitControls`).
3.  **`AvatarInput.tsx`**: A UI component with sliders and input fields to modify the measurements.

## Usage

### Integration

To use the avatar visualization in your application, you can import the `AvatarPage` or compose the `AvatarViewer` and `AvatarInput` components directly.

**Example using the full page demo:**

Navigate to `/avatar` in the application.

**Example embedding in another component:**

```tsx
import React, { useState } from 'react';
import AvatarViewer from '@/components/avatar/AvatarViewer';
import AvatarInput from '@/components/avatar/AvatarInput';

const MyComponent = () => {
  const [measurements, setMeasurements] = useState({
    chest: 100,
    waist: 80,
    hips: 100,
    biceps: 35,
    thighs: 60,
  });

  const handleChange = (key, value) => {
     setMeasurements(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div>
       <AvatarInput measurements={measurements} onChange={handleChange} />
       <div style={{ height: '500px' }}>
          <AvatarViewer measurements={measurements} />
       </div>
    </div>
  );
};
```

## Localization

The module is currently localized in Portuguese (pt-BR).

## Features

-   **Dynamic Scaling**: The avatar updates in real-time as measurements change.
-   **Interactive View**: Users can rotate the avatar to view it from any angle.
-   **Responsive**: The canvas adapts to its container size.
-   **Lightweight**: Uses simple geometric primitives (Capsules, Cylinders, Spheres) instead of loading large external 3D assets.

## Dependencies

-   `three`
-   `@react-three/fiber`
-   `@react-three/drei`
