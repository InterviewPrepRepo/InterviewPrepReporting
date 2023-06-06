import { Component, OnInit } from '@angular/core';
import { ImochaService } from '../services/imocha-service/imocha.service';
import VideoTest from '../models/videoTest';
import TestInvitation from '../models/testInvitation';
import { Router } from '@angular/router';
import {forkJoin } from 'rxjs';


@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {
  tests: VideoTest[];
  allAttempts: TestInvitation[] = [];

  loading : boolean = true;

  constructor(public imocha: ImochaService, private router : Router) {
    this.tests = [];
  }

  ngOnInit() {
    //First, check the imocha service to see if there is cached data before making calls to backend
    if(this.imocha.tests.length === 0) {

      //if there is nothing stored in service, we'll get all tests labeled Interview Prep Video Tests and all the attempts from the past 30 days 
      const getTestReq = this.imocha.getTests()
      const getAllAttemptsReq = this.imocha.getTestAttempts()

      forkJoin([getTestReq, getAllAttemptsReq]).subscribe({
        next: ([testsRes, testAttemptsRes]) => {
          this.tests = testsRes.tests;
          this.allAttempts = testAttemptsRes;
          
          //cache these in service for faster performance
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
      //if things already exists, then no need to load anything. Just use iMocha's cache
      this.loading = false;
    }
  }

  navigateToTestDetail(testId : number) : void {
    this.router.navigate(['tests', testId]);
  }
}