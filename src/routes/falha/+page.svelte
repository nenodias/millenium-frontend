<script lang="ts">
    import type IFalha from "$interfaces/models/IFalha";
    import type IFalhaFilter from "$interfaces/models/IFalhaFilter";
    import type ISortRequest from "$interfaces/ISortRequest";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { token } from "$stores/auth";
    import DataTable from "$components/pages/layout/DataTable.svelte";
    import TagButton from "$components/TagButton.svelte";
    import CssType from "$lib/enums/CssType";
    import { makeClient } from "$services/crudService";
    
    import SortDirection from "$lib/enums/SortDirection";
    import type IPageableContent from "$interfaces/IPageableContent";

    const client = makeClient<IFalha>("falha");
    const params = {
        descricao: '',
        page: 0,
        size: 20,
        sort: {
            sortColumn: "id",
            sortDirection: SortDirection.ASC
        } as ISortRequest
    } as IFalhaFilter;
    const search = ():Promise<IPageableContent<IFalha>> => {
        console.log('Search');
        return client.findAll(token.getToken(), params);
    }
    
    page.subscribe(async (data) => {
        console.log(data);
    });
    

    const editar = (id: any) => {
        goto(`/falha/form?id=${id}`);
    }
</script>

<DataTable title="Falhas" filters={params} doSearch={search}>
    <svelte:fragment slot="filters">
        <div class="field">
            <label class="label" for="descricao">Nome da falha:</label>
            <p class="control has-icon has-icon-right">
                <input type="text" bind:value={params.descricao} placeholder="Informe a falha" class="input upper">
                <span class="icon is-small">
                    <i class="fa fa-check"></i>
                </span>
            </p>
            <p class="help"></p>
        </div>
    </svelte:fragment>
    <svelte:fragment slot="theader">
        <th class="sortable" data-sort="id">Id</th>
        <th class="sortable" data-sort="descricao">Descrição</th>
        <th class="options">Ações</th>
    </svelte:fragment>
    <svelte:fragment slot="tbody" let:row>
        <td>{row.id}</td>
        <td>{row.descricao}</td>
        <td class="options">
            <TagButton type={CssType.WARNING} icon="edit" on:click={(e) => editar(row.id)}>&nbsp; Editar</TagButton>
            <TagButton type={CssType.DANGER} icon="trash" on:click>&nbsp; Excluir</TagButton>
        </td>
    </svelte:fragment>
</DataTable>