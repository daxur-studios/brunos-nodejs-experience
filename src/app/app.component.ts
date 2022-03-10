import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'brunos-nodejs-experience';

  rateLimiterExample =
    'http://localhost:5001/brunos-nodejs-experience/europe-west2/testRateLimiter';

  apiExample = environment.useEmulators
    ? 'http://localhost:5001/brunos-nodejs-experience/europe-west2/api/v1/bruno'
    : 'https://europe-west2-brunos-nodejs-experience.cloudfunctions.net/api/v1/bruno';
}
