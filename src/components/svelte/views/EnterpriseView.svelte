<script lang="ts">
    import ProcessCard from "../ProcessCard.svelte";
    import type { EnterpriseView } from "../../../types/global";

    type $$Props = EnterpriseView;

    const processes = fetchProcess();
    async function fetchProcess(){
        const response = await (await fetch("http://localhost:3001/processes")).json();

        return response;
    }
</script>

{#await processes}
    <div class="size-full flex justify-center items-center">
        <slot name="loader"/>
    </div>
{:then data}
    {#if $$props.process}
        {#each data as process, index}
            <ProcessCard id={index} enterprise position={process.position} status={process.status} details={process.applicants} className="my-2"/>
        {/each}
    {:else if $$props.dashboard}
        <h1>Dashboard</h1>
    {/if}
{:catch error}
    <h1>Error: {error.message}</h1>
{/await}