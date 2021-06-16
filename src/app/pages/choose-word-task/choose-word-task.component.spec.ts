import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseWordTaskComponent } from './choose-word-task.component';

describe('ChooseWordTaskComponent', () => {
  let component: ChooseWordTaskComponent;
  let fixture: ComponentFixture<ChooseWordTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseWordTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseWordTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
