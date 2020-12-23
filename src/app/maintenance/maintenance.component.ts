import { Component, Input, OnInit } from '@angular/core';
import { MaintenanceService } from '../services/maintenance.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {
  @Input() userId: number;
  
  showMaintence = true;
  showConfirm = false;
  
  showComplete = false;
  action: string;

  constructor(private maintenanceService: MaintenanceService) { }

  ngOnInit() {
  }

  resetToEmpy(){
    this.resetClicked();
    this.action = "RESET";
  }

  demoReset(){
    this.resetClicked();
    this.action = "DEMO";
  }

  cancel(){
    this.cancelClicked()
  }

  confirm(){
    switch(this.action) {
      case "RESET": {
        this.maintenanceService.resetValues(this.userId).subscribe();
        break;
      }
      case "DEMO": {
        this.maintenanceService.resetToDemo(this.userId).subscribe();
        break;
      }      
    }
    this.showComplete = true;
  }

  resetClicked(){
    this.showMaintence = false;
    this.showConfirm = true;
  }

  cancelClicked(){
    this.showMaintence = true;
    this.showConfirm = false;
  }

}
