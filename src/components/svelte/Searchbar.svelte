<script lang="ts">
    import { twMerge } from "tailwind-merge";
    import type { HTMLAttributes } from "astro/types";
    import type { ClassName } from "../../types/global";

    interface $$Props extends HTMLAttributes<"input">{
        className?: ClassName;
    };
    const { className } = $$props;
    const restProps = $$restProps;
</script>

<input
    type="search"
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