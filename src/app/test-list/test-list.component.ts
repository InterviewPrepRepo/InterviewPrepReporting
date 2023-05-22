import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {
  tests: any[];
  itemsPerPageOptions: number[] = [5, 10, 20];
  itemsPerPage: number = 5;
  currentPage: number = 1;
  baseURL : string;

  constructor(private http: HttpClient) {
    this.tests = [];
    this.baseURL = '';
  }

  ngOnInit() {
    this.getTests();
  }

  getTests() {
    const url = environment.APIBaseURL
    
    this.http.get<any>(url + `imocha/tests?pageNo=${this.currentPage}&pageSize=${this.itemsPerPage}`).subscribe(
      (response) => {
        this.tests = response.tests;
      },
      (error) => {
        console.log('Error occurred while fetching tests:', error);
      }
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getTests();
  }
}
