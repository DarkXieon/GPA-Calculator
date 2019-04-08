import { Component, Input } from '@angular/core';
import { Class, PageInfo } from '../../pages/home/home';
import { Utils } from '../../app/utils';

@Component({
  selector: 'print-display',
  templateUrl: 'print-display.html'
})
export class PrintDisplayComponent {

  @Input()
  private pageInfo: PageInfo;
  
  constructor() {
  }

  private getOutput(num: number): string {
    return Utils.GetOutput(num);
  }
}
