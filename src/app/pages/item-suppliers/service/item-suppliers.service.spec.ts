import { TestBed } from '@angular/core/testing';

import { ItemSuppliersService } from './item-suppliers.service';

describe('ItemSuppliersService', () => {
  let service: ItemSuppliersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemSuppliersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
