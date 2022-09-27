<script lang="ts">
    import { auth } from "$stores/auth";
    import { goto } from "$app/navigation";
    console.log("Logout");
    auth.clear();
    goto("/");
</script>