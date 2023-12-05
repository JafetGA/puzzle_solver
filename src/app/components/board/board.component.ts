import {Component, Input, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {BoardDD} from "../../services/board/board-dd";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent extends BoardDD implements OnInit {
  @Input() array: string[] = [];

  //puzzle game

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.tiles = this.array;
  }

}
