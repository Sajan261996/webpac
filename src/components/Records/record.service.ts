import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

// ✅ Interface for record object
export interface AppRecord {
  id: string;
  title: string;
  customerID: string;
  customerName: string;
}

@Injectable({ providedIn: 'root' })
export class RecordService {
  private baseUrl = 'http://localhost:9000'; // ✅ Base URL for the API

  constructor(private http: HttpClient) {}

  // ✅ Get all records
  getAllRecords(): Observable<AppRecord[]> {
    return this.http.get<AppRecord[]>(this.baseUrl);
  }

  // ✅ Get a single record by ID
  getRecordById(id: string): Observable<AppRecord> {
    return this.http.get<AppRecord>(`${this.baseUrl}/${id}`);
  }

  // ✅ Create a new record
  createRecord(record: Partial<AppRecord>): Observable<AppRecord> {
    return this.http.post<AppRecord>(this.baseUrl, record);
  }

  // ✅ Update an existing record
  updateRecord(id: string, record: Partial<AppRecord>): Observable<AppRecord> {
    return this.http.put<AppRecord>(`${this.baseUrl}/${id}`, record);
  }
}
