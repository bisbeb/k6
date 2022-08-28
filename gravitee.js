import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const options = {
    headers: {
      'X-Gravitee-Api-Key': '4006ac0c-a567-44cf-94b2-17ee10ada475',
    },
  };
  http.get('http://localhost:8082/ccb/e2e', options);
  sleep(1);
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
