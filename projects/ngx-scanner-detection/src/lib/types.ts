export interface ScanDetected {
  barcode: string;
  length: number;
  valid: boolean;
}

export interface ScannerConfiguration {
  minLength?: number;
  maxLength?: number;
  scannerStartsWith?: string;
  scannerEndsWith?: string;
  scanTimeout?: number;
  replaceNotNumber?: boolean;
  allowNotNumber?: boolean;
  ignoreOverElement?: string[];
  barcodeType?: string;
}
