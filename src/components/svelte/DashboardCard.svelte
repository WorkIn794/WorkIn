<script lang="ts">
    import { onMount } from "svelte";
    import { cva } from "cva";
    import { twMerge } from "tailwind-merge";
    import { plot, lineY, dot } from "@observablehq/plot";
    import type { HTMLAttributes } from "astro/types";
    import type { VariantProps } from "cva";
    import type { ClassName } from "../../types/global";

    const card = cva(["border rounded-xl shadow"], {
        variants: {
            intent: {
                applicantsNumber: [
                    "min-h-32 h-full",
                    "flex flex-col justify-center items-center gap-2",
                    "[&_h1]:text-2xl [&_h1]:font-bold",
                    "[&_p]:text-sm"
                ],
                pendingProcesses: [
                    "bg-WIblue-lavander",
                    "text-center",
                    "min-h-32 h-full p-6",
                    "grid grid-cols-2 grid-rows-2 grid-flow-col justify-items-center",
                    "[&_h1]:text-2xl [&_h1]:font-bold",
                    "[&_p]:text-sm",
                    "[&_svg]:size-full [&_svg]:row-span-full"
                ],
                topApplicants: [
                    "h-fit p-4",
                    "shadow-md",
                    "[&_h1]:text-md [&_h1]:text-center [&_h1]:font-bold [&_h1]:mb-2",
                    "[&_ol]:list-decimal [&_ol]:list-inside [&_ol]:text-sm [&_ol]:inline-block",
                    "[&_svg]:size-14 [&_svg]:inline-block [&_svg]:float-right"
                ],
                timeProcess: [
                    "bg-WIblue-lavander",
                    "min-h-32",
                    "p-4",
                    "[&_h1]:text-lg [&_h1]:font-semibold [&_h1]:mb-4"
                ]
            }
        }
    });

    interface ProcessTime{
        id: number;
        name: string;
        time: number;
    };
    interface $$Props extends
    HTMLAttributes<"div">,
    VariantProps<typeof card>{
        data:
            | number
            | [string, string, string] // Top three data format.
            | ProcessTime[]; // Time for each process data format.
        type:
            | "Applicants number"
            | "Pending processes"
            | "Average days"
            | "Top Applicants"
            | "Top Skills"
            | "Time for each process";
        className?: ClassName;
    };
    const { data, type, className } = $$props;
    const restCardProps = $$restProps;

    // Graph implementation
    let graph: HTMLDivElement;
    if(type === "Time for each process") onMount(() => {
        graph?.appendChild(plot({
            marks: [
                lineY(data, {y: "time"}),
                dot(data, {
                    y: "time",
                    x: (_, i) => i,
                    tip: true,
                    title: d => `${d.name}\n${d.time} days`,
                    fill: "black"
                })
            ],
            x: { label: "", type: "time", ticks: [] },
            y: { label: "", grid: true },
            style: "width: 100%;"
        }));
    });
</script>

{#if type === "Applicants number" || type === "Average days"}
    <div class={twMerge([card({intent: "applicantsNumber"}), className,
        type === "Applicants number" ? "bg-WIblue-pastel" : "bg-WIblue-malva"
    ])} {...restCardProps}>
        <h1>{data}</h1>
        <p>{type === "Applicants number" ? "Total number of applicants" : "Average days"}</p>
    </div>
{:else if type === "Pending processes"}
    <div class={twMerge([card({intent: "pendingProcesses"}), className])} {...restCardProps}>
        <h1>{data}</h1>
        <p>Pending processes</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
        </svg>
    </div>
{:else if type === "Top Applicants" || type === "Top Skills"}
    <div class={twMerge([card({intent: "topApplicants"}), className])} {...restCardProps}>
        <h1>{type === "Top Applicants" ? "Top 3 Applicants" : "Top 3 Skills"}</h1>
        <ol>
            {#each data as applicnat}
                <li>{applicnat}</li>
            {/each}
        </ol>
        {#if type === "Top Applicants"}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
            </svg>
        {:else if type === "Top Skills"}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
        {/if}
    </div>
{:else}
    <div bind:this={graph} class={twMerge([card({intent: "timeProcess"}), className])} {...restCardProps}>
        <h1>Time taken for each process</h1>
    </div>
{/if}