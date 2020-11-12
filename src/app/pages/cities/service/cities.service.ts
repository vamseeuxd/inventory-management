import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { UsersService } from '../../users/service/users.service'
import {
  CountriesService,
  ICountry,
} from '../../countries/service/countries.service'
import { BusyIndicatorService } from '../../../shared/busy-indicator/busy-indicator.service'
import { leftJoinDocument } from '../../../shared/utilities/collectionJoin'
import * as firebase from 'firebase'
import { IState } from '../../state/service/state.service'

export interface ICity {
  name: string
  id?: string
  country?: string | ICountry
  state?: string | IState
  deleted: boolean
  createdOn?: string
  updatedOn?: string
  createdBy?: string
  updatedBy?: string
}

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  private citiesAction: AngularFirestoreCollection<ICity>
  private readonly cities123$: Observable<ICity[]>
  private activeUser: string
  private readonly cities$: Observable<ICity[]>

  constructor(
    firestore: AngularFirestore,
    private usersService: UsersService,
    private countriesService: CountriesService,
    public busyIndicator: BusyIndicatorService
  ) {
    this.citiesAction = firestore.collection<ICity>('cities')
    // @ts-ignore
    this.cities$ = firestore
      .collection<ICity>('cities', (ref) => {
        return ref.where('deleted', '==', false).orderBy('createdOn')
      })
      .valueChanges()
      .pipe(
        leftJoinDocument(firestore, 'country', 'countries'),
        leftJoinDocument(firestore, 'state', 'states')
      )
    this.usersService.activeUser$.subscribe((activeUser) => {
      this.activeUser = activeUser
    })
  }

  addCities(city: ICity): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (city.name.trim().length > 0) {
        const busyIndicatorId = this.busyIndicator.show()
        const docRef = this.citiesAction.ref.doc()
        const name = city.name.trim()
        const id = docRef.id
        const country = city.country
        const state = city.state
        const deleted = false
        const createdOn = this.getServerTime()
        const updatedOn = this.getServerTime()
        const createdBy = this.activeUser
        const updatedBy = this.activeUser
        try {
          await docRef.set({
            name,
            id,
            country,
            state,
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

  updateCities(city: ICity): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (city.name.trim().length > 0) {
        const busyIndicatorId = this.busyIndicator.show()
        const docRef = this.citiesAction.doc(city.id).ref
        const name = city.name.trim()
        const country = city.country
        const state = city.state
        const updatedOn = this.getServerTime()
        const updatedBy = this.activeUser
        try {
          await docRef.update({ name, country, state, updatedOn, updatedBy })
          resolve(docRef.id)
          this.busyIndicator.hide(busyIndicatorId)
        } catch (e) {
          this.busyIndicator.hide(busyIndicatorId)
          reject(e)
        }
      }
    })
  }

  deleteCities(city: ICity): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const busyIndicatorId = this.busyIndicator.show()
      try {
        const docRef = await this.citiesAction.doc(city.id)
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

  getCities(): Observable<ICity[]> {
    return this.cities$
  }

  getServerTime(): any {
    return firebase.firestore.Timestamp.now().seconds * 1000
  }
}
