import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSalidaComponent } from './board-salida.component';

describe('BoardSalidaComponent', () => {
  let component: BoardSalidaComponent;
  let fixture: ComponentFixture<BoardSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardSalidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
