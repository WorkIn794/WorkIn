<script lang="ts">
    import { getDbCredential } from "@/utils/projectMode";
    import type { Practitioner__View, ProcessCard } from "../../../types/global";
    
    type $$Props = Practitioner__View;

    const availableInternships = fetchInternships();
    async function fetchInternships(){
        const processes = await (await fetch(`${getDbCredential()}/getInternships`)).json();
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