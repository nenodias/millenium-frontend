<script lang="ts">
    import type IModal from "$interfaces/components/IModal";
    import CssType from "$lib/enums/CssType";
    import AppButton from "./AppButton.svelte";

    export let instance: IModal;
    export let title: string = instance.title ?? "";
    let active: boolean = instance.active ?? false;

    instance.show = () => {
        active = true;
    };

    function onClose() {
        if (active) {
            active = !active;
            if (instance.onClose !== undefined) {
                instance.onClose();
            }
        }
    }

    function onSuccess() {
        if (active) {
            active = !active;
            if (instance.onSuccess !== undefined) {
                instance.onSuccess();
            }
        }
    }
</script>

<div class="bootbox">
    <div class="modal {active ? 'is-active' : ''}">
        <div class="modal-background" />
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{title}</p>
                <button type="button" class="delete" on:click={onClose} />
            </header>
            <footer class="modal-card-foot">
                <AppButton
                    type={CssType.SUCCESS}
                    icon="check"
                    on:click={onSuccess}>Sim &nbsp;</AppButton
                >
                <AppButton icon="times" on:click={onClose}
                    >Cancelar &nbsp;</AppButton
                >
            </footer>
        </div>
    </div>
</div>
