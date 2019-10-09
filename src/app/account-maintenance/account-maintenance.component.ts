import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-account-maintenance',
  templateUrl: './account-maintenance.component.html',
  styleUrls: ['./account-maintenance.component.css']
})
export class AccountMaintenanceComponent implements OnInit {

  @Input() user: number;

  constructor() {
   }

  ngOnInit() {
  }

  newAccount(): void {
    (document.getElementById('newAccountDiv') as HTMLInputElement).hidden = false;
    (document.getElementById('mainMaintenance') as HTMLInputElement).hidden = true;
    (document.getElementById('verify') as HTMLInputElement).hidden = false;
  }

  delete(): void {
    // TODO: Need to add
  }

  confirm(): void {
    // TODO: need to add
    (document.getElementById('newAccountDiv') as HTMLInputElement).hidden = true;
    (document.getElementById('mainMaintenance') as HTMLInputElement).hidden = false;
    (document.getElementById('verify') as HTMLInputElement).hidden = true;
  }


  cancel(): void {
    (document.getElementById('newAccountDiv') as HTMLInputElement).hidden = true;
    (document.getElementById('mainMaintenance') as HTMLInputElement).hidden = false;
    (document.getElementById('verify') as HTMLInputElement).hidden = true;
  }

}
