import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER } from '../provider/config';
import { SEND_MESSAGE_TO_USERS_LIST_URI } from '../provider/config';
import { Storage } from '@ionic/storage';
import { SEND_MESSAGE_TO_EVENT_VOLUNTEERS_URI } from '../provider/config';

@Injectable()
export class MessageServices {
	public key:String;

	constructor(private http:Http, public storage:Storage) {
		storage.get('key')
			.then(key => this.key = key)
			.catch(err => console.log("couldn't get key for authentication"));
	}

    sendMessageToEvent(event_id,body) {
        return this.http.post(SERVER + SEND_MESSAGE_TO_EVENT_VOLUNTEERS_URI + event_id, body, this.getOptions())
                        .map(res => res.json())
                        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

	sendMessageToUsersList(body) {
		return this.http.post(SERVER + SEND_MESSAGE_TO_USERS_LIST_URI, body, this.getOptions())
				.map(res=> res.json())
				.catch( (err:any) => Observable.throw(err || 'Server error'));
	}

	getOptions() {
		let headers = new Headers();
		headers.append('Authorization', 'Token ' + this.key);
		headers.append('Content-Type', 'application/json;q=0.9');
		headers.append('Accept', 'application/json;q=0.9');
		return new RequestOptions({headers: headers});
	}
}