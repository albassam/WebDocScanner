import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesPaneComponent } from './images-pane.component';

describe('ImagesPaneComponent', () => {
  let component: ImagesPaneComponent;
  let fixture: ComponentFixture<ImagesPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
