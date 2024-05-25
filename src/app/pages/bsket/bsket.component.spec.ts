import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsketComponent } from './bsket.component';

describe('BsketComponent', () => {
  let component: BsketComponent;
  let fixture: ComponentFixture<BsketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BsketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BsketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
