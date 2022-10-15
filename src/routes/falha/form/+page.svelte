<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { token } from "$stores/auth";
    import FormHeader from "$components/pages/layout/FormHeader.svelte";
    import FormPage from "$components/pages/layout/FormPage.svelte";
    import { makeClient } from "$services/crudService";
    import type { IFalha } from "$interfaces/IFalha";

    const client = makeClient<IFalha>("falha");

    let model: IFalha = {
        descricao: "",
    };

    page.subscribe(async (data) => {
        if (data.url.searchParams.has("id")) {
            const text = data.url.searchParams.get("id");
            if (text) {
                model.id = parseInt(text);
                let resp = await client.findById(model.id, token.getToken());
                model.descricao = resp.descricao;
            }
        }
    });

    function onCancel() {
        goto("/falha");
    }

    async function onSubmit() {
        console.log("Evento de submit");
        let resp = await client.create(model, token.getToken());
    }
</script>

<FormPage on:cancel={onCancel} on:submit={onSubmit}>
    <FormHeader slot="header">Cadastro de falhas</FormHeader>
    <div slot="fields" class="field">
        <label class="label" for="descricao">* Nome da falha:</label>
        <p class="control has-icon has-icon-right">
            <input
                id="descricao"
                name="descricao"
                type="text"
                bind:value={model.descricao}
                placeholder="Informe a falha"
                class="input upper"
            />
            <span class="icon is-small">
                <i class="fa fa-check" />
            </span>
        </p>
        <p class="help" />
    </div>
</FormPage>
