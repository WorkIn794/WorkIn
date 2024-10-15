<script lang="ts">
    import ProcessCard from "../ProcessCard.svelte";
    import type { EnterpriseView } from "../../../types/global";

    type $$Props = EnterpriseView;

    const namePromise: Promise<string> = getName();
    async function getName(): Promise<string>{
        const response = await (await fetch("https://api.jikan.moe/v4/random/characters")).json();
        const name: string = response.data.name;

        return name;
    }
</script>

{#await namePromise}
    <div class="size-full flex justify-center items-center">
        <slot name="loader"/>
    </div>
{:then name}
    {#if $$props.process}
        <h2>Hola {name}!</h2>
        <ProcessCard enterprise position="Software Engineer" status="In Progress"/>
    {:else if $$props.dashboard}
        <h1>Dashboard</h1>
    {/if}
{:catch error}
    <h1>Error: {error.message}</h1>
{/await}