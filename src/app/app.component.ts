import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {BoardComponent} from "./components/board/board.component";
import {ButtonsComponent} from "./components/buttons/buttons.component";
import { SolutionComponent } from "./components/solution/solution.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, BoardComponent, ButtonsComponent, SolutionComponent]
})
export class AppComponent {
getMatrix() {
throw new Error('Method not implemented.');
}
  title = 'Puzzle-Solver';
}
