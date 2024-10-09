import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewDetailComponent } from './crew-detail.component';

describe('CrewDetailComponent', () => {
  let component: CrewDetailComponent;
  let fixture: ComponentFixture<CrewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrewDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
