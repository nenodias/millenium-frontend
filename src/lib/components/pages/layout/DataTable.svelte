<script lang="ts">
    import AppButton from "$components/AppButton.svelte";
    import Pagination from "$components/Pagination.svelte";
    import type IFilterPageable from "$interfaces/IFilterPageable";
    import type IPageable from "$interfaces/IPageable";
    import type IPageableContent from "$interfaces/IPageableContent";
    import type ISortRequest from "$interfaces/ISortRequest";
    import type IFalha from "$interfaces/models/IFalha";
    import CssType from "$lib/enums/CssType";
    import SortDirection from "$lib/enums/SortDirection";

    export let title: string = "";
    export let filters: IFilterPageable;
    export let doSearch = (): Promise<IPageableContent<any>> =>
        Promise.reject();
    let retorno = {
        content: [],
        number: 0,
        size: 0,
        totalElemenets: 0,
        totalPages: 0,
        pageable:{
            pageNumber:0,
            pageSize: 0,
            sort:{
                sortColumn:"",
                sortDirection: SortDirection.ASC
            } as ISortRequest
        } as IPageable
    } as IPageableContent<any>;

    const pesquisar = () => {
        console.log('Pesquisando');
        doSearch().then((ret) => {
            console.log(filters);
            retorno = ret;
        });
    };
    pesquisar();
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
        <table
            id="falha"
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
        <div class="div-paginacao">
            <Pagination total={0} />
        </div>
    </div>
</div>
