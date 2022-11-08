<script lang="ts">
    import type IAlert from "$interfaces/IAlert";
    import { alerts } from "$lib/stores/alerts";

    function remove(item: IAlert) {
        alerts.removeItem(item);
    }
</script>

{#if $alerts.length}
    <ul class="flashes">
        {#each $alerts as alert (alert.message)}
            <li>
                <div class={"notification is-" + alert.type}>
                    <button class="delete" on:click={() => remove(alert)} />
                    {alert.message}
                </div>
            </li>
        {/each}
    </ul>
{/if}
