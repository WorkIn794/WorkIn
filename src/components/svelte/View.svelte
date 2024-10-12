<script lang="ts">
    export let user: "practitioner" | "enterprise";
    
    async function getQuote(): Promise<string>{
        const response = await (await fetch("https://api.jikan.moe/v4/random/characters")).json();
        const name: string = response.data.name;

        console.log(name);
        return name;
    }
</script>

<div id="view">
    {#await getQuote()}
        <div>
            <slot name="loader"/>
        </div>
    {:then data}
        <h1>Hola {data}!</h1>
    {:catch error}
        <h1>Error: {error.message}</h1>
    {/await}
</div>

<style>
    #loaderContainer{
        width: inherit;
        height: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>