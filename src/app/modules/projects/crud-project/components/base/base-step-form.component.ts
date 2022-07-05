import { Directive, EventEmitter, Output } from '@angular/core';

@Directive({})
export class BaseStepFormComponent {
  @Output() nextStep: EventEmitter<any> = new EventEmitter();

  @Output() backStep: EventEmitter<any> = new EventEmitter();

  constructor() {}

  handleBack(): void {
    this.backStep.emit();
  }

  handleNext(): void {
    this.nextStep.emit();
  }
}
