<script lang="ts">
    import type IFalha from "$interfaces/models/IFalha";
    import type IFalhaFilter from "$interfaces/models/IFalhaFilter";
    import type ISortRequest from "$interfaces/ISortRequest";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { token } from "$stores/auth";
    import DataTable from "$components/DataTable.svelte";
    import TagButton from "$components/TagButton.svelte";
    import CssType from "$lib/enums/CssType";
    import { makeClient } from "$services/crudService";
    import { makeDataTableService } from "$services/dataTableService";
    import { makeNavigationService } from "$services/navigationService";

    import SortDirection from "$lib/enums/SortDirection";
    import AppTh from "$components/AppTh.svelte";
    import type IDataTable from "$interfaces/components/IDataTable";

    const navigationService = makeNavigationService("falha", goto);
    const client = makeClient<IFalha>("falha");
    const dataTable = {} as IDataTable;

    let params = {
        descricao: "",
        page: 0,
        size: 20,
        sort: {
            sortColumn: "id",
            sortDirection: SortDirection.DESC,
        } as ISortRequest,
    } as IFalhaFilter;

    const dataTableService = makeDataTableService(
        params,
        token,
        client,
        dataTable
    );

    page.subscribe(async (data) => {
        if (data.url.searchParams.has("descricao")) {
            const text = data.url.searchParams.get("descricao");
            if (text) {
                params.descricao = text;
            }
        }
    });
</script>

<DataTable
    {dataTable}
    title="Falhas"
    filters={params}
    doSearch={dataTableService.search}
>
    <svelte:fragment slot="filters">
        <div class="field">
            <label class="label" for="descricao">Nome da falha:</label>
            <p class="control has-icon has-icon-right">
                <input
                    type="text"
                    bind:value={params.descricao}
                    placeholder="Informe a falha"
                    class="input upper"
                />
                <span class="icon is-small">
                    <i class="fa fa-check" />
                </span>
            </p>
            <p class="help" />
        </div>
    </svelte:fragment>
    <svelte:fragment slot="theader">
        <AppTh column="id" {dataTableService}>Id</AppTh>
        <AppTh column="descricao" {dataTableService}>Descrição</AppTh>
        <th class="options">Ações</th>
    </svelte:fragment>
    <svelte:fragment slot="tbody" let:row>
        <td>{row.id}</td>
        <td>{row.descricao}</td>
        <td class="options">
            <TagButton
                type={CssType.WARNING}
                icon="edit"
                on:click={(e) => navigationService.goEditar(row.id)}>&nbsp; Editar</TagButton
            >
            <TagButton type={CssType.DANGER} icon="trash" on:click
                >&nbsp; Excluir</TagButton
            >
        </td>
    </svelte:fragment>
</DataTable>

<style>
    th {
        cursor: pointer;
    }
</style>
