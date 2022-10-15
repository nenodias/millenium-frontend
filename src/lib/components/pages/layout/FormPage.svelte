<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher<{ submit: null; cancel: null }>();
    function onSubmit() {
        dispatch("submit");
    }
    function onCancel() {
        dispatch("cancel");
    }
</script>

<div class="hero ">
    <div class="hero-body">
        <slot name="header" />

        <form
            method="post"
            novalidate={true}
            on:submit|preventDefault={onSubmit}
        >
            <slot name="fields" />

            <div class="field is-grouped">
                <p class="control">
                    <button class="button is-success">
                        <i class="fa fa-save" />
                        &nbsp; Salvar
                    </button>
                </p>
                <p class="control">
                    <button
                        class="button is-danger"
                        type="button"
                        on:click={onCancel}
                    >
                        <i class="fa fa-window-close" />
                        &nbsp; Cancelar
                    </button>
                </p>
            </div>
        </form>
    </div>
</div>
