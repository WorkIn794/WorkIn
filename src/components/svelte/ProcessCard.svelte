<script lang="ts">
    import Pencil from "@components/svelte/icons/Pencil.svelte";
    import Trash from "@components/svelte/icons/Trash.svelte";
    import Chevron from "@components/svelte/icons/Chevron.svelte"
    import { twMerge } from "tailwind-merge";
    import type { ClassName, ProcessCard } from "../../types/global";

    type $$Props = ProcessCard & {
        className?: ClassName;
    };

    const { className } = $$props;
    const {
        id,
        defaultId,
        enterprise, // ~~ Enterprise Props ~~
        status,
        position,
        description,
        applicants,
        practitioner, // ~~ Practitioner Props ~~
        company,
        jobPosition,
        publishedDate,
        duration,
        salary,
        startDate,
        location
    } = $$props as ProcessCard;
    const restProps = $$restProps;

    // Card toggle state
    let isOpen = false;
    const toggle = (): void => {isOpen = !isOpen};
</script>

<div id={`card-${id}`} class={twMerge([
    "bg-WIgray-light", "min-h-20 p-4",
    "rounded-md",
    "grid grid-flow-row content-center",
     className])}
    {...restProps}>
    <div class={`flex justify-between items-center ${isOpen ? "mb-4": "mb-0"}`}>
        {#if enterprise}
            <span class="basis-2/6">{position}</span>
            <div class="basis-3/6 flex justify-around items-center">
                {#if status === "Closed"}
                    <span class="status after:bg-[#B70000]">Status</span>
                {:else if status === "In Progress"}
                    <span class="status after:bg-[#FDB022]">Status</span>
                {:else if status === "Accepted"}
                    <span class="status after:bg-[#23B000]">Status</span>
                {/if}
                <button class="view-results justify-self-end">View results</button>
            </div>
            <div class="basis-1/6 flex-grow-0 flex justify-between items-center">
                <button id="edit" class="size-6">
                    <Pencil className="size-5 m-auto"/>
                </button>
                <button id="delete" class="size-6">
                    <Trash/>
                </button>
                <button on:click={toggle} class="size-6">
                    <Chevron id={id} toggleState={isOpen}/>
                </button>
            </div>
        {:else if practitioner}
            <h1>Practitioner</h1>
        {/if}
    </div>
    <input type="checkbox" bind:checked={isOpen}/>
    <details open>
        <summary class="list-none"/>
        {#if enterprise}
            <div class="grid grid-cols-2">
                <div>
                {#if applicants}
                    {#each applicants as applicant}
                        <b class="w-1/2">{applicant.firstName} {applicant.lastName}</b>
                        <ul>
                            {#each applicant.skills as skill}
                                <li class="indent-4">{skill}</li>
                            {/each}
                        </ul>
                    {/each}
                {:else}
                    <p class="
                        w-full h-44
                        text-WIgray-contrast text-2xl font-bold
                        flex justify-center items-center">
                        No applicants yet
                    </p>
                {/if}
                </div>
                <p>{description}</p>
            </div>
        {:else if practitioner}
            <h1>Practitioner</h1>
        {/if}
    </details>
</div>

<style>
    button.view-results{
        position: relative;
    }
    button.view-results::before{
        content: "";
        width: 100%;
        height: 1.5px;
        position: absolute;
        bottom: 0;
        transform: scaleX(0);
        transition: transform 200ms ease-in-out;
        background-color: currentColor;
    }
    button.view-results:hover::before{
        transform: scaleX(1);
    }

    span.status{
        height: fit-content;
        position: relative;
        flex-basis: 4rem;
    }
    span.status::after{
        content: "";
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 100%;
        position: absolute;
        right: 0;
        top: 25%;
    }

    details{
        max-height: 0rem;
        overflow-y: scroll;
        transition: max-height 200ms ease-in-out;
    }

    input[type="checkbox"]{
        list-style: none;
        appearance: none;
    }
    input[type="checkbox"]:checked + details{
        max-height: 11rem;
    }
</style>