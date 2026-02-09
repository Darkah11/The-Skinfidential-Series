export interface Tax {
  percentage: number;
  enabled: boolean;
  updatedAt?: Date;
}
export interface GeneralSettings {
  tax: Tax;
}
