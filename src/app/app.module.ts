import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { TestListComponent } from './test-list/test-list.component';
import { TestReportListComponent } from './test-report-list/test-report-list.component';
import { TestReportDetailComponent } from './test-report-detail/test-report-detail.component';
import { TestInviteComponent } from './test-invite/test-invite.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './loading/loading.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionCarouselComponent } from './question-carousel/question-carousel.component';
import { InterviewInviteComponent } from './interview-invite/interview-invite.component';
import { ProgressModule } from '@coreui/angular';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    TestListComponent,
    TestReportListComponent,
    TestReportDetailComponent,
    TestInviteComponent,
    NotFoundComponent,
    LoadingComponent,
    QuestionDetailComponent,
    QuestionCarouselComponent,
    InterviewInviteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ProgressModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
