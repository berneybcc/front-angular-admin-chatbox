import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminQuestionComponent } from './admin-question/admin-question.component';
import { ViewQuestionComponent } from './view-question/view-question.component';
import { HttpClientModule } from '@angular/common/http';
import { EditElementComponent } from './edit-element/edit-element.component';
//Graficos
// import { ChartsModule } from 'ng2-charts';
import { GraficasReportComponent } from './graficas-report/graficas-report.component';
import { FormularioComponent } from './formulario/formulario.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AdminQuestionComponent,
    ViewQuestionComponent,
    EditElementComponent,
    GraficasReportComponent,
    FormularioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
