<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';
	import { tick } from 'svelte/internal';

	const dispatch = createEventDispatcher();

	type Entry = {
		name: string;
	};

	export let list: Entry[] = [];
	let emptyListRef: HTMLElement;

	$: hasRecords = !!list.length;

	async function dispatchDelete(entry: Entry) {
		dispatch('delete', entry);

		await tick();
		if (!hasRecords) {
			emptyListRef?.focus();
		}
	}
</script>

{#if hasRecords}
	<ul>
		{#each list as entry}
			{@const { name } = entry}
			<li>{name} <Button on:click={() => dispatchDelete(entry)}>Delete</Button></li>
		{/each}
	</ul>
{:else}
	<p tabindex="-1" bind:this={emptyListRef}>List is empty</p>
{/if}
