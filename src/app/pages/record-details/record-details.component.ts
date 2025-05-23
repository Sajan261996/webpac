import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordService, AppRecord } from '../../../components/Records/record.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../components/Records/category.service';

@Component({
  selector: 'app-record-details',
  templateUrl: './record-details.component.html',
  styleUrls: ['./record-details.component.css']
})
export class RecordDetailsComponent implements OnInit {
  recordForm!: FormGroup;
  recordId: string | null = null;
  categories: any[] = [];
  subCategories: string[] = [];
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recordService: RecordService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.recordForm = this.fb.group({
      title: ['', Validators.required],
      customerId: ['', Validators.required],
      interestCategories: [[]],
      interestSubCategories: [[]]
    });

    this.route.paramMap.subscribe(params => {
      this.recordId = params.get('id');
      this.isEditMode = this.recordId !== null && this.recordId !== 'new';

      if (this.isEditMode && this.recordId) {
        this.recordService.getRecordById(this.recordId).subscribe({
          next: (record: AppRecord) => {
            this.recordForm.patchValue({
              title: record.title,
              customerId: record.customerID,

              interestCategories: [],          // Add if data exists
              interestSubCategories: []
            });
          },
          error: (err: any) => console.error('Failed to load record', err)
        });
      }
    });

    this.categoryService.getAllCategories().subscribe({
      next: (data: any[]) => (this.categories = data),
      error: (err: any) => console.error('Failed to load categories', err)
    });
  }

  onSubmit(): void {
    if (this.recordForm.invalid) return;

    const formValue = this.recordForm.value;
    const recordPayload: Partial<AppRecord> = {
      title: formValue.title,
      customerID: formValue.customerId,
      customerName: '' // Optional if not captured in form
    };

    if (this.isEditMode && this.recordId) {
      this.recordService.updateRecord(this.recordId, recordPayload).subscribe(() => {
        this.router.navigate(['/records']);
      });
    } else {
      this.recordService.createRecord(recordPayload).subscribe(() => {
        this.router.navigate(['/records']);
      });
    }
  }

  onCategoryChange(): void {
    const selected = this.recordForm.get('interestCategories')?.value || [];
    const allSubs = this.categories
      .filter(cat => selected.includes(cat.name))
      .flatMap(cat => cat.subCategories || []);
    this.subCategories = allSubs;
  }
}
