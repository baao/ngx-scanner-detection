# NgxScannerDetection

Detects barcode scanning on document, validates it and emits the scanned barcode.
For Angular 7+ (should work with former versions too)


### Config

```
interface ScannerConfiguration {
  minLength?: number; // 7
  maxLength?: number; //  14
  scannerStartsWith?: string; // '' - characters to trim before the code
  scannerEndsWith?: string; // '' - characters to trim after the code
  scanTimeout?: number; // 100 - timeout for detection in ms
  replaceNotNumber?: boolean; // true - allowes numbers only [0-9], replace everything else
  allowNotNumber?: boolean; // false  - allowes numbers only [0-9], replace everything else
  ignoreOverElement?: string[]; // ['INPUT'] - array of tag names that should disable emit
  barcodeType?: string; // ean13 - gtin[d] or ean[\]
}
```

### Usage

```
<ngx-sw-scanner-detection
  (scan)="handle($event)"
  [config]="{scannerEndsWith: 'Enter'}"
>
  <input #input> ### not needed, only for showing the code
</ngx-sw-scanner-detection>

<button (click)="simulateScanner()">Scanner Simulation</button>
```

### Example Component

```
  @ViewChild('input') input: ElementRef;

  handle(event: ScanDetected) {
    console.log(event);
    this.input.nativeElement.value = event.barcode;
  }

  // dummy
  simulateScanner() {
    const s = '1234567890123';
    for (let i = 0; i < s.length; i++) {
      const e = new KeyboardEvent('keyup', {bubbles : true, cancelable : true, key : s[i], shiftKey : false});
      setTimeout(() => document.dispatchEvent(e));
    }
    const xe = new KeyboardEvent('keyup', {bubbles : true, cancelable : true, key : 'Enter', shiftKey : false});
    setTimeout(() => document.dispatchEvent(xe));
  }
```
---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
