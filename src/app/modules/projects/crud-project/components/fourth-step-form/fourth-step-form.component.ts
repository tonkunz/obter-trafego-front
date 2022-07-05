import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationsService } from 'app/core/services/locations/locations.service';
import { ILocation } from 'app/core/services/locations/locations.types';
import { map, Observable, ReplaySubject, startWith, takeUntil } from 'rxjs';
import { BaseStepFormComponent } from '../base/base-step-form.component';

@Component({
  selector: 'fourth-step-form',
  templateUrl: 'fourth-step-form.component.html',
  styleUrls: ['./fourth-step-form.component.scss'],
})
export class FourthStepComponent extends BaseStepFormComponent implements OnInit, OnDestroy {
  @Input() locationData;

  locationForm: FormGroup;

  taxaTotal = 100;

  locationsList: ILocation[] = [];

  filteredLocations: Observable<ILocation[]>;

  private _unsubscribeAll$ = new ReplaySubject();

  constructor(
    private _fb: FormBuilder,
    private _locationsService: LocationsService
  ) {
    super();
  }

  ngOnInit() {
    this.createForm();
    this.addLocation();

    this._locationsService.locationsList$
      .subscribe( (value: ILocation[]) => this.locationsList = value);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll$.next(null);
    this._unsubscribeAll$.complete();
  }

  createForm(): void {
    this.locationForm = this._fb.group({
      localizacoes: this._fb.array([]),
    });
  }

  handleFocus(index: number) {
    this.filteredLocations = this.localizacoes.controls[index]['controls'].busca.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll$),
        startWith(''),
        map((nomeBusca: string | ILocation) => {
          const nomeCidade = typeof nomeBusca === 'string' ? nomeBusca : nomeBusca?.cidade;
          return nomeCidade ? this._filter(nomeCidade as string) : this.locationsList.slice();
        }),
      );
  }

  handleLocationOption(option: ILocation, index: number) {
    console.log('handleLocationOption: ', );
    const { id, cidade, estado } = this.localizacoes.controls[index]['controls'];

    id.setValue(option.id);
    cidade.setValue(option.cidade);
    estado.setValue(option.estado);
  }

  displayFn(cidade: ILocation): string {
    return cidade && cidade.cidade ? `${cidade.cidade} - ${cidade.estado}` : '';
  }

  private _filter(cidade: string): ILocation[] {
    const filterValue = cidade.toLowerCase();

    return this.locationsList.filter(option => option.cidade.toLowerCase().includes(filterValue));
  }

  // Form Array Methods
  get localizacoes() {
    return this.locationForm.controls['localizacoes'] as FormArray;
  }

  addLocation() {
    const locationForm = this._fb.group({
      id: ['', [Validators.required]],
      busca: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      taxa: [0, [Validators.required]],
    });

    this.localizacoes.push(locationForm);
  }

  deleteLocation(locationIndex: number) {
    this.localizacoes.removeAt(locationIndex);
  }

  handleSubmit(): void {
    console.log('submit: ', this.locationForm.value);
  }
}
