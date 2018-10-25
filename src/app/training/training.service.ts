import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, take } from 'rxjs/operators'
import { Subject, Subscription } from 'rxjs'

import { Exercise } from './exercise.model';
import { UIService } from '../auth/shared/ui.service';
import * as fromTraining from './training.raducer';
import * as Training from './training.action';
import * as UI from '../auth/shared/ui.action';

@Injectable({
    providedIn: 'root'
})

export class TrainingService {

    private subscription: Subscription[] = []

    constructor(
        private db: AngularFirestore,
        private uiService: UIService,
        private store: Store<fromTraining.State>
    ) {}
    

    fetchExercises(): void {
        this.store.dispatch(new UI.StartLoading());
        this.subscription.push(this.db
            .collection('availableExercises')
            .snapshotChanges()
            .pipe(
                map(docArray => {
                    return docArray.map((doc: any) => {
                        return {
                            id: doc.payload.doc.id,
                            name: doc.payload.doc.data().name,
                            duration: doc.payload.doc.data().duration,
                            calories: doc.payload.doc.data().calories
                        }
                    })
                })
            )
            .subscribe(
                (exercises: Exercise[]) => {
                    this.store.dispatch(new UI.StopLoading());
                    this.store.dispatch(new Training.SetAvailableTrainings(exercises))
                },
                (error) => {
                    this.store.dispatch(new UI.StopLoading());
                    this.uiService.showSnackbar('Fetching exercises failed, try again later..', null, 3000)
                }
            )
        )
    }

    startExercise(selectedId: string) {
        this.store.dispatch(new Training.StartTraining(selectedId))
    }

    completeExercise() {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
            
            this.AddDataToDatabase(
                {
                    ...ex, 
                    date: new Date(), 
                    state: 'completed'
                }
            )
            this.store.dispatch(new Training.StopTraining())
        })
    }

    cancelExercise(progress: number) {
        this.store.select(fromTraining.getActiveTraining).pipe(
            take(1)
        ).subscribe(ex => {
            this.AddDataToDatabase({
                    ...ex, 
                    duration: ex.duration * (progress / 100), 
                    calories: ex.calories * (progress / 100),
                    date: new Date(),
                    state: 'cancelled'
                })
                this.store.dispatch(new Training.StopTraining())
        })
    }

    fetchAllExercise() {
        this.subscription.push(this.db.collection('finishedExercised').valueChanges()
            .subscribe(
                (exercises: Exercise[]) => {
                    this.store.dispatch(new Training.SetFinishedTrainings(exercises))
                }
            )
        )
    }

    cancelSubscription() {
        this.subscription.forEach((s) => s.unsubscribe())
    }

    private AddDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercised').add(exercise)
    }
}