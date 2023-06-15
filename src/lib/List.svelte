<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';

	const dispatch = createEventDispatcher();

	type Entry = {
		name: string;
	};

	export let list: Entry[] = [];

	function dispatchDelete(entry: Entry) {
		dispatch('delete', entry);
	}
</script>

<ul>
	{#each list as entry}
		{@const { name } = entry}
		<li>{name} <Button on:click={() => dispatchDelete(entry)}>Delete</Button></li>
	{/each}
</ul>
