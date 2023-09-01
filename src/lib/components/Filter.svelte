<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Order } from '$lib/interfaces/Order';
	import type { Sort } from '$lib/interfaces/Sort';
    import { page } from '$app/stores';

	const allowedSortValues: Sort[] = ['price', 'timestamp'];
	const allowedOrderValues: Order[] = ['asc', 'desc'];

	$: sort = $page.url.searchParams.get('sort')
		? ($page.url.searchParams.get('sort') as Sort)
		: 'price';
	$: order = $page.url.searchParams.get('order')
		? ($page.url.searchParams.get('order') as Order)
		: 'asc';

	function setSort(
		e: Event & {
			currentTarget: EventTarget & HTMLSelectElement;
		}
	) {
		const target = e.target as HTMLSelectElement;
		const s: Sort = target.value as Sort;
		goto(`?sort=${s}&order=${order}`);
	}

	function setOrder(
		e: Event & {
			currentTarget: EventTarget & HTMLSelectElement;
		}
	) {
		const target = e.target as HTMLSelectElement;
		const o: Order = target.value as Order;
		goto(`?sort=${sort}&order=${o}`);
	}
</script>

<div id="filter">
	<div>
		Sortuj według:
		<select value={sort} on:change={(e) => setSort(e)}>
			{#each allowedSortValues as s}
				<option value={s}>{s === 'price' ? 'cena' : 'data dodania'}</option>
			{/each}
		</select>
		Uporządkuj:
		<select value={order} on:change={(e) => setOrder(e)}>
			{#each allowedOrderValues as o}
				<option value={o}>{o === 'asc' ? 'rosnąco' : 'malejąco'}</option>
			{/each}
		</select>
	</div>
</div>

<style>
	#filter {
		justify-content: center;
		display: flex;
		margin-bottom: 1em;
	}

	#filter div:not(:last-child) {
		margin-right: 1em;
	}

	@media only screen and (max-width: 576px) {
		#filter {
			display: block;
			text-align: center;
		}

		#filter div:not(:last-child) {
			margin-right: 0;
		}
	}
</style>
