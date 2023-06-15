<script lang="ts">
	import List from '$lib/List.svelte';

	let list = [
		{
			name: 'Keys'
		},
		{
			name: 'Bag'
		},
		{
			name: 'Phone'
		}
	];

	function deleteEntry(entry: (typeof list)[number]) {
		const listUpdated = list.filter((existingEntry) => existingEntry !== entry);
		list = listUpdated;
	}
</script>

<List {list} on:delete={({ detail }) => deleteEntry(detail)} />
