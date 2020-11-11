import {Component, OnInit} from '@angular/core';
import {CountriesService, ICountry} from './service/countries.service';
import {NgForm} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {

  countryToEdit: ICountry = {name: '', deleted: false, id: ''};

  constructor(
    public countriesService: CountriesService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
  }

  async addCountries(value: ICountry, form: NgForm, modal: ModalDirective = null) {
    try {
      await this.countriesService.addCountries(value);
      form.resetForm({});
      if(modal) {
        modal.hide();
      }
      this._snackBar.open('Country Added Successfully', 'Success', {
        duration: 2000,
      });
    } catch (e) {
      alert(e);
    }
  }

  async deleteCountries(value: ICountry) {
    const isConfirmed = confirm('Are you sure! Do you want to delete the Country')
    if (isConfirmed) {
      try {
        await this.countriesService.deleteCountries(value);
        this._snackBar.open('Country Deleted Successfully', 'Success', {
          duration: 2000,
        });
      } catch (e) {
        alert(e);
      }
    }
  }

  async updateCountries(value: ICountry, form: NgForm, modal: ModalDirective) {
    try {
      await this.countriesService.updateCountries(value);
      form.resetForm({});
      modal.hide();
      this.countryToEdit = {name: '', deleted: false, id: ''};
      this._snackBar.open('Country Updated Successfully', 'Success', {
        duration: 2000,
      });
    } catch (e) {
      alert(e);
    }
  }
}
