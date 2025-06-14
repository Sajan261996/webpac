import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordDetailsComponent } from './record-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RecordService } from '../../../components/Records/record.service';
import { CategoryService } from '../../../components/Records/category.service';

describe('RecordDetailsComponent', () => {
  let component: RecordDetailsComponent;
  let fixture: ComponentFixture<RecordDetailsComponent>;
  let mockRecordService: any;
  let mockCategoryService: any;

  beforeEach(async () => {
    mockRecordService = {
      getRecordById: jasmine.createSpy('getRecordById').and.returnValue(of({
        id: '1',
        title: 'Test Title',
        coustmerID: '123',
        coustmerName: 'John Doe'
      })),
      updateRecord: jasmine.createSpy('updateRecord').and.returnValue(of({})),
      createRecord: jasmine.createSpy('createRecord').and.returnValue(of({}))
    };

    mockCategoryService = {
      getAllCategories: jasmine.createSpy('getAllCategories').and.returnValue(of([]))
    };

    await TestBed.configureTestingModule({
      declarations: [RecordDetailsComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: RecordService, useValue: mockRecordService },
        { provide: CategoryService, useValue: mockCategoryService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => key === 'id' ? '1' : null
            })
          }
        },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecordDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with record data in edit mode', () => {
    expect(component.recordForm.value.title).toBe('Test Title');
    expect(component.recordForm.value.customerId).toBe('123');
  });

  it('should call updateRecord on submit in edit mode', () => {
    component.isEditMode = true;
    component.recordId = '1';
    component.recordForm.setValue({ title: 'Updated Title', customerId: '456' });
    component.onSubmit();
    expect(mockRecordService.updateRecord).toHaveBeenCalledWith('1', {
      title: 'Updated Title',
      coustmerID: '456',
      coustmerName: ''
    });
  });

  it('should call createRecord on submit in create mode', () => {
    component.isEditMode = false;
    component.recordId = null;
    component.recordForm.setValue({ title: 'New Record', customerId: '789' });
    component.onSubmit();
    expect(mockRecordService.createRecord).toHaveBeenCalledWith({
      title: 'New Record',
      coustmerID: '789',
      coustmerName: ''
    });
  });
});
