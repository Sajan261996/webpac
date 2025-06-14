import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordPageComponent } from '../../app/pages/record-page/record-page.component';
import { RecordDetailsComponent } from '../../app/pages/record-details/record-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'records', pathMatch: 'full' },
  { path: 'records', component: RecordPageComponent },
  { path: 'records/new', component: RecordDetailsComponent },
  { path: 'records/:id', component: RecordDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
