import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.scss'],
})
export class EmailConfirmComponent {
  public verified: boolean | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.hasOwnProperty('verified')) {
        this.verified = params['verified'] === 'true';
        console.log(this.verified);
      } else {
        this.verified = true;
      }
    });
  }
}
