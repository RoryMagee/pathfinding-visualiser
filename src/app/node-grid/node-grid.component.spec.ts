import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeGridComponent } from './node-grid.component';

describe('NodeGridComponent', () => {
  let component: NodeGridComponent;
  let fixture: ComponentFixture<NodeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
