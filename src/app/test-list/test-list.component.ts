import { Component, OnInit } from '@angular/core';
import { ImochaService } from '../services/imocha-service/imocha.service';
import VideoTest from '../models/videoTest';
import TestInvitation from '../models/testInvitation';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';


@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {
  tests: VideoTest[];
  allAttempts: TestInvitation[] = [];

  loading : boolean = true;
  itemsPerPageOptions: number[] = [5, 10, 20];
  itemsPerPage: number = 5;
  currentPage: number = 1;

  constructor(public imocha: ImochaService, private router : Router) {
    this.tests = [];
  }

  ngOnInit() {
    if(this.imocha.tests.length === 0) {
      const today = new Date();
      const aMonthAgo = new Date(today);
      aMonthAgo.setDate(today.getDate() - 30);

      const getTestReq = this.imocha.getTests(this.currentPage, this.itemsPerPage)
      const getAllAttemptsReq = this.imocha.getTestAttempts(aMonthAgo, today)

      forkJoin([getTestReq, getAllAttemptsReq]).subscribe({
        next: ([testsRes, testAttemptsRes]) => {
          this.tests = testsRes.tests;
          this.allAttempts = testAttemptsRes;
          
          this.imocha.tests = this.tests;
          this.imocha.organizedTestAttempts = this.imocha.processAttempts(testAttemptsRes);
          
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    }
    else {
      this.tests = this.imocha.tests;
      this.loading = false;
    }
  }

  navigateToTestDetail(testId : number) : void {
    this.router.navigate(['tests', testId]);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.imocha.getTests(this.currentPage, this.itemsPerPage).subscribe({
      next: (res: {tests: VideoTest[]}) => {
        this.tests = res.tests;
      },
      error: (err: Error) => {
        console.error('Error occured while fetching tests', err);
      }
  });
  }
}