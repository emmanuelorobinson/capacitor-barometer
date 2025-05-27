import { registerPlugin } from '@capacitor/core';

import type { Barometer as BarometerInterface } from './definitions';

const Barometer = registerPlugin<BarometerInterface>('Barometer', {
  web: () => import('./web').then((m) => new m.BarometerWeb()),
});

export * from './definitions';
export { Barometer };
