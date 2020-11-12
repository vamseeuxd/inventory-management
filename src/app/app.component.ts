import { Component, HostListener, ViewChild } from '@angular/core'
import { BusyIndicatorService } from './shared/busy-indicator/busy-indicator.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isMenuOpened = false

  constructor(
    public router: Router,
    public busyIndicator: BusyIndicatorService
  ) {}
}
