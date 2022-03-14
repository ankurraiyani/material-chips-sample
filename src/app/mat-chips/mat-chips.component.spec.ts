import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatChipsComponent } from './mat-chips.component';

describe('MatChipsComponent', () => {
  let component: MatChipsComponent;
  let fixture: ComponentFixture<MatChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatChipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
