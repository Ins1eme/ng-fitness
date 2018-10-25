import { Component, Inject } from "@angular/core";

import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'app-stop-training',
    template: `
    <h1 mat-dialog-title>Are you sure?</h1>
    <mat-dialog-content>
        <p>You already got {{passedData.progress | number: '1.0-0'}}%</p>
    </mat-dialog-content>
    <mat-dialog-actions fxLayout fxLayoutAlign="center">
        <button mat-button [mat-dialog-close] = "true" color="">Yes</button>
        <button mat-button [mat-dialog-close] = "false"color="">No</button>
    </mat-dialog-actions>
    `
  })

export class StopTrainingComponent {

constructor(
    @Inject(MAT_DIALOG_DATA) public passedData
    ) {}
}