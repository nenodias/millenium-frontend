<script lang="ts">
    import { auth, token } from "$stores/auth";
    import { authService } from "$services/authService";

    let user: string = "";
    let password: string = "";

    async function doLogin() {
        if (user && password) {
            const basic = authService.getBasincAuthentication(user, password);
            const valid = await authService.refreshToken(basic);
            if (valid?.token) {
                auth.setAuthBasic(basic);
                token.set(valid?.token);
            }
        }
    }
</script>

<section class="hero is-fullheight is-dark is-bold">
    <div class="hero-body">
        <div class="container">
            <div class="columns is-vcentered">
                <div class="column is-4 is-offset-4">
                    <form method="post" on:submit|preventDefault={doLogin}>
                        <h1 class="title">Login</h1>
                        <div class="box">
                            <label for="usuario" class="label">Login</label>
                            <p class="control">
                                <input
                                    class="input upper"
                                    type="text"
                                    name="usuario"
                                    bind:value={user}
                                />
                            </p>
                            <label for="senha" class="label">Password</label>
                            <p class="control">
                                <input
                                    class="input upper"
                                    type="password"
                                    name="senha"
                                    bind:value={password}
                                />
                            </p>
                            <hr />
                            <p class="control">
                                <button class="button is-primary" type="submit"
                                    >Login</button
                                >
                                <button class="button is-default">Cancel</button
                                >
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
