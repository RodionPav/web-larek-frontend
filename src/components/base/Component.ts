export abstract class Component<T> {
	constructor(protected readonly container: HTMLElement) {}

	render(data?: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}

	protected setText(element: HTMLElement, value: unknown) {
		if (element) {
			element.textContent = String(value);
		}
	}

	disableBasketButton(element: HTMLButtonElement) {
		if (element) {
			element.disabled = true;
		}
	}
	unDisableBasketButton(element: HTMLButtonElement) {
		if (element) {
			element.disabled = false;
		}
	}
}
