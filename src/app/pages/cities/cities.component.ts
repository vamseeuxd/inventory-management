import { Component, OnInit } from '@angular/core'
import {
  CountriesService,
  ICountry,
} from '../countries/service/countries.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { NgForm } from '@angular/forms'
import { ModalDirective } from 'ngx-bootstrap/modal'
import { CitiesService, ICity } from './service/cities.service'
import { StateService } from '../state/service/state.service'
import { BehaviorSubject, combineLatest, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
})
export class CitiesComponent implements OnInit {
  cityToEdit: ICity = { name: '', deleted: false, id: '' }
  selectedCountry$: BehaviorSubject<ICountry> = new BehaviorSubject<ICountry>(
    null
  )
  statesList$ = combineLatest(
    this.stateService.getStates(),
    this.selectedCountry$
  ).pipe(
    switchMap(([states, country]) =>
      of(
        states.filter((state) => {
          // @ts-ignore
          if (state.country && state.country.id && country) {
            // @ts-ignore
            return state.country.id === country
          } else {
            return false
          }
        })
      )
    )
  )

  constructor(
    public cityService: CitiesService,
    public countriesService: CountriesService,
    public stateService: StateService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  async addCity(value: ICity, form: NgForm, modal: ModalDirective = null) {
    try {
      await this.cityService.addCities(value)
      form.resetForm({})
      if (modal) {
        modal.hide()
      }
      this._snackBar.open('City Added Successfully', 'Success', {
        duration: 2000,
      })
    } catch (e) {
      alert(e)
    }
  }

  async deleteCity(value: ICity) {
    const isConfirmed = confirm('Are you sure! Do you want to delete the City')
    if (isConfirmed) {
      try {
        await this.cityService.deleteCities(value)
        this._snackBar.open('City Deleted Successfully', 'Success', {
          duration: 2000,
        })
      } catch (e) {
        alert(e)
      }
    }
  }

  async updateCity(value: ICity, form: NgForm, modal: ModalDirective) {
    try {
      await this.cityService.updateCities(value)
      form.resetForm({})
      modal.hide()
      this.cityToEdit = { name: '', deleted: false, id: '' }
      this._snackBar.open('City Updated Successfully', 'Success', {
        duration: 2000,
      })
    } catch (e) {
      alert(e)
    }
  }
}
