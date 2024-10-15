<script lang="ts">
    import { twMerge } from "tailwind-merge";
    import type { ClassName, UserExtendedCard } from "../../types/global";

    type $$Props = UserExtendedCard & {
        className?: ClassName;
    };
    const restProps = $$restProps;

    const { position, status, details, className } = $$props;
</script>

<div class={twMerge([
    "bg-WIgray-light",
    "min-h-20 p-4",
    "rounded-md",
    className])}
    {...restProps}>
    <span>{position}</span>
    <span>Status</span>
</div>

<style>

</style>