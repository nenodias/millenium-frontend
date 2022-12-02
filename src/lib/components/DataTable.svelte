<script lang="ts">
    import AppButton from "$components/AppButton.svelte";
    import Pagination from "$components/Pagination.svelte";
    import type IFilterPageable from "$interfaces/IFilterPageable";
    import type IPageable from "$interfaces/IPageable";
    import type IPageableContent from "$interfaces/IPageableContent";
    import type ISortRequest from "$interfaces/ISortRequest";
    import CssType from "$lib/enums/CssType";
    import SortDirection from "$lib/enums/SortDirection";
    import type IDataTable from "../interfaces/components/IDataTable";

    export let dataTable: IDataTable = {};
    export let title: string = "";
    export let filters: IFilterPageable;
    export let doSearch = (): Promise<IPageableContent<any>> =>
        Promise.reject();
    let loading: boolean = false;

    let retorno = {
        content: [],
        number: 0,
        size: 0,
        totalElements: 0,
        totalPages: 0,
        pageable: {
            pageNumber: 0,
            pageSize: 0,
            sort: {
                sortColumn: "",
                sortDirection: SortDirection.ASC,
            } as ISortRequest,
        } as IPageable,
    } as IPageableContent<any>;

    const pesquisar = () => {
        loading = true;
        doSearch().then((ret) => {
            loading = false;
            retorno = ret;
            dataTable.retorno = retorno;
        });
    };
    const onNext = () => {
        if (filters.page < retorno.totalPages - 1) {
            filters.page += 1;
        }
        pesquisar();
    };
    const onPrevious = () => {
        if (filters.page > 0) {
            filters.page -= 1;
        }
        pesquisar();
    };
    pesquisar();

    dataTable.pesquisar = pesquisar;
    dataTable.onNext = onNext;
    dataTable.onPrevious = onPrevious;
    dataTable.title = title;
    dataTable.filters = filters;
    dataTable.retorno = retorno;
</script>

<div class="hero ">
    <div class="hero-body">
        <h1 class="title">Consulta de {title}</h1>
        <form on:submit|preventDefault={pesquisar}>
            <slot name="filters" />

            <div class="field is-grouped">
                <p class="control">
                    <AppButton
                        type={CssType.SEARCH}
                        icon="search"
                        on:click={pesquisar}>&nbsp; Pesquisar</AppButton
                    >
                </p>
                <slot name="button-header" />
            </div>
        </form>

        <hr />
        {#if loading}
            <span class="loader-mixin" />
        {:else}
            <table
                class="table is-bordered is-striped is-narrow responsive-stacked-table with-mobile-labels"
            >
                <thead>
                    <tr>
                        <slot name="theader" />
                    </tr>
                </thead>
                <tbody class="dados-tabela">
                    {#each retorno.content as dado, index}
                        <tr>
                            <slot name="tbody" row={dado} />
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
        <div class="div-paginacao">
            <Pagination
                disablePrevious={filters.page == 0}
                disableNext={retorno.totalPages - 1 == filters.page}
                total={retorno.totalElements}
                page={retorno.number + 1}
                totalPages={retorno.totalPages}
                on:next={onNext}
                on:previous={onPrevious}
            />
        </div>
    </div>
</div>
