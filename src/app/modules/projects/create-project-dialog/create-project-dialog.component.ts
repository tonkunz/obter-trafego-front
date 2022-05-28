import { Component, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreditsService } from 'app/core/services/credits/credits.service';
import { ICreditItem } from 'app/core/services/credits/credits.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'create-project-dialog',
  templateUrl: 'create-project-dialog.component.html',
  styles: [
    /* language=SCSS */
    `
      .mat-dialog-container {
        padding: 0 !important;
      }
    `,
  ],
  styleUrls: ['./create-project-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateProjectDialogComponent implements OnDestroy {
  credits: ICreditItem[] = [];
  selectedCredit: ICreditItem | null = null;

  private _unsubscriber: Subject<any> = new Subject<any>();

  constructor(
    public dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _creditsService: CreditsService
  ) {
    this._creditsService
      .getClientCredits()
      .pipe(takeUntil(this._unsubscriber))
      .subscribe((res: ICreditItem[]) => (this.credits = res));
  }

  handleClickProject(item: ICreditItem): void {
    if (this.selectedCredit === item) {
      this.selectedCredit = null;
      return;
    }

    if (item.creditos) {
      this.selectedCredit = item;
    }
  }

  // TODO: Verify all creditos to buy

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreateProject(): void {
    this.dialogRef.close(this.selectedCredit);
  }

  ngOnDestroy(): void {
    this._unsubscriber.next(null);
    this._unsubscriber.complete();
  }
}
