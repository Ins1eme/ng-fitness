import { Injectable } from "@angular/core";

import { AuthData } from "./auth-data.model";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { TrainingService } from "../training/training.service";
import { UIService } from "./shared/ui.service";
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer';
import * as UI from '../auth/shared/ui.action';
import * as Auth from './auth.action'

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService,
        private store: Store<fromRoot.State>
    ) {}

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.store.dispatch(new Auth.SetAuthentificated())
                this.router.navigate(['/training'])
            } else {
                this.trainingService.cancelSubscription()
                this.store.dispatch(new Auth.SetUnauthentificated())
                this.router.navigate(['/login'])
            }
        }) 
    }

    registerUser(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading())
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then((result) => {
                this.store.dispatch(new UI.StopLoading())
            })
            .catch((error) => {
                this.store.dispatch(new UI.StopLoading())
                this.uiService.showSnackbar(error.message, null, 3000)
            })
    }

    login(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading())
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then((result) => {  
                this.store.dispatch(new UI.StopLoading())
            })
            .catch((error) => {
                this.store.dispatch(new UI.StopLoading())
                this.uiService.showSnackbar(error.message, null, 3000)
            })
    }

    logout() {
        this.afAuth.auth.signOut()
    }
}