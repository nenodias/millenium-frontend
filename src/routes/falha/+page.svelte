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

    import SortDirection, { toggleDirection } from "$lib/enums/SortDirection";
    import type IPageableContent from "$interfaces/IPageableContent";
    import AppTh from "$components/AppTh.svelte";

    const client = makeClient<IFalha>("falha");
    const dataTable = { pesquisar: null };

    let params = {
        descricao: "",
        page: 0,
        size: 20,
        sort: {
            sortColumn: "id",
            sortDirection: SortDirection.DESC,
        } as ISortRequest,
    } as IFalhaFilter;

    const search = (): Promise<IPageableContent<IFalha>> => {
        console.log(`Realizando consulta`, params);
        return client.findAll(token.getToken(), params);
    };

    page.subscribe(async (data) => {
        if (data.url.searchParams.has("descricao")) {
            const text = data.url.searchParams.get("descricao");
            if (text) {
                params.descricao = text;
            }
        }
    });

    const reOrder = (evt: CustomEvent<string>) => {
        const column = evt.detail;
        console.log("ReOrder", evt, params);
        if (params.sort.sortColumn === column) {
            params.sort = {
                sortColumn: column,
                sortDirection: toggleDirection(params.sort.sortDirection),
            };
        } else {
            params.sort = {
                sortColumn: column,
                sortDirection: params.sort.sortDirection,
            };
        }
        if (dataTable.pesquisar !== null) {
            dataTable.pesquisar();
        }
    };

    const editar = (id: any) => {
        goto(`/falha/form?id=${id}`);
    };
</script>

<DataTable {dataTable} title="Falhas" filters={params} doSearch={search}>
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
        <AppTh column="id" on:reOrder={reOrder} sort={params.sort}>Id</AppTh>
        <AppTh column="descricao" on:reOrder={reOrder} sort={params.sort}
            >Descrição</AppTh
        >
        <th class="options">Ações</th>
    </svelte:fragment>
    <svelte:fragment slot="tbody" let:row>
        <td>{row.id}</td>
        <td>{row.descricao}</td>
        <td class="options">
            <TagButton
                type={CssType.WARNING}
                icon="edit"
                on:click={(e) => editar(row.id)}>&nbsp; Editar</TagButton
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
