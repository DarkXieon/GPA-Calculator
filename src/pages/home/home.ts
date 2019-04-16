import { Component } from '@angular/core';
import { Utils } from '../../app/utils';
import { PrintProvider } from '../../providers/print/print';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  //constants
  private readonly acceptedCreditHourValues: number[] = [1, 2, 3, 4];
  private readonly acceptedGradeValues: string[] = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];

  private pageInfo: PageInfo = {
    studentName: undefined,
    date: undefined,
    currentGPA: undefined,
    currentCreditHoursTaken: undefined,
    classes: [this.createClass(), this.createClass(), this.createClass(), this.createClass(), this.createClass()],

    desiredGPA: undefined,
    termCreditHours: undefined,

    termGPA: undefined,
    cumulativeGPA: undefined
  }
  
  constructor(private printer: PrintProvider) {
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
    this.pageInfo.classes.push(this.createClass());
  }

  private removeClass(toRemove: Class): void {
    let index: number = this.pageInfo.classes.indexOf(toRemove);
    this.pageInfo.classes.splice(index, 1);
  }

  private getTermCreditHours(): number {

    let total: number = 0;
    
    for (let i: number = 0; i < this.pageInfo.classes.length; i++) {
      total += Number(this.pageInfo.classes[i].creditHours);
    }
    
    return total;
  }

  private getTermQualityPoints(): number {

    let total: number = 0;

    for (let i: number = 0; i < this.pageInfo.classes.length; i++) {
      total += Grade[this.pageInfo.classes[i].predictedGrade] * this.pageInfo.classes[i].creditHours;
    }

    return total;
  }

  private getPreviousCreditHours(): number {

    let total: number = 0;

    for (let i: number = 0; i < this.pageInfo.classes.length; i++) {
      if (this.pageInfo.classes[i].retaking) {
        total += this.pageInfo.classes[i].creditHours;
      }
    }

    return total;
  }

  private getPreviousQualityPoints(): number {

    let total: number = 0;

    for (let i: number = 0; i < this.pageInfo.classes.length; i++) {
      if (this.pageInfo.classes[i].retaking) {
        total += Grade[this.pageInfo.classes[i].previousGrade] * this.pageInfo.classes[i].creditHours;
      }
    }

    return total;
  }

  private getTermGPA(): string {
    
    let termCreditHours: number = this.getTermCreditHours();
    let termQualityPoints: number = this.getTermQualityPoints();
    
    let termGPA: number = termQualityPoints / termCreditHours;

    this.pageInfo.termGPA = !isNaN(termGPA) ? termGPA : NaN;

    return Utils.GetOutput(this.pageInfo.termGPA);
  }

  private getCumulativeGPA(): string {

    let currentQualityPoints: number = this.pageInfo.currentGPA * this.pageInfo.currentCreditHoursTaken;

    let termCreditHours: number = this.getTermCreditHours();
    let termQualityPoints: number = this.getTermQualityPoints();

    let termRetakeHours: number = this.getPreviousCreditHours();
    let termRetakePoints: number = this.getPreviousQualityPoints();
    
    let cumulativeGPA: number = ((currentQualityPoints - termRetakePoints) + termQualityPoints) / ((this.pageInfo.currentCreditHoursTaken - termRetakeHours) + termCreditHours);

    this.pageInfo.cumulativeGPA = !isNaN(cumulativeGPA) ? cumulativeGPA : NaN;

    return Utils.GetOutput(this.pageInfo.cumulativeGPA);
  }

  private getRequiredGPA(): string {
    
    let currentQualityPoints: number = this.pageInfo.currentGPA * this.pageInfo.currentCreditHoursTaken;

    let termQualityPointsNeeded: number = this.pageInfo.desiredGPA * (this.pageInfo.currentCreditHoursTaken + this.pageInfo.termCreditHours) - currentQualityPoints;
    let termGPANeeded: number = termQualityPointsNeeded / this.pageInfo.termCreditHours;
    
    return !isNaN(termGPANeeded) ? termGPANeeded.toFixed(2) : "";
  }

  private printPage(elementId: string): void {
    this.printer.print(elementId)
  }

  private updateTermCreditHours(): void {
    this.pageInfo.termCreditHours = Number(this.getTermCreditHours());
  }

  private stringBugFix(event): number {
    return +event;
  }

  private clear(): void {
    
    this.pageInfo.studentName = null;
    this.pageInfo.currentGPA = null;
    this.pageInfo.currentCreditHoursTaken = null;
    this.pageInfo.classes = [this.createClass(), this.createClass(), this.createClass(), this.createClass(), this.createClass()];

    this.pageInfo.desiredGPA = null;
    this.pageInfo.termCreditHours = null;

    this.pageInfo.termGPA = NaN;
    this.pageInfo.cumulativeGPA = NaN;
  }
}

export interface PageInfo {
  studentName: string;
  date: Date;
  currentGPA: number;
  currentCreditHoursTaken: number;
  classes: Class[];
  
  desiredGPA: number;
  termCreditHours: number;

  termGPA: number;
  cumulativeGPA: number;
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
  "C+" = 2.33,
  "C" = 2.0,
  "C-" = 1.67,
  "D+" = 1.33,
  "D" = 1.0,
  "D-" = 0.67,
  "F" = 0
}
