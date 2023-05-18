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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    TestListComponent,
    TestReportListComponent,
    TestReportDetailComponent,
    TestInviteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
