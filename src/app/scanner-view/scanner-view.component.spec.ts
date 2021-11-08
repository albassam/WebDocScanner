import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerViewComponent } from './scanner-view.component';

describe('ScannerViewComponent', () => {
  let component: ScannerViewComponent;
  let fixture: ComponentFixture<ScannerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScannerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
