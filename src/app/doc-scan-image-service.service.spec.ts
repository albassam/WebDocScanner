import { TestBed } from '@angular/core/testing';

import { DocScanImageServiceService } from './doc-scan-image-service.service';

describe('DocScanImageServiceService', () => {
  let service: DocScanImageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocScanImageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
