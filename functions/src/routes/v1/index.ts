import type { Express } from 'express';

import { differenceInYears } from 'date-fns';
import { BrunoDetails } from './interfaces';

export function initApiV1(v1: Express) {
  console.error('v1 WHERE TH EUFCK ARE U', v1);
  if (!v1) {
    return;
  }

  v1.get('/test', (req, res) => {
    res.send('hello world!');
  });

  v1.get('/bruno', (req, res) => {
    const dateOfBirth = new Date('1998-04-30T08:00:00.000Z');

    const details: BrunoDetails = {
      age: differenceInYears(new Date(), dateOfBirth),
      name: 'Brúnó Kertész',
      dateOfBirth,
      currentLocation: '📍 Eastbourne, United Kingdom',
      currentJobRole: 'Full Stack Typescript Developer',
      contactDetails: {
        phone: '07942688136',
        email: 'kerteszbruno98@gmail.com',
      },
      socials: {
        github: 'https://github.com/daxur-studios',
        linkedIn: 'https://www.linkedin.com/in/bruno-kertesz-98x',
      },
      previousWorks: [
        {
          description: 'Node.js - REST API',
          url: 'https://brunos-nodejs-experience.web.app',
        },
        {
          description: 'Three.js - GSAP',
          url: 'https://brunos-3d-experience.web.app/draco-lesson',
        },
        {
          description: `Angularfire PWA for Daniel's online portfolio`,
          url: 'https://daniel-james-hearn.web.app',
        },
      ],
    };

    res.send(details);
  });
}
