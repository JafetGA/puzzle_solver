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

  // Variables para almacenar los nodos inicial y final (matrices string[][] )
  startNode: string[][] = [];
  endNode: string[][] = [];


  // Variable para almacenar la solución (array string[])
  solution : string[] = [];

  constructor(private passInfoService: PassInfoService) {
  }

  ngOnInit(): void {

  }

  getMatrix() {
    // Verificar que los nodos inicial y final no estén vacíos
    if (this.passInfoService.getStartMatrix().length != 0 && this.passInfoService.getEndMatrix().length != 0) {

      // Obtenemos los datos de los nodos inicial y final del servicio 'passInfoService'
      this.startNode = this.passInfoService.getStartMatrix();
      this.endNode = this.passInfoService.getEndMatrix();

      // Mostramos los nodos inicial y final en la consola para verificar que se obtuvieron correctamente
      console.log([...this.startNode])
      console.log([...this.endNode])
    } else {
      console.log("Nada que mostrar")
    }
  }

  startSolution() {
    let g = 0.75;    // Valor de g (distancia real) que aumentará en una razón de 0.75 por cada nivel en el árbol
    let h = this.calcularH(this.startNode, this.endNode);   // Valor de h (distancia estimada) que se calculará con la función 'calcularH'
    let f = g + h;    // Valor de f (suma de g y h) que se calculará con los valores de g y h


    // Para almacenar los valores f,g y h de cada nodo, se usarán arrays de la forma [nodo, f, g, h]
    // La agenda es una lista de arrays de la forma [nodo, f, g, h], esta agenda esta compuesta de nodos
    let agenda: [string[][], number, number, number][] = [[this.startNode, f, g, h]];

    // Para almacenar los pasos de la solución, se usará un array de arrays de la forma [nodo]
    let pasos: string[][][] = [];


    // Mientras la agenda no esté vacía
    while (agenda.length > 0) {

      // Seleccionar el nodo con el menor valor de f en la agenda
      const nodoActual = this.mejorPuntaje(agenda)[0];

      // Si el nodo actual es igual al nodo final, se ha encontrado la solución y se sale del ciclo
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

    // Agregar el nodo final a la lista de pasos
    pasos.push(this.endNode);

    // Imprimir los pasos de la solución
    for (const paso of pasos) {
      this.solution.push(...this.imprimirNodo(paso));
    }
  }

  // Función para calcular el valor de h (distancia estimada)
  calcularH(nodo: string[][], final: string[][]): number {

    // Variable para almacenar el valor de h, que será un acumulador
    let h = 0;
    for (let y = 0; y < nodo.length; y++) {
      for (let x = 0; x < nodo[y].length; x++) {

        // Si el valor del nodo actual es diferente al valor del nodo final y no es un espacio vacío, aumentar el valor de h
        if (nodo[x][y] !== final[x][y] && nodo[x][y] !== ' ') {
          h++;      // h aumenta por cada número que no esté en su posición correcta con base al orden del nodo final
        }
      }
    }


  // La siguiente sección de código es una heurística descartada
  // Se basa en la cantidad de números que están en su fila y/o columna incorrecta

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

    return h;     // Se regresa el valor de h
  }


  // Función para encontrar el nodo con el menor valor de f en la agenda
  mejorPuntaje(agenda: [string[][], number, number, number][]): [string[][], number, number, number] {
    return agenda.reduce((min, current) => (current[1] < min[1] ? current : min), agenda[0]);
  }

// Función para generar los hijos de un nodo
  generarHijos(nodo: string[][]): string[][][] {
    const hijos: string[][][] = [];   // Se declara un array para almacenar los hijos del nodo

    // Encontrar la posición del espacio vacío en el nodo
    const espacio = this.encontrarEspacio(nodo, ' ');


    // Si no se encuentra el espacio vacío, se regresa el array de hijos vacío
    // Esta sección de código, no aplica para el problema de los 8-puzzles, pero se deja por si se quiere usar para otro problema
    if (!espacio) {
      return hijos;
    }

    // Se obtienen las coordenadas del espacio vacío en el nodo actual (x,y)
    const [x, y] = espacio;

    // Determinar los movimientos posibles del espacio vacío  (izquierda, derecha, arriba, abajo)
    const izq = [x - 1, y];
    const der = [x + 1, y];
    const arr = [x, y - 1];
    const ab = [x, y + 1];

    // Se crea un array con los movimientos posibles
    const movsPosibles = [izq, der, arr, ab];


    // Para cada movimiento posible
    for (const mov of movsPosibles) {

      // Crear una copia del nodo
      const hijo = nodo.map(fila => [...fila]);

      // Verificar que el movimiento sea posible con los límites del nodo
      if (mov[0] >= 0 && mov[0] < nodo.length && mov[1] >= 0 && mov[1] < nodo.length) {

        // Intercambiar los valores en las posiciones entre el espacio vacío y el valor del movimiento
        const valor = hijo[mov[0]][mov[1]];
        hijo[mov[0]][mov[1]] = ' ';
        hijo[x][y] = valor;

        // Agregar el nodo resultante (hijo) al array de hijos
        hijos.push(hijo);
      }
    }

    // Regresar el array de hijos
    return hijos;
  }


  // Función para encontrar la posición del espacio vacío en un nodo
  encontrarEspacio(nodo: string[][], char: string): [number, number] | undefined {
    for (let y = 0; y < nodo.length; y++) {
      for (let x = 0; x < nodo[y].length; x++) {
        if (nodo[x][y] === char) {    // Si el valor de la coordenada actual es igual al valor del espacio vacío
          return [x, y];    // Se regresa la posición del espacio vacío
        }
      }
    }
    return undefined;   // Si no se encuentra el espacio vacío, se regresa 'undefined' (requerido por TypeScript)
  }


  // Función para imprimir un nodo en un array de una dimensión
  imprimirNodo(nodo: string[][]): string [] {
    const array: string[] = [];
    // Para cada fila en el nodo
    for (const fila of nodo) {

      // Para cada valor en la fila
      for (const valor of fila) {
        array.push(valor)     // Agregar el valor al array de la solución
      }
    }
    return array;  // Regresar el array de la solución
  }


  // Función para crear los elementos HTML de la solución y mostrarlos en la página
  createE() {
    if (this.solution.length !== 0) {
      // Dividir el array en subarrays de 9 elementos cada uno (basicamente, obtener los tableros correspondientes)
      const subarrays = [];
      for (let i = 0; i < this.solution.length; i += 9) {
        subarrays.push(this.solution.slice(i, i + 9));      // Se agrega cada subarray al array 'subarrays'
      }

      const e4 = document.createElement("h2");
      e4.setAttribute("id","solution_title");
      e4.innerHTML = "Pasos de la solución";
      document.body.appendChild(e4);    // Agregar el elemento HTML del título al body de la página


      // Crear un elemento HTML, que será el contenedor de todos los tableros para los pasos de la solución
      const e3 = document.createElement("div");
      e3.setAttribute("id","steps");


      // Crear un elemento HTML para cada subarray (para cada tablero)
      for (let i = 0; i < subarrays.length; i++) {
        const e = document.createElement("div");
        e.setAttribute("id", "board");  // Agrega una clase para dar estilo si es necesario

        // Para cada valor en el subarray (para cada valor en el tablero)
        for (let j = 0; j < subarrays[i].length; j++) {

          // Crear un elemento HTML para cada valor en el tablero (para cada casilla)
          const e2 = document.createElement("label");
          e2.setAttribute("class", "tile-card");  // Agrega una clase para dar estilo si es necesario
          e2.innerHTML = subarrays[i][j];

          e.appendChild(e2);    // Agregar el elemento HTML de la casilla al elemento HTML del tablero
        }
          // e.innerHTML = "Solution " + (i + 1) + ": " + subarrays[i].join(", ");
        e3.appendChild(e);      // Agregar el elemento HTML del tablero al elemento HTML del contenedor
      }
      document.body.appendChild(e3);    // Agregar el elemento HTML del contenedor al body de la página

      }

  }


  // Función para eliminar los elementos HTML de la solución de la página (para mostrar otra solución)
  dropE(){
    const e2 = document.getElementById("solution_title")
    const e = document.getElementById("steps")
    e?.remove()
    e2?.remove()
  }



}
