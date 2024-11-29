<script lang="ts">
    import { slide } from "svelte/transition";
    import Pencil from "@components/svelte/icons/Pencil.svelte";
    import Trash from "@components/svelte/icons/Trash.svelte";
    import Chevron from "@components/svelte/icons/Chevron.svelte"
    import { twMerge } from "tailwind-merge";
    import type { ClassName, ProcessCard } from "../../types/global";

    type $$Props = ProcessCard & {
        className?: ClassName;
    };
    
    interface State {
        card: boolean;
        details: boolean;
        newState: number;
    };

    const { className } = $$props;
    const {
        id,
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
        location,
        skills,
        requirements,
        benefits
    } = $$props as ProcessCard;
    const restProps = $$restProps;

    // Handle state
    let isOpen = false;
    let viewDetails = false;
    let currentState = 0;

    const transitionChart: ReadonlyArray<[State, State]> = [
        //              Click on card              |        Click on View Details
        [{card: true, details: false, newState: 1}, {card: true, details: true, newState: 2}],  // S1
        [{card: false, details: false, newState: 0}, {card: true, details: true, newState: 2}], // S2
        [{card: false, details: false, newState: 0}, {card: true, details: false, newState: 1}] // S3
    ];

    function handleState({ target }: MouseEvent): void {
        if(!target) return;

        const { card, details, newState }: State =
            transitionChart[currentState][target.tagName === "BUTTON" ? 1 : 0];
        currentState = newState;
        isOpen = card;
        viewDetails = details;

        return;
    }

    // // Card toggle state for enterprise view
    const toggle = (): void => { isOpen = !isOpen };

    // !TODO: Move this computing to the backend
    // Compute time elapsed since post creation
    let elapsedTime: number;
    let formattedTime: string;
    if(practitioner){
        const now = new Date();
        const postDate = new Date(publishedDate);
        const time = (now.getTime() - postDate.getTime()) / 3600000; // Miliseconds to hours

        enum Time {
            DAY = 24,
            WEEK = 168,
            MONTH = 730,
            YEAR = 8760
        }; const { DAY, WEEK, MONTH, YEAR } = Time;

        if(time >= DAY){
            elapsedTime = Math.floor(time / DAY);
            formattedTime = `Published ${elapsedTime} days ago`;
        }else if(time >= WEEK){
            elapsedTime = Math.floor(time / WEEK);
            formattedTime = `Published ${elapsedTime} weeks ago`;
        }else if(time >= MONTH){
            elapsedTime = Math.floor(time / MONTH);
            formattedTime = `Published ${elapsedTime} months ago`;
        }else if(time >= YEAR){
            elapsedTime = Math.floor(time / YEAR);
            formattedTime = `Published ${elapsedTime} years ago`;
        }else{
            elapsedTime = Math.ceil(time);
            formattedTime = `Published ${elapsedTime} hours ago`;
        }
    }

    // Get status color
    let statusColor: string;
    switch(status){
        case "Closed": statusColor = "after:bg-[#B70000]"; break;
        case "In Progress": statusColor = "after:bg-[#FDB022]"; break;
        case "Accepted": statusColor = "after:bg-[#23B000]"; break;
    }

    // Styles
    const minHeight: Readonly<string> = "min-h-20";
</script>

