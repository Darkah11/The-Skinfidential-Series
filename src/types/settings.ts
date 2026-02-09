export interface Tax {
  percentage: number;
  enabled: boolean;
  updatedAt?: string;
}
export interface GeneralSettings {
  tax: Tax;
}
