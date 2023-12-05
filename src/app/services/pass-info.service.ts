import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PassInfoService {
  startMatrix: string[][] = [];
  endMatrix: string[][] = [];

  constructor() {
  }

  setStartMatrix(matrix: string[][]) {
    this.startMatrix = matrix;
    //console.log("Nodo inicio → " + this.getStartMatrix());

  }

  setEndMatrix(matrix: string[][]) {
    this.endMatrix = matrix;
    //console.log("Nodo final → " + this.getEndMatrix());
  }

  getStartMatrix(): string[][] {
    return this.startMatrix;
  }

  getEndMatrix(): string[][] {
    return this.endMatrix;
  }
}
