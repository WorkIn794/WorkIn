<script>
    import ProcessCard from "../ProcessCard.svelte";
    import DashboardCard from "../DashboardCard.svelte";
    import { getDbCredential } from "@/utils/projectMode";
    // import type { EnterpriseView } from "../../../types/global";
    // import type { Status, EnterpriseCard } from "../../../types/global";

    // type $$Props = EnterpriseView;

    // Fetch processes
    const processes = fetchProcess();
    async function fetchProcess(){
        const processes = await (await fetch(`${getDbCredential()}/getProcess`, {
            method: "POST",
            body: sessionStorage.getItem("user")
        })).json();
        console.log(processes);

        return await fetch(`${getDbCredential()}/getProcess`, {
            method: "POST",
            body: sessionStorage.getItem("user")
        })  
            .then(async res => await res.json())
                .then(res => {
                    return res.map(process => {
                        return {
                            position: process.jobPosition,
                            status: process.status,
                            details: process.description,
                            applicants: [
                                {
                                    firstName: "John",
                                    lastName: "Doe",
                                    skills: ["HTML", "CSS", "JavaScript"]
                                },
                                {
                                    firstName: "John",
                                    lastName: "Doe",
                                    skills: ["HTML", "CSS", "JavaScript"]
                                },
                                {
                                    firstName: "John",
                                    lastName: "Doe",
                                    skills: ["HTML", "CSS", "JavaScript"]
                                }
                            ]
                        }
                    });
                }
            );
    
    }

    // Fetch dashboard data
    // interface DashboardData{
    //     applicantsNumber: number;
    //     pendingProcesses: number;
    //     averageDays: number;
    //     topApplicants: [string, string, string];
    //     topSkills: [string, string, string];
    //     timeForEachProcess: {id: number, name: string, time: number}[];
    // };
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