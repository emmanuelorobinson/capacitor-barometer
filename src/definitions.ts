export interface BarometerPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
