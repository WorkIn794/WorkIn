<script lang="ts">
    import { twMerge } from "tailwind-merge";
    import Chevron from "@components/svelte/icons/Chevron.svelte"
    import type { ClassName, UserExtendedCard } from "../../types/global";

    type $$Props =
    UserExtendedCard & {
        id: number;
        className?: ClassName;
    };
    const restProps = $$restProps;
    const { id, position, status, details, className } = $$props;

    // Card toggle state
    let isOpen = false;
    function toggelCard(): void{
        isOpen = !isOpen;
    }
</script>

<div id={`card-${id}`} class={twMerge([
    "bg-WIgray-light", "min-h-20 p-4", "rounded-md", "grid grid-flow-row",
    "transition-all duration-200 ease-in-out delay-100", className])} {...restProps}> 
    <div class="flex justify-between items-center">
        {#if $$props.enterprise}
            <span class="basis-1/3">{position}</span>
            {#if status === "Closed"}
                <span class="status after:bg-[#B70000]">Status</span>
            {:else if status === "In Progress"}
                <span class="status after:bg-[#FDB022]">Status</span>
            {:else if status === "Accepted"}
                <span class="status after:bg-[#23B000]">Status</span>
            {/if}
            <button class="view-info">View details</button>
            <button class="view-info">View results</button>
            <button class="icon">ola</button>
            <button on:click={toggelCard} class="icon">
                <Chevron id={id} toggleState={isOpen}/>
            </button>
        {:else if $$props.practitioner}
            <h1>Practitioner</h1>
        {/if}
    </div>
    <input type="checkbox" bind:checked={isOpen}/>
    <details open>
        <summary/>
        {#if $$props.enterprise}
            {#each details as applicant}
                <b class="block">{applicant.firstName} {applicant.lastName}</b>
                <ul>
                    {#each applicant.skills as skill}
                        <li>{skill}</li>
                    {/each}
                </ul>
            {/each}
        {:else if $$props.practitioner}
            <h1>Practitioner</h1>
        {/if}
    </details>
</div>

<style>
    button.view-info{
        position: relative;
    }
    button.view-info::before{
        content: "";
        width: 100%;
        height: 1.5px;
        position: absolute;
        bottom: 0;
        transform: scaleX(0);
        transition: transform 200ms ease-in-out;
        background-color: currentColor;
    }
    button.view-info:hover::before{
        transform: scaleX(1);
    }

    button.icon{
        width: 1.5rem;
        height: 1.5rem;
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

    input[type="checkbox"]{
        height: 0px;
        appearance: none;
    }
    summary{
        list-style: none;
    }
    details{
        max-height: 0rem;
        overflow-y: scroll;
        transition: max-height 200ms ease-in-out;
    }
    input[type="checkbox"]:checked + details{
        max-height: 11rem;
    }
</style>