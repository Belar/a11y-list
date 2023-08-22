type FocusableElement = Element & {
	focus: () => void;
};

const FOCUSABLE_ELEMENTS_SELECTOR = 'button, input, textarea';

export function getFocusableElements(
	element: Element,
	{ selector = FOCUSABLE_ELEMENTS_SELECTOR }: { selector?: string } = {}
) {
	const focusable = element?.querySelectorAll<FocusableElement>(selector) || [];

	return Array.from(focusable).filter((element) => {
		const isDisabled = element.hasAttribute('disabled');
		const isHidden = element.getAttribute('aria-hidden');
		const tabindex = element.getAttribute('tabindex');

		return !isDisabled && !isHidden && !(tabindex && tabindex === '-1');
	});
}
