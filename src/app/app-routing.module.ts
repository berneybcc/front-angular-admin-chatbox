import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminQuestionComponent } from './admin-question/admin-question.component';
import { GraficasReportComponent } from './graficas-report/graficas-report.component';

const routes: Routes = [
  {path:'', component:AdminQuestionComponent},
  {path:'report', component:GraficasReportComponent},
  {path:'**', component:GraficasReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
