import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {ScanDetected, ScannerConfiguration} from './types';
import {Barcoder} from './barcodeValidator';
@Component({
  selector: 'ngx-sw-scanner-detection',
  templateUrl: './scanner-detection.html',
  styleUrls: ['./scanner-detection.scss']
})
export class ScannerDetectionComponent implements OnInit {

  @Input() set config(input: ScannerConfiguration) {
    this._config = Object.assign(this._config, input);
  }

  private _config: ScannerConfiguration = {
    minLength: 7,
    maxLength: 14,
    scannerStartsWith: '',
    scannerEndsWith: 'Enter',
    scanTimeout: 100,
    allowNotNumber: false,
    replaceNotNumber: true,
    ignoreOverElement: ['INPUT'],
    barcodeType: 'ean13'
  };

  private checkRegex: RegExp = new RegExp(`^${this._config.scannerStartsWith}${this._config.allowNotNumber ? '.' : '\\d'}{${this._config.minLength},${this._config.maxLength}}${this._config.scannerEndsWith}$`);

  private _input: string = '';

  @Output() scan: EventEmitter<ScanDetected> = new EventEmitter();

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    if (this._config.ignoreOverElement.includes(ev.target['tagName'])) {
      return;
    }
    this._input += ev.key;
    setTimeout(() => {
      if (this.checkRegex.test(this._input)) {
        const replace: RegExp =
          this._config.replaceNotNumber ?
            new RegExp(`\\D${this._config.scannerStartsWith.length ? '\|' + this._config.scannerStartsWith : ''}${this._config.scannerEndsWith.length ? '\|' + this._config.scannerEndsWith : ''}`, 'g') :
            new RegExp(`${this._config.scannerStartsWith}${this._config.scannerEndsWith.length ? '\\|' + this._config.scannerEndsWith : ''}`, 'g');

        const barcode = this._input.replace(replace, ''),
          length = barcode.length,
          valid = (<boolean> new Barcoder(this._config.barcodeType).validate(barcode));
        this.scan.emit({barcode, length, valid});
      }
      this._input = '';
    }, this._config.scanTimeout);
  }

  public ngOnInit(): void {

  }

}
