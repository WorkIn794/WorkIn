<script lang="ts">
    import { onMount } from "svelte";
    import ProcessCard from "../ProcessCard.svelte";
    import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
    import { getDbCredential } from "@/utils/projectMode";
    import type { EnterpriseView, ProcessCard__Enterprise } from "@/types/global";

    type $$Props = EnterpriseView;
    const { processes, dashboard } = $$props as EnterpriseView;

    const dashboardContainerId: Readonly<string> = "dashboard";
    onMount(async () => {
        // Initialize mongodb charts embed sdk
        const baseUrl: Readonly<string> = "https://charts.mongodb.com/charts-workin-pyoffex";
        const dashboardId: Readonly<string> = import.meta.env.MONGODB_DASHBOARD_ID;
        const { createDashboard } = new ChartsEmbedSDK({ baseUrl: baseUrl });

        const dashboard = createDashboard({
            dashboardId: dashboardId,
            widthMode: "scale",
            heightMode: "scale",
            preFilter: {},
            filter: {}
        });

        await dashboard
        .render(document.getElementById(dashboardContainerId) as HTMLDivElement);
    });

    const processesData = fetchProcess();
    async function fetchProcess(): Promise<ProcessCard__Enterprise[]>{
        const headers = new Headers();
        headers.append("role", "enterprise");
        headers.append("session", sessionStorage.getItem("session") as string);

        return await (await fetch(`${getDbCredential()}/process`, {
            headers: headers,
        })).json();
    }
</script>

{#if processes}
    {#await processesData}
        <div class="size-full flex justify-center items-center">
            <slot name="loader"/>
        </div>
    {:then data}
        {#each data as process, index}
            {@const { _id, position, status, description, applicants } = process}
            <ProcessCard
                enterprise
                _id={_id}
                id={index}
                position={position}
                status={status}
                applicants={applicants}
                description={description}
                className="my-2"
            />
        {/each}
    {:catch error}
        <h1>Error: {error.message}</h1>
    {/await}
{:else if dashboard}
    <h1>Work In Progress</h1>
    <div id={dashboardContainerId} class="size-full"></div>
{/if}