<script>
    import ProcessCard from "../ProcessCard.svelte";
    import DashboardCard from "../DashboardCard.svelte";
    import { getDbCredential } from "@/utils/projectMode";

    const processes = fetchProcess();
    async function fetchProcess(){
        return await (await fetch(`${getDbCredential()}/getEnterpriseProcesses`, {
            method: "POST",
            body: sessionStorage.getItem("user")
        })).json();
    }

    const dashboardData = fetchDashboard();
    async function fetchDashboard(){
        return new Promise((resolve) => {
            setTimeout(() => resolve({
                    applicantsNumber: 253,
                    pendingProcesses: 8,
                    averageDays: 5.54,
                    topApplicants: [
                        "John Doe",
                        "Jane Doe",
                        "Bob Doe"
                    ],
                    topSkills: [
                        "HTML",
                        "CSS",
                        "JavaScript"
                    ],
                    timeForEachProcess: [
                        {id: 1, name: "Software Development", time: 10},
                        {id: 2, name: "QA", time: 5},
                        {id: 3, name: "Design", time: 8},
                        {id: 4, name: "Marketing", time: 3},
                        {id: 5, name: "Sales", time: 2}
                    ]
                }
            ), 1000);
        });
    }
</script>

{#if $$props.process}
    {#await processes}
        <div class="size-full flex justify-center items-center">
            <slot name="loader"/>
        </div>
    {:then data}
        {#each data as process, index}
            <ProcessCard id={index} enterprise position={process.position} status={process.status} details={process.applicants} description={process.details} className="my-2"/>
        {/each}
    {:catch error}
        <h1>Error: {error.message}</h1>
    {/await}
{:else if $$props.dashboard}
    {#await dashboardData}
        <div class="size-full flex justify-center items-center">
            <slot name="loader"/>
        </div>
    {:then data}
        <div class="grid grid-cols-6 gap-x-4 gap-y-4">
            <DashboardCard type="Applicants number"     data={data.applicantsNumber}    className="col-span-2"/>
            <DashboardCard type="Pending processes"     data={data.pendingProcesses}    className="col-span-2"/>
            <DashboardCard type="Average days"          data={data.averageDays}         className="col-span-2"/>
            <DashboardCard type="Top Applicants"        data={data.topApplicants}       className="col-span-3"/>
            <DashboardCard type="Top Skills"            data={data.topSkills}           className="col-span-3"/>
            <DashboardCard type="Time for each process" data={data.timeForEachProcess}  className="col-span-full"/>
        </div>
    {:catch error}
        <h1>Error: {error.message}</h1>
    {/await}
{/if}