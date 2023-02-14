import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPokeballComponent } from './button-pokeball.component';

describe('ButtonPokeballComponent', () => {
  let component: ButtonPokeballComponent;
  let fixture: ComponentFixture<ButtonPokeballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonPokeballComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonPokeballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
