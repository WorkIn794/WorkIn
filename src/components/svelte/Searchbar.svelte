<script lang="ts">
    import { twMerge } from "tailwind-merge";
    import type { HTMLAttributes } from "astro/types";
    import type { ClassName } from "../../types/global";

    interface $$Props extends HTMLAttributes<"input">{
        readonly id: string;
        className?: ClassName;
    };
    const { className, id } = $$props;
    const restProps = $$restProps;
</script>

<input
    id={id}
    name="searchBar"
    type="search"
    spellcheck={false}
    list={`${id}-datalist`}
    class={twMerge([
        "bg-WIgray-light",
        "text-WIblack",
        "pl-6",
        "outline-none",
        "border border-current rounded-2xl",
        "placeholder:text-current placeholder:font-light",
        className])}
    {...restProps}
/>
<!-- Populate datalist with options on component load -->
<datalist id={`${id}-datalist`}/>