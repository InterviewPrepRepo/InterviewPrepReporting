import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TestListComponent } from './test-list/test-list.component';
import { TestReportListComponent } from './test-report-list/test-report-list.component';
import { AuthService } from './services/auth-service/auth.service';
import { TestAttemptReportsComponent } from './test-attempt-reports/test-attempt-reports.component';

const canActivateMain: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    if (inject(AuthService).isAuthenticated()) {
      return true;
    } else {
      router.navigate(['login']);
      return false;
    }
  };

const routes: Routes = [
  {
    path: 'tests',
    component: TestListComponent,
    canActivate: [canActivateMain]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'tests/:testId',
    component: TestReportListComponent,
    canActivate: [canActivateMain]
  },
  {
    path: 'tests/:testId/report/:email',
    component: TestAttemptReportsComponent,
    canActivate: [canActivateMain]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/tests',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
