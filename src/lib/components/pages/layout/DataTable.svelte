<script lang="ts">
    import AppButton from "$components/AppButton.svelte";
    import Pagination from "$components/Pagination.svelte";
    import type IFalha from "$interfaces/models/IFalha";
    import CssType from "$lib/enums/CssType";
    import SortDirection from "$lib/enums/SortDirection";

    export let title: string = "";
    let limit : number = 10;
    let offset: number = 0;
    let sortOrder: number = 0;
    let sortDirection: SortDirection = SortDirection.ASC;

    let dados: IFalha[] = [
        { id: 1, descricao: "TROCA DA HOMOCINETICA"} as IFalha,
        { id: 2, descricao: "MOLA FROUXA"} as IFalha,
    ];
</script>

<div class="hero ">
    <div class="hero-body">
        <h1 class="title">Consulta de {title}</h1>
        <form>
            <slot name="filters" />

            <div class="field is-grouped">
                <p class="control">
                    <AppButton type={CssType.SEARCH} icon="search">&nbsp; Pesquisar</AppButton>
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
                {#each dados as dado, index}
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
