<script lang="ts">
    import type ISortRequest from "$interfaces/ISortRequest";
    import SortDirection from "$lib/enums/SortDirection";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher<{ reOrder: string }>();
    const doOnClick = () => {
        dispatch("reOrder", column);
    };

    export let column: string;
    export let sort: ISortRequest;

    $: direction =
        sort.sortDirection === SortDirection.ASC
            ? "fa-sort-asc"
            : "fa-sort-desc";
    $: order = sort.sortColumn === column;
</script>

<th class="sortable" on:click={doOnClick}>
    <slot />
    {#if order}
        <i class="is-pulled-right fa {direction}" />
    {/if}
</th>

<style>
    th {
        cursor: pointer;
    }
</style>
