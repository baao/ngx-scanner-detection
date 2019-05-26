import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerDetectionComponent } from './scanner-detection.component';

describe('ScannerDetectionComponent', () => {
  let component: ScannerDetectionComponent;
  let fixture: ComponentFixture<ScannerDetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScannerDetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannerDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
