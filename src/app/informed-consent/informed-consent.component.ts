import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informed-consent',
  templateUrl: './informed-consent.component.html',
  styleUrls: ['./informed-consent.component.css']
})
export class InformedConsentComponent implements OnInit {
  content: {[key: string]: any};
  consent: number = 0;

  constructor(private http: Http,
              private router: Router) { 
    this.http.get('/assets/informed_consent.json')
        .subscribe(res => this.content = res.json());
  }

  ngOnInit() {
  }

  checkConsent(): void {
    if (this.consent === 1) {
      this.router.navigateByUrl('/instructions', { replaceUrl: true });
    } else {
      this.router.navigate(['/end'], { replaceUrl: true, queryParams: { condition: '0' } });
    }
  }
}

