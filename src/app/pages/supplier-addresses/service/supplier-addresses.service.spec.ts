import { TestBed } from '@angular/core/testing';

import { SupplierAddressesService } from './supplier-addresses.service';

describe('SupplierAddressesService', () => {
  let service: SupplierAddressesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierAddressesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
