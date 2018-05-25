import { Injectable }              from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()

export class AppService {

  constructor(private http: Http) {}

  handleResponse(res: Response): any {
    let body = res.json() || {};
    return body;
  }

  handleError(error: Response | any) {
    console.log('error', error);
    return error;
  }

  httpGet(url: string): Observable<any> {
    return this.http
                   .get(url, {})
                   .map(this.handleResponse.bind(this))
                   .catch(this.handleError);
  }

  getPriceList() {
    return this.httpGet('./ssl.json');
  }
}

