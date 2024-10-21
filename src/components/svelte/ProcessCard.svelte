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

    // Status color
    enum statusColors {
        RED = "B70000",
        YELLOW = "FDB022",
        GREEN = "23B000"
    };
    const { RED, YELLOW, GREEN } = statusColors;

    let statusColor: statusColors;
    switch(status){
        case "Closed": statusColor = RED; break;
        case "In Progress": statusColor = YELLOW; break;
        case "Accepted": statusColor = GREEN; break;
        default: statusColor = RED;
    };

    // Card open/close state
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
            <span class={`status after:bg-[#${statusColor}]`}>Status</span>
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
    <div class={`details ${isOpen ? "toggle": ""}`}>
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
    </div>
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

    div.details{
        max-height: 11rem;
        height: 0px;
        overflow-y: hidden;
        animation-duration: 1000ms;
        animation-fill-mode: forwards;
        animation-timing-function: ease-in-out;
    }
    div.toggle{
        overflow-y: scroll;
        animation-name: toggle;
    }
    div.toggle-close{
        overflow-y: hidden;
        animation-name: toggle-close;
    }

    @keyframes toggle{
        from {height: 0px}
        to {height: 11rem}
    }
    @keyframes toggle-close{
        from {height: 11rem}
        to {height: 0px}
    }
</style>