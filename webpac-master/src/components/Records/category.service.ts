import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
    export class CategoryService {
        constructor (private http: HttpClient ) {}

        getAllCategories () {
            return this.http.get<any[]>(`/api/records/categories/all`);
        }
    }