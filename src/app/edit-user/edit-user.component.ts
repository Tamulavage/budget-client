import { Component, OnInit,  Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorizedUser } from '../models/authorizedUser';
import { AuthorizeService } from '../services/authorize.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AuthorizedUser,
              private authorizeService: AuthorizeService) { }

  ngOnInit() {
  }

  submit() {
  }

  public confirmAdd(): void {
    this.authorizeService.addAuthorizeUser(this.data).subscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
