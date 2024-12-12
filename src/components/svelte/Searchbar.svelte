<script lang="ts">
    import { twMerge } from "tailwind-merge";
    import type { HTMLInputAttributes } from "svelte/elements";
    import type { ClassName } from "../../types/global";

    interface Props extends HTMLInputAttributes {
        readonly id: string;
        className?: ClassName;
    };

    const { id, className, ...restProps }: Props = $props();
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
        "pl-6 py-1",
        "outline-none",
        "border border-current rounded-2xl",
        "placeholder:text-current placeholder:font-light",
        className])}
    {...restProps}
/>
<!-- Populate datalist with options on component load -->
<!-- svelte-ignore element_invalid_self_closing_tag -->
<datalist id={`${id}-datalist`}/>