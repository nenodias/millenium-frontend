<script lang="ts">
    import Footer from "$components/pages/layout/Footer.svelte";
    import Menu from "$components/pages/layout/Menu.svelte";
    import TopBar from "$components/pages/layout/TopBar.svelte";
    import "bulma/css/bulma.css";
    import "font-awesome/css/font-awesome.min.css";
    import "../app.css";

    import { auth } from "$stores/auth";
    import Login from "$components/pages/layout/Login.svelte";
</script>

<svelte:head>
    <title>Millenium</title>
</svelte:head>

{#if $auth}
    <TopBar />
    <div id="wrapper" class="container is-fluid">
        <div class="columns">
            <div class="column is-2">
                <Menu />
            </div>
            <div class="column is-10">
                <slot />
            </div>
        </div>
    </div>
    <Footer />
{:else}
    <Login />
{/if}
