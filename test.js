import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('https://192.168.1.165:8443/auth');
  sleep(1);
}
