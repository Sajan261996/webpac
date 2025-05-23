import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecordService, AppRecord } from '../../../components/Records/record.service'; // ✅ Added AppRecord import

@Component({
  selector: 'app-record-page',
  templateUrl: './record-page.component.html',
})



export class RecordPageComponent implements OnInit {
  records: AppRecord[] = [];

  constructor(
    private recordService: RecordService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(): void {
    this.recordService.getAllRecords().subscribe({
      next: (data) => {
        this.records = data;
      },
      error: (err) => {
        console.error('Error fetching records:', err); // ✅ FIXED: spelling
      }
    });
  }

  gotoRecordDetails(id: string): void {
    this.router.navigate(['/record', id]);
  }

  addNewRecord(): void {
    this.router.navigate(['/record', 'new']);
  }
}
