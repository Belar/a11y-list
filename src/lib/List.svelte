<script lang="ts" context="module">
	export type Entry = {
		name: string;
		isDeleted?: boolean;
	};
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';
	import { tick } from 'svelte/internal';
	import { getFocusableElements } from './element';
	import { isBackKeyboardNavigation, isForwardKeyboardNavigation, isKeyPress } from './key';

	const dispatch = createEventDispatcher<{
		delete: Entry;
		deleteClear: null;
	}>();

	const ITEM_DELETED_PLACEHOLDER = '<Deleted>';

	export let list: Entry[] = [];
	let itemRefs: HTMLElement[] = [];
	let emptyListRef: HTMLElement;
	let softDeleteHolderElement: HTMLElement | null;

	$: hasRecords = !!list.length;

	async function handleInitialDelete(event: MouseEvent | KeyboardEvent, entry: Entry) {
		if (!isKeyPress(event)) {
			dispatchDelete(entry);
			await tick();
			dispatchDeleteCleanUp();
			return;
		}

		if (event.target instanceof Element) {
			softDeleteHolderElement = event.target?.parentElement;
			dispatchDelete(entry);

			const isTheLastElement = list.length === 1;
			if (isTheLastElement) {
				dispatchDeleteCleanUp();
				return;
			}

			softDeleteHolderElement?.focus();
		}
	}

	function handleContextFocus({ nextItem }: { nextItem?: HTMLElement } = {}) {
		softDeleteHolderElement?.addEventListener('keydown', (event) => {
			const isForwardNav = isForwardKeyboardNavigation(event);
			const isBackNav = isBackKeyboardNavigation(event);

			if (isForwardNav || isBackNav) {
				const nextFocusableElement = nextItem && getFocusableElements(nextItem)?.[0];
				if (isForwardNav && nextFocusableElement) {
					nextFocusableElement.focus();
				}

				dispatchDeleteCleanUp();
			}
		});
	}

	async function dispatchDelete(entry: Entry) {
		dispatch('delete', entry);
	}

	async function dispatchDeleteCleanUp() {
		softDeleteHolderElement = null;

		dispatch('deleteClear');

		await tick();
		if (!hasRecords) {
			emptyListRef?.focus();
		}
	}
</script>

{#if hasRecords}
	<ul>
		{#each list as entry, i}
			{@const { name, isDeleted } = entry}
			<li
				tabindex="-1"
				bind:this={itemRefs[i]}
				on:focus={() => handleContextFocus({ nextItem: itemRefs[i++] })}
			>
				{#if isDeleted}
					{ITEM_DELETED_PLACEHOLDER}
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
