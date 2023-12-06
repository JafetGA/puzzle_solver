import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoardComponent} from "../board/board.component";
import {BoardSalidaComponent} from "../board-salida/board-salida.component";
import {PassInfoService} from '../../services/pass-info.service';
import {SolutionComponent} from "../solution/solution.component";

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CommonModule, BoardComponent, BoardSalidaComponent, SolutionComponent],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent implements OnInit {
  matrix: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", " "];
  orderedMatrix: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", " "];

  constructor(private passInfoService: PassInfoService) {

  }

  ngOnInit(): void {
  }

  arrayToMatrix(array: string[]) {
    let matrix: string[][] = [];
    for (let i = 0; i < 3; i++) {
      matrix[i] = [];
      for (let j = 0; j < 3; j++) {
        matrix[i][j] = <string>array.shift();
      }
    }
    return matrix;
  }

  // Función que se disparará al llamar a la solución
  solve() {

    this.passInfoService.setStartMatrix((this.arrayToMatrix([...this.matrix])));
    this.passInfoService.setEndMatrix((this.arrayToMatrix([...this.orderedMatrix])));
    //Llamar a la función getMatrix() de solution.component.ts
    const solutionComponent = new SolutionComponent(this.passInfoService);
    solutionComponent.getMatrix();

    //Llamar a la función startSolution() de solution.component.ts
    solutionComponent.startSolution();

    //Llamar a la función createE() de solution.component.ts
    solutionComponent.dropE();

    // Llamar a la función createE() de solution.component.ts
    solutionComponent.createE();
  }

}
