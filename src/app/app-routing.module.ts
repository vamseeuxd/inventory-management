import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AddressComponent } from './pages/address/address.component'
import { AddressTypesComponent } from './pages/address-types/address-types.component'
import { BrandsComponent } from './pages/brands/brands.component'
import { CitiesComponent } from './pages/cities/cities.component'
import { CountriesComponent } from './pages/countries/countries.component'
import { InventoryItemsComponent } from './pages/inventory-items/inventory-items.component'
import { ItemCategoriesComponent } from './pages/item-categories/item-categories.component'
import { ItemStockLevelsComponent } from './pages/item-stock-levels/item-stock-levels.component'
import { ItemSuppliersComponent } from './pages/item-suppliers/item-suppliers.component'
import { StateComponent } from './pages/state/state.component'
import { SupplierAddressesComponent } from './pages/supplier-addresses/supplier-addresses.component'
import { SuppliersComponent } from './pages/suppliers/suppliers.component'
import { UsersComponent } from './pages/users/users.component'

export const pages = [
  AddressComponent,
  AddressTypesComponent,
  BrandsComponent,
  CitiesComponent,
  CountriesComponent,
  InventoryItemsComponent,
  ItemCategoriesComponent,
  ItemStockLevelsComponent,
  ItemSuppliersComponent,
  StateComponent,
  SupplierAddressesComponent,
  SuppliersComponent,
  UsersComponent,
]

const routes: Routes = [
  { component: AddressComponent, path: 'address' },
  { component: AddressTypesComponent, path: 'address-types' },
  { component: BrandsComponent, path: 'brands' },
  { component: CitiesComponent, path: 'cities' },
  { component: CountriesComponent, path: 'countries' },
  { component: InventoryItemsComponent, path: 'inventory-items' },
  { component: ItemCategoriesComponent, path: 'item-categories' },
  { component: ItemStockLevelsComponent, path: 'item-stock-levels' },
  { component: ItemSuppliersComponent, path: 'item-suppliers' },
  { component: StateComponent, path: 'state' },
  { component: SupplierAddressesComponent, path: 'supplier-addresses' },
  { component: SuppliersComponent, path: 'suppliers' },
  { component: UsersComponent, path: 'users' },
  { path: '', redirectTo: 'countries', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
