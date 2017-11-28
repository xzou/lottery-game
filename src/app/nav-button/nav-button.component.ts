import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tg-nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.css']
})
export class NavButtonComponent implements OnInit {
  @Input() url: string;
  @Input() label: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goTo(): void {
    this.router.navigateByUrl('/' + this.url, { replaceUrl: true });
  }
}
