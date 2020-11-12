import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore'
import * as firebase from 'firebase'
import { UsersService } from '../../users/service/users.service'
import { BusyIndicatorService } from '../../../shared/busy-indicator/busy-indicator.service'

export interface ICountry {
  name: string
  id?: string
  country?: string
  deleted: boolean
  createdOn?: string
  updatedOn?: string
  createdBy?: string
  updatedBy?: string
}

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private countriesAction: AngularFirestoreCollection<ICountry>
  readonly countries$: Observable<ICountry[]>
  private activeUser: string

  constructor(
    firestore: AngularFirestore,
    private usersService: UsersService,
    public busyIndicator: BusyIndicatorService
  ) {
    this.countriesAction = firestore.collection<ICountry>('countries')
    this.countries$ = firestore
      .collection<ICountry>('countries', (ref) => {
        return ref.where('deleted', '==', false).orderBy('createdOn')
      })
      .valueChanges()
    this.usersService.activeUser$.subscribe((activeUser) => {
      this.activeUser = activeUser
    })
  }

  addCountries(country: ICountry): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (country.name.trim().length > 0) {
        const busyIndicatorId = this.busyIndicator.show()
        const docRef = this.countriesAction.ref.doc()
        const name = country.name.trim()
        const id = docRef.id
        const deleted = false
        const createdOn = this.getServerTime()
        const updatedOn = this.getServerTime()
        const createdBy = this.activeUser
        const updatedBy = this.activeUser
        try {
          await docRef.set({
            name,
            id,
            createdOn,
            updatedOn,
            createdBy,
            updatedBy,
            deleted,
          })
          this.busyIndicator.hide(busyIndicatorId)
          resolve(id)
        } catch (e) {
          this.busyIndicator.hide(busyIndicatorId)
          reject(e)
        }
      }
    })
  }

  updateCountries(country: ICountry): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (country.name.trim().length > 0) {
        const busyIndicatorId = this.busyIndicator.show()
        const docRef = this.countriesAction.doc(country.id).ref
        const name = country.name.trim()
        const updatedOn = this.getServerTime()
        const updatedBy = this.activeUser
        try {
          await docRef.update({ name, updatedOn, updatedBy })
          resolve(docRef.id)
          this.busyIndicator.hide(busyIndicatorId)
        } catch (e) {
          this.busyIndicator.hide(busyIndicatorId)
          reject(e)
        }
      }
    })
  }

  deleteCountries(country: ICountry): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const busyIndicatorId = this.busyIndicator.show()
      try {
        const docRef = await this.countriesAction.doc(country.id)
        const doc = await docRef.get().toPromise()
        const updatedOn = this.getServerTime()
        const updatedBy = this.activeUser
        await docRef.set({
          ...doc.data(),
          deleted: true,
          updatedOn,
          updatedBy,
        })
        resolve(doc.id)
        this.busyIndicator.hide(busyIndicatorId)
      } catch (e) {
        this.busyIndicator.hide(busyIndicatorId)
        reject(e)
      }
    })
  }

  getCountries(): Observable<ICountry[]> {
    return this.countries$
  }

  getServerTime(): any {
    return firebase.firestore.Timestamp.now().seconds * 1000
  }
}
