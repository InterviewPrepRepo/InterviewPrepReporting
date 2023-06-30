import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { TestListComponent } from './test-list/test-list.component';
import { TestReportListComponent } from './test-report-list/test-report-list.component';
import { TestReportDetailComponent } from './test-report-detail/test-report-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './loading/loading.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionCarouselComponent } from './question-carousel/question-carousel.component';
import { InterviewInviteComponent } from './interview-invite/interview-invite.component';
import { AccordionModule, NavModule, ProgressModule, SharedModule, TabsModule } from '@coreui/angular';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { ReportAnswerSectionComponent } from './report-answer-section/report-answer-section.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { IconModule } from '@coreui/icons-angular';
import { HighlightModule } from 'ngx-highlightjs';
import { ReportResponseDetailComponent } from './report-response-detail/report-response-detail.component';
import { SectionChartComponent } from './section-chart/section-chart.component';
import { SectionBarChartComponent } from './section-bar-chart/section-bar-chart.component';
import { ReportsComponent } from './reports/reports.component';
import { AttemptProcessingComponent } from './attempt-processing/attempt-processing.component';
import { TestAttemptReportsComponent } from './test-attempt-reports/test-attempt-reports.component';
import { NoReportComponent } from './no-report/no-report.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    TestListComponent,
    TestReportListComponent,
    TestReportDetailComponent,
    LoadingComponent,
    QuestionDetailComponent,
    QuestionCarouselComponent,
    InterviewInviteComponent,
    QuizListComponent,
    ReportAnswerSectionComponent,
    ReportResponseDetailComponent,
    SectionChartComponent,
    SectionBarChartComponent,
    ReportsComponent,
    AttemptProcessingComponent,
    TestAttemptReportsComponent,
    NoReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ProgressModule,
    NgApexchartsModule,
    AccordionModule,
    SharedModule,
    IconModule,
    NavModule,
    TabsModule,
    HighlightModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
