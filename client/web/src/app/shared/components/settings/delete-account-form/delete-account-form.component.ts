import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountNavbarComponent } from '../../navs/account-navbar/account-navbar.component';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';
import { SelfService } from 'src/app/services/self/self.service';
import { User } from 'src/app/core/models/user/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-delete-account-form',
  templateUrl: './delete-account-form.component.html',
  styleUrls: ['./delete-account-form.component.scss']
})
export class DeleteAccountFormComponent implements OnInit {

  isSubmitting: boolean;
  showGoodChoice: boolean;
  constructor(public dialog: MatDialog, private selfService: SelfService,
    private authService: AuthService) { }

  ngOnInit() {
  }

  onClick(): void {
    this.showGoodChoice = false;
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.deleteAccount();
      else if (result === false)
        this.showGoodChoice = true;
    });
  }

  deleteAccount(): void {
    this.isSubmitting = true;
    this.selfService.deleteSelf()
      .then((user: User) => {
        this.authService.logout();
      })
      .catch((error) => {
      })
      .finally(() => {
        this.isSubmitting = false;
      })
  }
}
