import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PrintProvider } from '../../providers/print/print';
import { Printer } from '@ionic-native/printer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  //constants
  private readonly acceptedCreditHourValues: number[] = [1, 2, 3, 4];
  private readonly acceptedGradeValues: string[] = ["A", "A-", "B+", "B", "B-", "C", "C-", "D+", "D", "D-", "F"];

  //main inputs
  private studentName: string;
  private date: Date;
  private currentGPA: number;
  private currentCreditHoursTaken: number;
  private classes: Class[];

  //raise my gpa inputs
  private desiredGPA: number;
  private termCreditHours: number;

  //outputs
  private termGPA: number;
  

  constructor(private printer: PrintProvider) {
    this.classes = [this.createClass(), this.createClass(), this.createClass(), this.createClass(), this.createClass()];
  }

  private createClass(): Class {
    return {
      name: "",
      predictedGrade: "C",
      creditHours: 3,
      retaking: false,
      previousGrade: "C"
    }
  }

  private addClass(): void {
    this.classes.push(this.createClass());
  }

  private removeClass(toRemove: Class): void {
    let index: number = this.classes.indexOf(toRemove);
    this.classes.splice(index, 1);
  }

  private getTermCreditHours(): number {

    let total: number = 0;
    
    for (let i: number = 0; i < this.classes.length; i++) {
      total += Number(this.classes[i].creditHours);
    }
    
    return total;
  }

  private getTermQualityPoints(): number {

    let total: number = 0;

    for (let i: number = 0; i < this.classes.length; i++) {
      total += Grade[this.classes[i].predictedGrade] * this.classes[i].creditHours;
    }

    return total;
  }

  private getPreviousCreditHours(): number {

    let total: number = 0;

    for (let i: number = 0; i < this.classes.length; i++) {
      if (this.classes[i].retaking) {
        total += this.classes[i].creditHours;
      }
    }

    return total;
  }

  private getPreviousQualityPoints(): number {

    let total: number = 0;

    for (let i: number = 0; i < this.classes.length; i++) {
      if (this.classes[i].retaking) {
        total += Grade[this.classes[i].previousGrade] * this.classes[i].creditHours;
      }
    }

    return total;
  }

  private getTermGPA(): string {
    
    let termCreditHours: number = this.getTermCreditHours();
    let termQualityPoints: number = this.getTermQualityPoints();
    
    let termGPA: number = termQualityPoints / termCreditHours;
    
    return !isNaN(termGPA) ? termGPA.toFixed(2) : "";
  }

  private getCumulativeGPA(): string {

    let currentQualityPoints: number = this.currentGPA * this.currentCreditHoursTaken;

    let termCreditHours: number = this.getTermCreditHours();
    let termQualityPoints: number = this.getTermQualityPoints();

    let termRetakeHours: number = this.getPreviousCreditHours();
    let termRetakePoints: number = this.getPreviousQualityPoints();
    
    let cumulativeGPA: number = ((currentQualityPoints - termRetakePoints) + termQualityPoints) / ((this.currentCreditHoursTaken - termRetakeHours) + termCreditHours);

    return !isNaN(cumulativeGPA) ? cumulativeGPA.toFixed(2) : "";
  }

  private getRequiredGPA(): string {
    
    let currentQualityPoints: number = this.currentGPA * this.currentCreditHoursTaken;

    let termQualityPointsNeeded: number = this.desiredGPA * (this.currentCreditHoursTaken + this.termCreditHours) - currentQualityPoints;
    let termGPANeeded: number = termQualityPointsNeeded / this.termCreditHours;
    
    return !isNaN(termGPANeeded) ? termGPANeeded.toFixed(2) : "";
  }

  private printPage(elementId: string): void {
    this.printer.print(elementId)
  }

  private updateTermCreditHours(): void {
    this.termCreditHours = Number(this.getTermCreditHours());
  }

  private stringBugFix(event): number {
    return +event;
  }

  private clear(): void {

    this.studentName = "";
    this.currentGPA = NaN;
    this.currentCreditHoursTaken = NaN;
    this.classes = [this.createClass(), this.createClass(), this.createClass(), this.createClass(), this.createClass()];

    this.desiredGPA = NaN;
    this.termCreditHours = NaN;
  }
}

export interface Class {
  name: string;
  predictedGrade: string;
  creditHours: number;
  retaking: boolean;
  previousGrade: string;
}

export enum Grade {
  "A" = 4.0,
  "A-" = 3.67,
  "B+" = 3.33,
  "B" = 3.0,
  "B-" = 2.67,
  "C" = 2.0,
  "C-" = 1.67,
  "D+" = 1.33,
  "D" = 1.0,
  "D-" = 0.67,
  "F" = 0
}
