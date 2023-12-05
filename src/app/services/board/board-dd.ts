export class BoardDD {
  tiles: string[] = []; // tiles es un array unidimensional
  currTile: any;
  otherTile: any;
  size: number; // tamaño del lado del tablero

  constructor() {
    this.size = 3;
  }

  dragStart(tile: any): void {
    this.currTile = tile;
  }

  dragOver(event: any): void {
    event.preventDefault()
  }

  dragEnter(event: any): void {
    event.preventDefault()
  }

  dragLave(): void {
  }

  drop(tile: any): void {
    if (tile) {
      this.otherTile = tile;
    }
  }

  dragEnd(): void {
    if (this.otherTile.indexOf(' ')) {
      return;
    }

    if (this.otherTile) {
      const index1 = this.tiles.indexOf(this.currTile);
      const index2 = this.tiles.indexOf(this.otherTile);
      // Comprueba si los elementos son adyacentes
      if (this.isAdjacent(index1, index2)) {
        [this.tiles[index1], this.tiles[index2]] = [this.tiles[index2], this.tiles[index1]];
        console.log([...this.tiles])
      }
    }
  }

  isAdjacent(index1: number, index2: number): boolean {
    const dx = Math.abs(Math.floor(index1 / this.size) - Math.floor(index2 / this.size));
    const dy = Math.abs((index1 % this.size) - (index2 % this.size));
    return (dx + dy === 1);
  }
}
