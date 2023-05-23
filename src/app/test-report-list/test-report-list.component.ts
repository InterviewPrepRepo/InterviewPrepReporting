import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-report-list',
  templateUrl: './test-report-list.component.html',
  styleUrls: ['./test-report-list.component.css']
})
export class TestReportListComponent implements OnInit{
  test: any;
  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.http.get(environment.APIBaseURL + 'imocha/tests/1244116').subscribe((res) => {
      this.test = res;
    })
  }
}
