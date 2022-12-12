<script lang="ts">
    import type IFalha from "$interfaces/models/IFalha";
    import type IFalhaFilter from "$interfaces/models/IFalhaFilter";
    import type ISortRequest from "$interfaces/ISortRequest";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { token } from "$stores/auth";
    import { alerts } from "$stores/alerts";
    import DataTable from "$components/DataTable.svelte";
    import TagButton from "$components/TagButton.svelte";
    import CssType from "$lib/enums/CssType";
    import { makeClient } from "$services/crudService";
    import { makeDataTableService } from "$services/dataTableService";
    import { makeNavigationService } from "$services/navigationService";

    import SortDirection from "$lib/enums/SortDirection";
    import AppTh from "$components/AppTh.svelte";
    import type IDataTable from "$interfaces/components/IDataTable";
    import AppModal from "$components/AppModal.svelte";
    import type IModal from "$interfaces/components/IModal";

    const navigationService = makeNavigationService("falha", goto);
    const client = makeClient<IFalha>("falha");
    const modalInstance = {
        active: false,
    } as IModal;
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

    function onDelete(id: number) {
        modalInstance.value = id;
        if (modalInstance.show) {
            modalInstance.show();
        }
        modalInstance.onSuccess = async () => {
            try {
                let resp = await client.deleteById(id, token.getToken());
                alerts.addItem({
                    type: "success",
                    message: `Registro com id: ${id} removido com successo`,
                });
                if (dataTable.pesquisar) {
                    dataTable.pesquisar();
                }
            } catch (err: any) {
                alerts.addItem({ type: "danger", message: err.message });
            }
        };
    }
</script>

<AppModal title="Deseja excluir o registro?" instance={modalInstance} />
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
        <td><span class="label">Id:</span>{row.id}</td>
        <td><span class="label">Descrição:</span>{row.descricao}</td>
        <td class="options">
            <TagButton
                type={CssType.WARNING}
                icon="edit"
                on:click={(e) => navigationService.goEditar(row.id)}
                >&nbsp; Editar</TagButton
            >
            <TagButton
                type={CssType.DANGER}
                icon="trash"
                on:click={(e) => onDelete(row.id)}>&nbsp; Excluir</TagButton
            >
        </td>
    </svelte:fragment>
</DataTable>

<style>
    th {
        cursor: pointer;
    }
</style>
