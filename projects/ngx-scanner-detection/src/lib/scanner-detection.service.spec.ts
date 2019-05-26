import { TestBed } from '@angular/core/testing';

import { ScannerDetectionService } from './scanner-detection.service';

describe('ScannerDetectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScannerDetectionService = TestBed.get(ScannerDetectionService);
    expect(service).toBeTruthy();
  });
});
