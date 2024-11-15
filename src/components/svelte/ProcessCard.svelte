<script lang="ts">
    import Chevron from "@components/svelte/icons/Chevron.svelte"
    import Pencil from "@components/svelte/icons/Pencil.svelte";
    import { twMerge } from "tailwind-merge";
    import type { ClassName, UserExtendedCard } from "../../types/global";

    type $$Props =
    UserExtendedCard & {
        id: number;
        description: string;
        className?: ClassName;
    };
    const restProps = $$restProps;
    const { id, position, status, details, className, description } = $$props;

    // Card toggle state
    let isOpen = false;
    const toggle = (): void => {isOpen = !isOpen};
</script>

<div id={`card-${id}`} class={twMerge([
    "bg-WIgray-light", "min-h-20 p-4",
    "rounded-md",
    "grid grid-flow-row",
    "transition-all duration-200 ease-in-out delay-100", className])}
    {...restProps}> 
    <div class="mb-4 flex justify-between items-center">
        {#if $$props.enterprise}
            <span class="basis-1/3">{position}</span>
            {#if status === "Closed"}
                <span class="status after:bg-[#B70000]">Status</span>
            {:else if status === "In Progress"}
                <span class="status after:bg-[#FDB022]">Status</span>
            {:else if status === "Accepted"}
                <span class="status after:bg-[#23B000]">Status</span>
            {/if}
            <button class="view-info">View results</button>
            <button class="icon"><Pencil className="size-5 m-auto"/></button>
            <button on:click={toggle} class="icon"><Chevron id={id} toggleState={isOpen}/></button>
        {:else if $$props.practitioner}
            <h1>Practitioner</h1>
        {/if}
    </div>
    <input type="checkbox" bind:checked={isOpen}/>
    <details open>
        <summary/>
        {#if $$props.enterprise}
            <p class="w-1/2 text-right absolute left-1/2">{description}</p>
            {#each details as applicant}
                <b class="w-1/2">{applicant.firstName} {applicant.lastName}</b>
                <ul class=w-1/2>
                    {#each applicant.skills as skill}
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;{skill}</li>
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
        position: relative;
        max-height: 0rem;
        overflow-y: scroll;
        transition: max-height 200ms ease-in-out;
    }
    input[type="checkbox"]:checked + details{
        max-height: 11rem;
    }
</style>