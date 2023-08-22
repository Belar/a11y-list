export const KEY_TAB = 'Tab';

export function isBackKeyboardNavigation({ shiftKey: isShiftActive, key }: KeyboardEvent) {
	const isTab = key === KEY_TAB;
	return isTab && isShiftActive;
}

export function isForwardKeyboardNavigation({ shiftKey: isShiftActive, key }: KeyboardEvent) {
	const isTab = key === KEY_TAB;
	return isTab && !isShiftActive;
}

export function isKeyPress(event: KeyboardEvent | MouseEvent): event is KeyboardEvent {
	return !event.detail;
}
