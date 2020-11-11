import { Component, OnInit } from '@angular/core';
import {CountriesService} from '../countries/service/countries.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgForm} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {IState, StateService} from './service/state.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss'],
})
export class StateComponent implements OnInit {
  stateToEdit: IState = {name: '', deleted: false, id: ''};

  constructor(
    public stateService: StateService,
    public countriesService: CountriesService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
  }

  async addState(value: IState, form: NgForm, modal: ModalDirective = null) {
    try {
      await this.stateService.addStates(value);
      form.resetForm({});
      if(modal) {
        modal.hide();
      }
      this._snackBar.open('State Added Successfully', 'Success', {
        duration: 2000,
      });
    } catch (e) {
      alert(e);
    }
  }

  async deleteState(value: IState) {
    const isConfirmed = confirm('Are you sure! Do you want to delete the State')
    if (isConfirmed) {
      try {
        await this.stateService.deleteStates(value);
        this._snackBar.open('State Deleted Successfully', 'Success', {
          duration: 2000,
        });
      } catch (e) {
        alert(e);
      }
    }
  }

  async updateState(value: IState, form: NgForm, modal: ModalDirective) {
    try {
      await this.stateService.updateStates(value);
      form.resetForm({});
      modal.hide();
      this.stateToEdit = {name: '', deleted: false, id: ''};
      this._snackBar.open('State Updated Successfully', 'Success', {
        duration: 2000,
      });
    } catch (e) {
      alert(e);
    }
  }
}
