<script lang="ts">
    export let title: string;
    export let icon: string = "";
    let hidden = true;

    function onClick(){
        hidden = !hidden;
    }
</script>

<span on:click={onClick}>
    <i class="{icon ? "fa "+icon:""}" />
    &nbsp;
    {title}
</span>
<ul class={hidden ? "is-hidden":""}>
    <slot />
</ul>

<style>
    span {
        border-radius: 2px;
        color: #4a4a4a;
        display: block;
        padding: 0.5em 0.75em;
        cursor: pointer;
    }

    span:hover {
        background-color: whitesmoke;
        color: #00d1b2;
    }
</style>
