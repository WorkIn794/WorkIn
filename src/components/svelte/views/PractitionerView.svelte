<script lang="ts">
    import type { Practitioner__View, ProcessCard } from "../../../types/global";
    
    type $$Props = Practitioner__View;

    const availableInternships = fetchInternships();
    async function fetchInternships(): Promise<ProcessCard[]>{
        
    }

    const { myResumes, internships, trainingPack } = $$props as Practitioner__View;
</script>

{#if myResumes}
    <h1>My Resumes</h1>
{:else if internships}
    <h1>Internships</h1>
{:else if trainingPack}
    <h1>Training Pack</h1>
{/if}