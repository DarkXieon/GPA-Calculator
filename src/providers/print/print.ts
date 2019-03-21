import { Injectable } from '@angular/core';
import domtoimage from 'dom-to-image';
import htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import { createElementCssSelector, CssSelector } from '@angular/compiler';
import { createElement } from '@angular/core/src/view/element';
//import { createElement } from '@angular/core/src/view/element';

@Injectable()
export class PrintProvider {
  constructor() { }

  public print(componentName: string): void {
    //let selector: CssSelector = createElementCssSelector("", [["", ""]]);

    
    //var element = document.getElementById(componentName);
    
    //let element = document.createElement("div");
    //element.innerHTML = "<print-display [classes]='classes'></print-display>";
    ////document.write("<div><print-display [classes]='classes'></print-display></div>");
    //console.log(element);
    //html2canvas(element, { allowTaint: true }).then((canvas) => {
    //  canvas.getContext('2d');
    //  var image = canvas.toDataURL('image/jpeg', 1.0);
    //  var popup = window.open();
    //  //document.write('<img src="' + image + '"/>');
    //  popup.document.write('<img src=' + image + '>');
    //  popup.document.close();
    //  popup.focus();
    //  popup.print();
    //  popup.close();
    //});

    //var node = document.getElementById(componentName);

    //htmlToImage.toPng(node)
    //  .then(function (dataUrl) {
    //    var img = new Image();
    //    img.src = dataUrl;
    //    document.body.appendChild(img);
    //  })
    //  .catch(function (error) {
    //    console.error('oops, something went wrong!', error);
    //  });

    document.write("<print-display id='print' [classes]='classes'></print-display>");
    let node = document.getElementById("print");
    //node.innerHTML = "<print-display [classes]='classes'></print-display>";
    //let documentFragment: DocumentFragment = document.createDocumentFragment();
    //documentFragment.appendChild(node);
    //console.log(node);
    domtoimage.toPng(node)
      .then(function (dataUrl) {
        
        var popup = window.open();
        popup.document.write('<img src=' + dataUrl + '>');
        popup.document.close();
        popup.focus();
        popup.print();
        popup.close();
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }
}
