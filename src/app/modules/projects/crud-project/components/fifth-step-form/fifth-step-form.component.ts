import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'fifth-step-form',
  templateUrl: 'fifth-step-form.component.html'
})

export class FifthStepComponent implements OnInit {

  // Lists
  referencias: string[] = [];
  palavras: string[] = [];
  links: string[] = [];

  // MatChip
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor() { }

  ngOnInit() { }

  add(event: MatChipInputEvent, collection: string): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      if (collection === 'links') this.links.push(value);
      if (collection === 'palavras') this.palavras.push(value);
      if (collection === 'referencias') this.referencias.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(value: string, collection: string): void {
    console.log('remove value: ', value, collection);

    if (collection === 'links' ) {
      const index = this.links.indexOf(value);

      if (index >= 0) {
        this.links.splice(index, 1);
      }
    }

    if (collection === 'palavras' ) {
      const index = this.palavras.indexOf(value);

      if (index >= 0) {
        this.palavras.splice(index, 1);
      }
    }

    if (collection === 'referencias' ) {
      const index = this.referencias.indexOf(value);

      if (index >= 0) {
        this.referencias.splice(index, 1);
      }
    }
  }

  handleBack(): void {
    console.log('handleBack');
  }
}
