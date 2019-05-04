import { Injectable } from '@angular/core';
import domtoimage from 'dom-to-image';
import { toCanvas } from 'html-to-image';
import html2canvas from 'html2canvas';

@Injectable()
export class PrintProvider {
  constructor() { }

  public print(componentName: string): void {
    
    let node: HTMLElement = document.getElementById(componentName);
    node.style.display = "initial";

    let otherNode: HTMLElement = document.getElementById('not-printed');
    otherNode.style.display = "none";
    
    let width: number = node.getBoundingClientRect().width;
    let height: number = node.getBoundingClientRect().height;
    
    toCanvas(node, { quality: 1.0, width: width, height: height }).then((canvas: HTMLCanvasElement) => {
      
      let popup: Window = window.open();

      popup.document.body.appendChild(canvas);
      popup.document.close();
      popup.focus();
      
      setTimeout(function () {
        popup.print();
        popup.close();
        node.style.display = "none";
        otherNode.style.display = "initial";
      }, 250);
    });
  }
}
