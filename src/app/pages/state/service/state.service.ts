import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore'
import { combineLatest, Observable, of } from 'rxjs'
import { UsersService } from '../../users/service/users.service'
import { BusyIndicatorService } from '../../../shared/busy-indicator/busy-indicator.service'
import * as firebase from 'firebase'
import {
  CountriesService,
  ICountry,
} from '../../countries/service/countries.service'
import { switchMap } from 'rxjs/operators'
import {
  leftJoin,
  leftJoinDocument,
} from '../../../shared/utilities/collectionJoin'

export interface IState {
  name: string
  id?: string
  country?: string | ICountry
  deleted: boolean
  createdOn?: string
  updatedOn?: string
  createdBy?: string
  updatedBy?: string
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private statesAction: AngularFirestoreCollection<IState>
  private readonly states123$: Observable<IState[]>
  private activeUser: string
  private readonly states$: Observable<IState[]>

  constructor(
    firestore: AngularFirestore,
    private usersService: UsersService,
    private countriesService: CountriesService,
    public busyIndicator: BusyIndicatorService
  ) {
    this.statesAction = firestore.collection<IState>('states')
    // @ts-ignore
    this.states$ = firestore
      .collection<IState>('states', (ref) => {
        return ref.where('deleted', '==', false).orderBy('createdOn')
      })
      .valueChanges()
      .pipe(leftJoinDocument(firestore, 'country', 'countries'))
    this.usersService.activeUser$.subscribe((activeUser) => {
      this.activeUser = activeUser
    })
  }

  addStates(state: IState): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (state.name.trim().length > 0) {
        const busyIndicatorId = this.busyIndicator.show()
        const docRef = this.statesAction.ref.doc()
        const name = state.name.trim()
        const id = docRef.id
        const country = state.country
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

  updateStates(state: IState): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (state.name.trim().length > 0) {
        const busyIndicatorId = this.busyIndicator.show()
        const docRef = this.statesAction.doc(state.id).ref
        const name = state.name.trim()
        const country = state.country
        const updatedOn = this.getServerTime()
        const updatedBy = this.activeUser
        try {
          await docRef.update({ name, country, updatedOn, updatedBy })
          resolve(docRef.id)
          this.busyIndicator.hide(busyIndicatorId)
        } catch (e) {
          this.busyIndicator.hide(busyIndicatorId)
          reject(e)
        }
      }
    })
  }

  deleteStates(state: IState): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const busyIndicatorId = this.busyIndicator.show()
      try {
        const docRef = await this.statesAction.doc(state.id)
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

  getStates(): Observable<IState[]> {
    return this.states$
  }

  getServerTime(): any {
    return firebase.firestore.Timestamp.now().seconds * 1000
  }
}
