import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 200 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
        { duration: '2m', target: 200 }, // stay at 100 users for 10 minutes
        { duration: '1m', target: 0 }, // ramp-down to 0 users
      ],
      thresholds: {
        'http_req_duration': ['p(99)<1000'], // 99% of requests must complete below 1s
       
      },
  };

export default function (){
    http.get('http://localhost:5002/searchtwo?city=kandy');
    sleep(1)
}