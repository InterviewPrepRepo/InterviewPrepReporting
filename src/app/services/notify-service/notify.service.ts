import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import ChartData from 'src/app/models/chartData';
import TestAttemptQuestion from 'src/app/models/testAttemptQuestion';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor() { }

  //Notification for tab switch event
  private tabSwitch = new Subject<number>();
  public tabSwitchObservable$ = this.tabSwitch.asObservable();
  public notifyTabSwitch(tabIndex: number) {
    this.tabSwitch.next(tabIndex);
  }

  //Notification for manual score update event
  private manualGradeUpdate = new Subject<number>();
  public manualGradeUpdateObservable$ = this.manualGradeUpdate.asObservable();
  public notifymanualGradeUpdate(testInvitationId: number) {
    this.manualGradeUpdate.next(testInvitationId);
  }

  //notification when the total chart score has been updated
  private scoreUpdate = new Subject<{testInvitationId: number, scoreData: ChartData, testScore : number}>();
  public scoreUpdateObservable$ = this.scoreUpdate.asObservable();
  public notifyscoreUpdate(updatedScores : {testInvitationId: number, scoreData: ChartData, testScore : number}) {
    this.scoreUpdate.next(updatedScores);
  }
}
