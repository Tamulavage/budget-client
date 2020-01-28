import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PingService } from '../services/ping.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService,
              public ping: PingService) { }

  ngOnInit() {
    this.ping.pingServer().subscribe();
  }
}
