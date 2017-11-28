import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { NavButtonComponent } from '../nav-button/nav-button.component';
import { CurParticipantService } from '../participant/cur-participant.service';
import { ParticipantService } from '../participant/participant.service';

@Component({
  selector: 'tg-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [ ParticipantService ]
})

export class QuizComponent implements OnInit {
  answers: { value: string }[] = [
    { value: '0' },
    { value: '0' },
    { value: '0' }
  ]
  answersSubmitted: boolean;
  feedback: {}
  numCorrect: number;
  questions: { question: string, a: string, b: string, ans: string }[];

  constructor(private router: Router,
              private participantService: ParticipantService,
              private curParticipantService: CurParticipantService,
              private http: Http) {
    this.http.get('/assets/attention_check.json')
            .subscribe(res => {
              this.questions = res.json();
            });
    this.http.get('/assets/attention_check_feedback.json')
            .subscribe(res => {
              this.feedback = res.json();
            });
  }

  ngOnInit() {
  }

  checkAnswer(): void {
    this.answersSubmitted = true;
    this.numCorrect = this.answers.map((answer, idx) => {
      return +(answer.value === this.questions[idx].ans);
    })
    .reduce((total, current) => {return total + current}, 0);
  }

  isValid(): boolean {
    let numAnswered = 0;
    this.answers.forEach(answer => {
      if (parseInt(answer.value) > 0) 
        numAnswered++;
    });
    return numAnswered === 3;
  }
}

