import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Output() clicked: EventEmitter<MouseEvent> = new EventEmitter();

  onClick(event: MouseEvent) {
    this.clicked.emit(event);
  }
}
