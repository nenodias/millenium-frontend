<script>
    import MenuItem from "./MenuItem.svelte";
    import MenuLink from "./MenuLink.svelte";
</script>

<aside class="menu">
    <p>Início</p>
    <ul class="menu-list">
        <li>
            <MenuLink title="Home" href="/" icon="fa-home" />
        </li>
    </ul>
    <p class="menu-label">Preferências</p>
    <ul class="menu-list">
        <li>
            <MenuItem title="Lembretes" icon="fa-sticky-note-o">
                <li><a href="/lembrete/form/">Cadastro</a></li>
                <li><a href="/lembrete/">Consulta</a></li>
            </MenuItem>
        </li>
        <li>
            <MenuItem title="Falhas" icon="fa-exclamation-circle">
                <li><a href="/falha/form/">Cadastro</a></li>
                <li><a href="/falha/">Consulta</a></li>
            </MenuItem>
        </li>
        <li>
            <MenuItem title="Peças" icon="fa-cog">
                <li><a href="/peca/form/">Cadastro</a></li>
                <li><a href="/peca/">Consulta</a></li>
            </MenuItem>
        </li>
        <li>
            <MenuItem title="Serviços" icon="fa-wrench">
                <li><a href="/servico/form/">Cadastro</a></li>
                <li><a href="/servico/">Consulta</a></li>
            </MenuItem>
        </li>
        <li>
            <MenuLink
                title="Backup"
                target="_blank"
                href="/backup"
                icon="fa-database"
            />
        </li>
    </ul>
    <p class="menu-label">Gerais</p>
    <ul class="menu-list">
        <li>
            <MenuItem title="Marcas" icon="fa-shopping-cart">
                <li>
                    <MenuItem title="Montadoras">
                        <li>
                            <a href="/montadora/form/">Cadastro</a>
                            <a href="/montadora/">Consulta</a>
                        </li>
                    </MenuItem>
                </li>
                <li>
                    <MenuItem title="Modelos">
                        <li>
                            <a href="/modelo/form/">Cadastro</a>
                            <a href="/modelo/">Consulta</a>
                        </li>
                    </MenuItem>
                </li>
            </MenuItem>
        </li>
        <li>
            <MenuItem title="Técnicos" icon="fa-user-md">
                <li><a href="/tecnico/form/">Cadastro</a></li>
                <li><a href="/tecnico/">Consulta</a></li>
            </MenuItem>
        </li>
        <li>
            <MenuItem title="Clientes" icon="fa-users">
                <li><a href="/cliente/form/">Cadastro</a></li>
                <li><a href="/cliente/">Consulta</a></li>
            </MenuItem>
        </li>
        <li>
            <MenuItem title="Veículos" icon="fa-car">
                <li><a href="/veiculo/form/">Cadastro</a></li>
                <li><a href="/veiculo/">Consulta</a></li>
            </MenuItem>
        </li>
        <li>
            <MenuItem title="Históricos" icon="fa-suitcase">
                <li><a href="/historico/form/">Cadastro</a></li>
                <li><a href="/historico/">Consulta</a></li>
            </MenuItem>
        </li>
    </ul>
    <p class="menu-label">Logoff</p>
    <ul class="menu-list">
        <li>
            <MenuLink title="Sair" href="/logout" icon="fa-lock" />
        </li>
    </ul>
</aside>
