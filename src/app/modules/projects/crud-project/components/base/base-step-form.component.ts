import { Directive, EventEmitter, OnDestroy, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Directive({})
export class BaseStepFormComponent implements OnDestroy {
  @Output() nextStep: EventEmitter<any> = new EventEmitter();

  @Output() backStep: EventEmitter<any> = new EventEmitter();

  unsubscribeAll$ = new ReplaySubject();

  constructor() {}

  handleBack(): void {
    this.backStep.emit();
  }

  handleNext(): void {
    this.nextStep.emit();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next(null);
    this.unsubscribeAll$.complete();
  }
}
