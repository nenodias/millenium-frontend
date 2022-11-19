<script lang="ts">
    import type CssType from "$lib/enums/CssType";

    export let id: string = "";
    export let type: CssType | "" = "";
    export let icon: string = "";
    export let disabled: boolean = false;
</script>

<span {id} class="tag {type}" {disabled} on:click>
    {#if icon !== ""}
        <span class="fa fa-{icon}" />
    {/if}
    <slot />
</span>

<style>
    span.tag {
        cursor: pointer;
    }
</style>