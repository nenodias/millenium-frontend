<script lang="ts">
    import DataTable from "$components/pages/layout/DataTable.svelte";
    import TagButton from "$components/TagButton.svelte";
    import CssType from "$lib/enums/CssType";
</script>

<DataTable title="Falhas">
    <svelte:fragment slot="theader">
        <th class="sortable" data-sort="id">Id</th>
        <th class="sortable" data-sort="descricao">Descrição</th>
        <th class="options">Ações</th>
    </svelte:fragment>
    <svelte:fragment slot="tbody" let:row>
        <td>{row.id}</td>
        <td>{row.descricao}</td>
        <td class="options">
            <TagButton type={CssType.WARNING} icon="edit">&nbsp; Editar</TagButton>
            <TagButton type={CssType.DANGER} icon="trash">&nbsp; Excluir</TagButton>
        </td>
    </svelte:fragment>
</DataTable>