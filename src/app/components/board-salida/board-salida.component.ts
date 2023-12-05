import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoardDD} from "../../services/board/board-dd";

@Component({
  selector: 'app-board-salida',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board-salida.component.html',
  styleUrl: './board-salida.component.css'
})
export class BoardSalidaComponent extends BoardDD implements OnInit {
  @Input() array: string[] = [];

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.tiles = this.array;
  }

}
