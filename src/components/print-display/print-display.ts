import { Component, Input } from '@angular/core';
import { Class } from '../../pages/home/home';

@Component({
  selector: 'print-display',
  templateUrl: 'print-display.html'
})
export class PrintDisplayComponent {

  @Input()
  private classes: Class;

  @Input()
  private name: string;

  private date: Date;

  constructor() {
  }
}
