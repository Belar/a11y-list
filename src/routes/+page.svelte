<script lang="ts">
	import List, { type Entry } from '$lib/List.svelte';

	let list: Entry[] = [
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
		const listUpdated = list.map((existingEntry) =>
			existingEntry === entry ? { ...existingEntry, isDeleted: true } : existingEntry
		);
		list = listUpdated;
	}

	function clearDeleted() {
		const listUpdated = list.filter(({ isDeleted }) => !isDeleted);
		list = listUpdated;
	}
</script>

<List {list} on:delete={({ detail }) => deleteEntry(detail)} on:deleteClear={clearDeleted} />
