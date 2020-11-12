import { TestBed } from '@angular/core/testing'

import { ItemStockLevelsService } from './item-stock-levels.service'

describe('ItemStockLevelsService', () => {
  let service: ItemStockLevelsService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ItemStockLevelsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
