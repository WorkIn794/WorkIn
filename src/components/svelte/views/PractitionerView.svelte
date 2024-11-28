<script lang="ts">
    import ProcessCard from "../ProcessCard.svelte";
    import { getDbCredential } from "@/utils/projectMode";
    import type { Practitioner__View, ProcessCard__Practitioner } from "../../../types/global";
    
    type $$Props = Practitioner__View;

    const getInternships = fetchInternships();
    async function fetchInternships(): Promise<ProcessCard__Practitioner[]> {
        const processes: ProcessCard__Practitioner[] = await (
            await fetch(`${getDbCredential()}/internships`)).json();
        return processes;
    }

    const { myResumes, internships, trainingPack } = $$props as Practitioner__View;
</script>

{#if myResumes}
    <h1>My Resumes</h1>
{:else if internships}
    {#await getInternships}
        <h1>Loading...</h1>
    {:then internships}
        {#each internships as internship, index}
        {@const { company, jobPosition, status, publishedDate, description, duration, salary, startDate, location} = internship}
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
                className="mb-4"
            />
        {/each}
        <h1>Internships</h1>
    {:catch}
        <h1>Error</h1>
    {/await}
{:else if trainingPack}
    <h1>Training Pack</h1>
{/if}