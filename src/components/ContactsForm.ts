import { Form } from './common/Form';
import {TUserContactsInfo } from '../types';
import { IEvents } from './base/events';

export class ContactsForm extends Form<TUserContactsInfo> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}
}
