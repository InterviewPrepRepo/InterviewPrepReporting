import { Component } from '@angular/core';
import { ImochaService } from '../services/imocha-service/imocha.service';
import { AuthService } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-interview-invite',
  templateUrl: './interview-invite.component.html',
  styleUrls: ['./interview-invite.component.css']
})
export class InterviewInviteComponent {

  constructor(private imocha: ImochaService, private auth: AuthService) { }

  onInviteLinkClick() : void {
    this.imocha.inviteCandidate(1238185, 'Minseon Song', 'minseon.song@revature.com').subscribe({
      next: ({testInvitationId, testUrl}) => {
        this.auth.setCurrentUser({
          name: 'Minseon Song',
          email: 'minseon.song@revature.com'
        })
        window.open(testUrl, '_blank');
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
