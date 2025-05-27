import { WebPlugin } from '@capacitor/core';

import type { BarometerPlugin } from './definitions';

export class BarometerWeb extends WebPlugin implements BarometerPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
