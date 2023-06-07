import { Component } from '@angular/core';

@Component({
  selector: 'app-interview-invite',
  templateUrl: './interview-invite.component.html',
  styleUrls: ['./interview-invite.component.css']
})
export class InterviewInviteComponent {

  onInviteLinkClick() : void {
    console.log('link clicked')
  }
}
