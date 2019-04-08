import { Injectable } from '@angular/core';
import domtoimage from 'dom-to-image';
import htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import { createElementCssSelector, CssSelector } from '@angular/compiler';
import { createElement } from '@angular/core/src/view/element';
import { disableDebugTools } from '@angular/platform-browser';
//import { createElement } from '@angular/core/src/view/element';

@Injectable()
export class PrintProvider {
  constructor() { }

  public print(componentName: string): void {

    //let test = document.createElement("div");
    //element.innerHTML = "<print-display [classes]='classes'></print-display>";
    //document.write("<div><print-display [classes]='classes'></print-display></div>");

    //document.write("<div><print-display [classes]='classes' id='temp'></print-display></div>");
    //let test = document.getElementById('temp');
    //console.log(test);

    //let img = popup.document.createElement('img');
    //img.src = image;
    //popup.document.append(img);

    var element = document.getElementById(componentName);
    element.style.display = "initial";

    console.log(element);

    html2canvas(element, { allowTaint: true }).then((canvas: HTMLCanvasElement) => {
      
      let context: CanvasRenderingContext2D = canvas.getContext('2d');
      var image = canvas.toDataURL('image/jpeg', 1.0);
      //context.drawImage(image, 0, 0, image.width * 2, image.height * 2);
      var popup = window.open();
      popup.document.write('<img src="' + image + '">');
      popup.document.close();
      popup.focus();

      setTimeout(function () {
        popup.print();
        popup.close();
        element.style.display = "none";
      }, 250);
    });

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

    
    //let node = document.getElementById("printer");
    //node.style.display = "initial";

    //domtoimage.toPng(node)
    //  .then(function (dataUrl) {
    //    var popup = window.open();
    //    popup.document.write('<img src="' + dataUrl + '">');
    //    popup.document.close();
    //    popup.focus();

    //    setTimeout(function () {
    //      popup.print();
    //      popup.close();
    //      node.style.display = "none";
    //    }, 250);
    //  })
    //  .catch(function (error) {
    //    console.error('oops, something went wrong!', error);
    //  });
  }
}
