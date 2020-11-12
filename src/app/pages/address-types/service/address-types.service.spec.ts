import { TestBed } from '@angular/core/testing'

import { AddressTypesService } from './address-types.service'

describe('AddressTypesService', () => {
  let service: AddressTypesService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(AddressTypesService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
