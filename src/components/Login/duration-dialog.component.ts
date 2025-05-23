import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup,Validators } from "@angular/forms";


@Component({
    selector: 'app-duration-dialog',
    templateUrl: ''
})

export class DurationDialogComponent {
    durationForm: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<DurationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder
    ) {
        this.durationForm = this.fb.group({
            id: [data?.id || null],
            start: [data?.id || '', Validators.required],
            end: [data?.end || '', Validators.required]
        });
    }

    onSave(): void{
        if(this.durationForm.valid) {
            this.dialogRef.close(this.durationForm.value);
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }

}