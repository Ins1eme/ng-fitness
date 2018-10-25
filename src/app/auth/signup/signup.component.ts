import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../shared/ui.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate: Date
  isLoading: boolean = false
  destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private authService: AuthService,
    private uiService: UIService
  ) { }

  ngOnInit() {
    this.uiService.loadingStateChanged.pipe(
      takeUntil(this.destroy$)
    ).subscribe((value) => {
      this.isLoading = value
    })
    this.maxDate = new Date()
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true)
  }

}
