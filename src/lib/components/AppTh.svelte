<script lang="ts">
    import type IDataTableService from "$interfaces/services/IDataTableService";
    import SortDirection from "$lib/enums/SortDirection";

    const doOnClick = () => {
        dataTableService.reOrder(column);
    };

    export let column: string;
    export let dataTableService: IDataTableService<any>;
    const sort = dataTableService.params.sort;

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
