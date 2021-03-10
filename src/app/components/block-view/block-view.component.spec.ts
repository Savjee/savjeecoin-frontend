import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BlockViewComponent } from './block-view.component';

describe('BlockViewComponent', () => {
  let component: BlockViewComponent;
  let fixture: ComponentFixture<BlockViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
