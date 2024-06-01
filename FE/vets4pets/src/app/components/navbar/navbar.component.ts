import { Component } from '@angular/core';
import { NavigationService } from '../../commons/navigation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private navigationService: NavigationService) { }
  navigateToAppointments() {
    this.navigationService.navigateToAppointments();
  }
}
