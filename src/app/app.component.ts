import {Component, ViewChild, ElementRef} from '@angular/core';
import {ScanDetected} from '../../projects/ngx-scanner-detection/src/lib/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('input') input: ElementRef;

  handle(event: ScanDetected) {
    console.log(event);
    this.input.nativeElement.value = event.barcode;
  }

  simulateScanner() {
    const s = '4260182250013';
    for (let i = 0; i < s.length; i++) {
      const e = new KeyboardEvent('keyup', {bubbles : true, cancelable : true, key : s[i], shiftKey : false});
      setTimeout(() => document.dispatchEvent(e));
    }
    const xe = new KeyboardEvent('keyup', {bubbles : true, cancelable : true, key : 'Enter', shiftKey : false});
    setTimeout(() => document.dispatchEvent(xe));
  }
}
