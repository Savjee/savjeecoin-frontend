import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BlockchainViewerComponent } from './blockchain-viewer.component';

describe('BlockchainViewerComponent', () => {
  let component: BlockchainViewerComponent;
  let fixture: ComponentFixture<BlockchainViewerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockchainViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockchainViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
