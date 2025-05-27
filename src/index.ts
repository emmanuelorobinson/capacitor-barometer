import { registerPlugin } from '@capacitor/core';

import type { BarometerPlugin } from './definitions';

const Barometer = registerPlugin<BarometerPlugin>('Barometer', {
  web: () => import('./web').then((m) => new m.BarometerWeb()),
});

export * from './definitions';
export { Barometer };
