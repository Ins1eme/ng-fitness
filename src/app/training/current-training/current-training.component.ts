import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.raducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  clearTimer
  counter: number = 0

  constructor(
    public dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit() {
    this.startTimer()
  }

  startTimer() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((ex) => {
        const step = ex.duration / 100 * 1000
        this.clearTimer = setInterval(_ => {
          this.counter++
          if (this.counter >= 100) {
            this.trainingService.completeExercise()
            clearInterval(this.clearTimer)
          }
      }, step)

    })
    
  }

  openDialog() {
    clearInterval(this.clearTimer)
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      width: '250px',
      data: {progress: this.counter}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.trainingService.cancelExercise(this.counter)
      } else {
        this.startTimer()
      }
    });

  }

}
