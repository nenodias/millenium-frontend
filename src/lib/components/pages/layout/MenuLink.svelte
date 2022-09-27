<script lang="ts">
    export let title: string;
    export let icon: string;
    export let href: string;
    export let target: string = "";
</script>

<a {target} {href}>
    <i class="fa {icon}" />
    &nbsp;
    {title}
</a>
