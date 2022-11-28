<script lang="ts">
    import type CssType from "$lib/enums/CssType";

    export let id: string = "";
    export let type: CssType | "" = "";
    export let icon: string = "";
    export let disabled: boolean = false;
</script>

<button {id} type="button" class="button {type}" disabled={disabled} on:click>
    {#if icon !== ""}
        <i class="fa fa-{icon}" />
    {/if}
    <slot />
</button>

<style>
    button {
        cursor: pointer;
    }
</style>