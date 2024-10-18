<script lang="ts">
    import { select, easeCubicInOut } from "d3";
    
    export let id: number;
    export let toggleState: boolean;

    enum directions{
        UP =   "m19.5,8.25 -7.5,-7.5 -7.5,7.5",
        DOWN = "m19.5,8.25 -7.5,7.5 -7.5,-7.5"
    };
    const { UP, DOWN } = directions;

    function toggle(state: boolean): void {
        const chevron = select(`#chevron-${id}`);

        chevron.select("path")
            .attr("d", state ? DOWN : UP)
            .transition()
            .duration(200)
            .attr("d", state ? UP : DOWN)
            .ease(easeCubicInOut);
    }

    $: toggle(toggleState);
</script>

<svg id={`chevron-${id}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5,8.25 -7.5,7.5 -7.5,-7.5"/>
</svg>
