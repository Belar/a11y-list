<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';
	import { tick } from 'svelte/internal';
	import { getFocusableElements } from './element';
	import { isBackKeyboardNavigation, isForwardKeyboardNavigation, isKeyPress } from './key';

	const dispatch = createEventDispatcher();

	type Entry = {
		name: string;
	};

	export let list: Entry[] = [];
	let itemRefs: HTMLElement[] = [];
	let emptyListRef: HTMLElement;
	let softDeleteHolderElement: HTMLElement | null;

	$: hasRecords = !!list.length;

	function handleInitialDelete(event: MouseEvent | KeyboardEvent, entry: Entry) {
		if (!isKeyPress(event)) {
			dispatchDelete(entry);
			return;
		}

		if (event.target instanceof Element) {
			softDeleteHolderElement = event.target?.parentElement;

			const isTheLastElement = list.length === 1;
			if (isTheLastElement) {
				dispatchDelete(entry);
				return;
			}

			softDeleteHolderElement?.focus();
		}
	}

	function handleContextFocus(entry: Entry, { nextItem }: { nextItem?: HTMLElement } = {}) {
		softDeleteHolderElement?.addEventListener('keydown', (event) => {
			const isForwardNav = isForwardKeyboardNavigation(event);
			const isBackNav = isBackKeyboardNavigation(event);

			if (isForwardNav || isBackNav) {
				const nextFocusableElement = nextItem && getFocusableElements(nextItem)?.[0];
				if (isForwardNav && nextFocusableElement) {
					nextFocusableElement.focus();
				}

				dispatchDelete(entry);
			}
		});
	}

	async function dispatchDelete(entry: Entry) {
		softDeleteHolderElement = null;

		dispatch('delete', entry);

		await tick();
		if (!hasRecords) {
			emptyListRef?.focus();
			return;
		}
	}
</script>

{#if hasRecords}
	<ul>
		{#each list as entry, i}
			{@const { name } = entry}
			<li
				tabindex="-1"
				bind:this={itemRefs[i]}
				on:focus={() => handleContextFocus(entry, { nextItem: itemRefs[i++] })}
			>
				{#if itemRefs[i] === softDeleteHolderElement}
					Deleted
				{:else}
					{name}
					<Button on:click={(event) => handleInitialDelete(event, entry)}>Delete</Button>
				{/if}
			</li>
		{/each}
	</ul>
{:else}
	<p tabindex="-1" bind:this={emptyListRef}>List is empty</p>
{/if}
