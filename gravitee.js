import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('http://localhost:8082/ccb/e2e');
  sleep(1);
}