<!-- Card Container -->
<div id={`card-${id}`}
    class={twMerge([
        "bg-WIgray-light",
        `${minHeight}`,
        "rounded-md",
        "grid grid-flow-row content-center",
        practitioner && !isOpen && "transition duration-200 ease-in-out",
        practitioner && !isOpen && "hover:bg-WIgray-contrast hover:bg-opacity-40 hover:shadow-md",
        className
    ])}
    {...restProps}>
    <!-- Card Header -->
    <div
        on:click={e =>  practitioner && handleState(e)}
        role={`${practitioner && "button"}`}
        class={
            `${minHeight} px-4 flex justify-between items-center
            ${isOpen ? "mb-2 shadow-lg": "m-0"}`
        }>
        {#if enterprise}
            <span class="basis-2/6">{position}</span>
            <div class="basis-3/6 flex justify-around items-center">
                <span class={`status ${statusColor}`}>Status</span>
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
            <span class="basis-1/6">{company}</span>
            <span class="basis-1/6">{jobPosition}</span>
            <div class="basis-2/6 flex justify-around items-center">
                <span class={`status ${statusColor}`}/>
                <span>{formattedTime}</span>
            </div>
            <div class="basis-2/6 flex justify-center items-center gap-x-4">
                <button class="view-details peer">View Details</button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="
                        size-5 opacity-0
                        transition-all duration-300 ease-in-out
                        peer-hover:text-WIblue-input peer-hover:opacity-100
                    ">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>  
            </div>
        {/if}
    </div>
    <!-- Card Body -->
    <input type="checkbox" bind:checked={isOpen}/>
    <details open>
        <summary class="list-none"/>
        {#if enterprise}
            <div class="grid grid-cols-2 px-4">
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
            {#if viewDetails}
                <div transition:slide class="p-4 [&_p]:mb-2">
                    <p><strong>Job Summary: </strong>{description}</p>
                    <p><strong>Skills: </strong>{skills}</p>
                    <p><strong>Requirements: </strong>{requirements}</p>
                    <p><strong>Benefits: </strong>{benefits}</p>
                    <div class="grid grid-cols-4 grid-rows-2 grid-flow-col">
                        <p><strong>Duration: </strong>{duration}</p>
                        <p><strong>Start Date: </strong>{startDate}</p>
                        <p><strong>Salary: </strong>{salary}</p>
                        <p><strong>Location: </strong>{location}</p>
                        <button
                            class="
                                bg-WIblue bg-opacity-75
                                text-WIwhite font-medium
                                row-start-2 col-start-4
                                max-h-12 rounded-md
                                transition duration-200 ease-in-out
                                hover:shadow-lg hover:bg-WIblue-input
                            ">
                            Apply Now
                        </button>
                    </div>
                </div>
            {:else}    
                <div transition:slide class="grid grid-cols-3 p-4">
                    <p class="size-fit pr-2 col-span-2">
                        <strong>Description: </strong>
                        {description}
                    </p>
                    <div>
                        <p><strong>Duration: </strong>{duration}</p>
                        <p><strong>Salary: </strong>{salary}</p>
                        <p><strong>Start Date: </strong>{startDate}</p>
                        <p><strong>Location: </strong>{location}</p>
                    </div>
                    <button
                        class="
                            bg-WIblue bg-opacity-75
                            text-WIwhite font-medium
                            w-2/3 py-2 mt-10 col-span-full col-start-3 justify-self-center
                            rounded-md
                            transition duration-200 ease-in-out
                            hover:shadow-lg hover:bg-WIblue-input
                        ">
                        Apply
                    </button>
                </div>
            {/if}
        {/if}
    </details>
</div>

<style>
    button.view-results,
    button.view-details{
        position: relative;
    }
    button.view-results::before,
    button.view-details::before{
        content: "";
        width: 100%;
        height: 1.5px;
        position: absolute;
        bottom: 0;
        transform: scaleX(0);
        transition: transform 200ms ease-in-out;
        background-color: currentColor;
    }
    button.view-results:hover::before,
    button.view-details:hover::before{
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
        right: 0.5rem;
        top: 25%;
    }

    details{
        max-height: 0rem;
        overflow-y: scroll;
        transition: max-height 200ms ease-in-out;
    }
    details::-webkit-scrollbar{
        color: transparent;
        width: 0.5rem;
    }
    details::-webkit-scrollbar-thumb{
        background-color: #858585;
        border-radius: 0.75rem;
    }

    input[type="checkbox"]{
        list-style: none;
        appearance: none;
    }
    input[type="checkbox"]:checked + details{
        max-height: 12rem;
    }
</style>