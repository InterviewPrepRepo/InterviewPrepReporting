import { Component, OnInit } from '@angular/core';
import { ImochaService } from '../services/imocha-service/imocha.service';
import VideoTest from '../models/videoTest';
import TestInvitation from '../models/testInvitation';
import { Router } from '@angular/router';


@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {
  tests: VideoTest[];
  allAttempts: TestInvitation[] = [];

  itemsPerPageOptions: number[] = [5, 10, 20];
  itemsPerPage: number = 5;
  currentPage: number = 1;

  constructor(public imocha: ImochaService, private router : Router) {
    this.tests = [];
  }

  ngOnInit() {
    this.getTests();
    this.getAllTestAttemtps();
  }

  getTests() : void {
    this.imocha.getTests(this.currentPage, this.itemsPerPage).subscribe(
      {
        next: (response) => {
          this.tests = response.tests;
        },
        error: (err) => {
          console.error('Error occured while fetching tests', err);
        }
    });
  }

  // Actually just getting all test attempts from the past 30 days
  getAllTestAttemtps() : void {
    const today = new Date();
    const aMonthAgo = new Date(today);
    aMonthAgo.setMonth(today.getMonth() - 1);

    this.imocha.getTestAttempts(aMonthAgo, today).subscribe({
      next: (res) => {
        this.allAttempts = res;
        this.imocha.organizedTestAttempts = this.imocha.processAttempts(res);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  navigateToTestDetail(testId : number) : void {
    if(this.imocha.organizedTestAttempts[testId] && this.imocha.organizedTestAttempts[testId].length !== 0) {
      this.router.navigate(['tests', testId], {state: {attempts: this.imocha.organizedTestAttempts[testId]}});
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getTests();
  }
}