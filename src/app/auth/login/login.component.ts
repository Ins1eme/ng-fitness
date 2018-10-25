import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


import { AuthService } from '../auth.service';
import { UIService } from '../shared/ui.service';
import * as fromRoot from '../../app.reducer'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  isLoading$: Observable<boolean>

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<{ui: fromRoot.State}>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }
 
  onSubmit() {
    this.authService.login({
      email: this.form.value.email,
      password: this.form.value.password
    })
  }

}
