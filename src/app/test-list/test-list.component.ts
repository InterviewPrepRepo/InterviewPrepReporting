import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


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

  constructor(private http: HttpClient) {
    this.tests = [];
  }

  ngOnInit() {
    this.getTests();
  }

  getTests() {
    const url = 'https://apiv3.imocha.io/v3/tests';
    const headers = new HttpHeaders()
      .set('x-api-key', 'FEsStirljsXozgHSxDUFZpdLFDspdv');
    

    this.http.get<any[]>(url, { headers }).subscribe(
      (response) => {
        this.tests = response;
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
