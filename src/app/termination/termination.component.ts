import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-termination',
  templateUrl: './termination.component.html',
  styleUrls: ['./termination.component.css']
})
export class TerminationComponent implements OnInit {
  message: string = ""
  content: {};
  messages: string[] = [
    '<p>Thank you! Please have a nice day.</p>',
    '<p>We\'re sorry, but someone with this IP address has already attempted this game or another game similar to it. Please have a nice day!</p>'
  ];
  constructor(private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.route.queryParams
        .filter(params => params.condition)
        .subscribe(params => {
          this.message = this.messages[parseInt(params.condition)];
        }); 
  }
}

