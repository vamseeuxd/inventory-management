import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ItemStockLevelsComponent } from './item-stock-levels.component'

describe('ItemStockLevelsComponent', () => {
  let component: ItemStockLevelsComponent
  let fixture: ComponentFixture<ItemStockLevelsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemStockLevelsComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemStockLevelsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
