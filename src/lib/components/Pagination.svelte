<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher<{ previous: null; next: null }>();
    function onPrevious() {
        if (!disablePrevious) {
            dispatch("previous");
        }
    }
    function onNext() {
        if (!disableNext) {
            dispatch("next");
        }
    }
    export let total: number = 0;
    export let disablePrevious: boolean = false;
    export let disableNext: boolean = false;
</script>

<nav class="pagination is-centered">
    <button
        class="pagination-previous is-link {disablePrevious ? 'disabled' : ''}"
        on:click={onPrevious}
    >
        <i class="fa fa-arrow-left" />
        &nbsp; Anterior
    </button>
    <button
        class="pagination-next is-link {disableNext ? 'disabled' : ''}"
        on:click={onNext}
    >
        Próximo &nbsp;
        <i class="fa fa-arrow-right" />
    </button>
    <ul class="pagination-list">
        <li class="pull-right">Total: {total}</li>
    </ul>
</nav>

<style>
    button.is-link {
        cursor: pointer;
        color: #00d1b2;
        background-color: #fff;
    }
    button.is-link:hover {
        color: #000;
        border-color: #000;
    }
</style>
