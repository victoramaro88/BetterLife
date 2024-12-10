import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilitarioComponent } from './utilitario.component';

describe('UtilitarioComponent', () => {
  let component: UtilitarioComponent;
  let fixture: ComponentFixture<UtilitarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilitarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
