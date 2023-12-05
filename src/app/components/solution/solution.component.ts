import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PassInfoService} from "../../services/pass-info.service";

@Component({
  selector: 'app-solution',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.css',
})
export class SolutionComponent implements OnInit {
  startNode: string[][] = [];
  endNode: string[][] = [];
  solution : string[] = [];

  constructor(private passInfoService: PassInfoService) {
  }

  ngOnInit(): void {

  }

  getMatrix() {
    if (this.passInfoService.getStartMatrix().length != 0 && this.passInfoService.getEndMatrix().length != 0) {
      this.startNode = this.passInfoService.getStartMatrix();
      this.endNode = this.passInfoService.getEndMatrix();
      console.log([...this.startNode])
      console.log([...this.endNode])
    } else {
      console.log("Nada que mostrar")
    }
  }

  startSolution() {
    let g = 0.75;
    let h = this.calcularH(this.startNode, this.endNode);
    let f = g + h;

    let agenda: [string[][], number, number, number][] = [[this.startNode, f, g, h]];
    let pasos: string[][][] = [];

    while (agenda.length > 0) {
      // Seleccionar el nodo con el menor valor de f en la agenda
      const nodoActual = this.mejorPuntaje(agenda)[0];

      // Si el nodo actual es igual al nodo final, se ha encontrado la solución
      if (JSON.stringify(nodoActual) === JSON.stringify(this.endNode)) {
        break;
      }

      // Generar los hijos del nodo actual
      const hijos = this.generarHijos(nodoActual);

      // Asignar f, g y h a los nuevos nodos y agregarlos a la agenda
      for (const hijo of hijos) {
        g = this.mejorPuntaje(agenda)[2] + 0.75; // Incrementar el valor de g en 2
        h = this.calcularH(hijo, this.endNode);
        f = g + h;
        agenda.push([hijo, f, g, h]);
      }

      // Agregar a la lista de pasos el nodo actual
      pasos.push(nodoActual);

      // Eliminar el nodo actual de la agenda
      const index = agenda.findIndex(element => JSON.stringify(element[0]) === JSON.stringify(nodoActual));
      agenda.splice(index, 1);
    }
    pasos.push(this.endNode);
    for (const paso of pasos) {
      this.solution.push(...this.imprimirNodo(paso));

    }
  }

  calcularH(nodo: string[][], final: string[][]): number {

    let h = 0;
    for (let y = 0; y < nodo.length; y++) {
      for (let x = 0; x < nodo[y].length; x++) {
        if (nodo[x][y] !== final[x][y] && nodo[x][y] !== ' ') {
          h++;
        }
      }
    }

  /*
  for (let y = 0; y < nodo.length; y++) {
    for (let x = 0; x < nodo[y].length; x++) {
      if (nodo[x][y] !== final[x][y] && nodo[x][y] !== '_') {
        let filaActual = y;
        let columnaActual = x;
        let filaCorrecta = final[x].indexOf(nodo[x][y]);
        let columnaCorrecta = nodo.indexOf(final[y]);
        if (filaActual === filaCorrecta) {
          h++;
        }
        if (columnaActual === columnaCorrecta) {
          h++;
        }
      }
    }
  }
   */

    return h;
  }

  mejorPuntaje(agenda: [string[][], number, number, number][]): [string[][], number, number, number] {
    return agenda.reduce((min, current) => (current[1] < min[1] ? current : min), agenda[0]);
  }

  generarHijos(nodo: string[][]): string[][][] {
    const hijos: string[][][] = [];

    // Encontrar la posición del espacio vacío
    const espacio = this.encontrarEspacio(nodo, ' ');

    if (!espacio) {
      return hijos;
    }

    const [x, y] = espacio;

    // Determinar los movimientos posibles del espacio vacío
    const izq = [x - 1, y];
    const der = [x + 1, y];
    const arr = [x, y - 1];
    const ab = [x, y + 1];
    const movsPosibles = [izq, der, arr, ab];

    for (const mov of movsPosibles) {

      // Crear una copia del nodo
      const hijo = nodo.map(fila => [...fila]);

      // Verificar que el movimiento sea posible con los límites del nodo
      if (mov[0] >= 0 && mov[0] < nodo.length && mov[1] >= 0 && mov[1] < nodo.length) {

        // Intercambiar los valores en las posiciones x, y y mov
        const valor = hijo[mov[0]][mov[1]];
        hijo[mov[0]][mov[1]] = ' ';
        hijo[x][y] = valor;
        hijos.push(hijo);
      }
    }

    return hijos;
  }

  encontrarEspacio(nodo: string[][], char: string): [number, number] | undefined {
    for (let y = 0; y < nodo.length; y++) {
      for (let x = 0; x < nodo[y].length; x++) {
        if (nodo[x][y] === char) {
          return [x, y];
        }
      }
    }
    return undefined;
  }

  imprimirNodo(nodo: string[][]): string [] {
    const array: string[] = [];
    for (const fila of nodo) {
      for (const valor of fila) {
        array.push(valor)
      }
    }
    return array;
  }

  createE() {
    if (this.solution.length !== 0) {
      // Dividir el array en subarrays de 9 elementos cada uno
      const subarrays = [];
      for (let i = 0; i < this.solution.length; i += 9) {
        subarrays.push(this.solution.slice(i, i + 9));
      }


      const e3 = document.createElement("div");
      e3.setAttribute("id","steps");


      // Crear un elemento HTML para cada subarray

      for (let i = 0; i < subarrays.length; i++) {
        const e = document.createElement("div");
        e.setAttribute("id", "board");  // Agrega una clase para dar estilo si es necesario


        for (let j = 0; j < subarrays[i].length; j++) {
          const e2 = document.createElement("label");
          e2.setAttribute("class", "tile-card");  // Agrega una clase para dar estilo si es necesario
          e2.innerHTML = subarrays[i][j];

          e.appendChild(e2);
        }
          // e.innerHTML = "Solution " + (i + 1) + ": " + subarrays[i].join(", ");
        e3.appendChild(e);
      }

      document.body.appendChild(e3);



      }
      // Crear un elemento HTML para cada subarray

  }

  dropE(){
    const e = document.getElementById("steps")
    e?.remove()
  }



}
