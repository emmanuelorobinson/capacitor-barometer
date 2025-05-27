import type { PluginListenerHandle } from '@capacitor/core';

export interface Barometer {
  /**
   * Checks if the barometer sensor is available on the device.
   */
  isAvailable(): Promise<{ available: boolean }>;

  /**
   * Starts listening for barometer updates.
   * This will also trigger the 'onPressureChange' event.
   */
  start(): Promise<void>;

  /**
   * Stops listening for barometer updates.
   */
  stop(): Promise<void>;

  /**
   * Gets the last known pressure reading.
   * Ensure 'start()' has been called and data is available.
   */
  getPressure(): Promise<{ pressure: number }>;

  /**
   * An echo method for testing.
   */
  echo(options: { value: string }): Promise<{ value: string }>;

  /**
   * Called when pressure data changes.
   *
   * @param eventName The name of the event ('onPressureChange')
   * @param listenerFunc The callback function to be executed.
   */
  addListener(
    eventName: 'onPressureChange',
    listenerFunc: (data: { pressure: number }) => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Removes all listeners for this plugin.
   */
  removeAllListeners(): Promise<void>;
}
