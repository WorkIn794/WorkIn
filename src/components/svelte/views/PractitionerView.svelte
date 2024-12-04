<script lang="ts">
    import ProcessCard from "../ProcessCard.svelte";
    import { getDbCredential } from "@/utils/projectMode";
    import type { Practitioner__View, ProcessCard__Practitioner } from "../../../types/global";
    
    type $$Props = Practitioner__View;

    const processes = fetchProcesses();
    async function fetchProcesses(): Promise<ProcessCard__Practitioner[]> {
        const headers = new Headers();
        headers.append("role", "practitioner");

        const processes: ProcessCard__Practitioner[] = await (
            await fetch(`${getDbCredential()}/process`, { headers: headers })).json();
        return processes;
    }

    const { myResumes, internships, trainingPack } = $$props as Practitioner__View;
</script>

{#if myResumes}
    <h1>My Resumes</h1>
{:else if internships}
    {#await processes}
        <h1>Loading...</h1>
    {:then internships}
        {#each internships as internship, index}
        {@const {
            company, jobPosition, status, publishedDate,
            description, skills, requirements, benefits,
            duration, salary, startDate, location } = internship}
            <ProcessCard
                practitioner
                id={index}
                company={company}
                jobPosition={jobPosition}
                status={status}
                publishedDate={publishedDate}
                duration={duration}
                salary={salary}
                startDate={startDate}
                location={location}
                description={description}
                skills={skills}
                requirements={requirements}
                benefits={benefits}
                className="mb-4"
            />
        {/each}
    {:catch}
        <h1>Error</h1>
    {/await}
{:else if trainingPack}
    <h1>Training Pack</h1>
{/if}