<template>
    <ResultContainer class="flex justify-center">
        <div class="flex flex-col items-center justify-start translate-y-[10%]">
            <PlayerIcon class="size-32 text-yellow-500" />
            <div class="mt-4 flex items-center justify-center">
                <h2 class="text-9xl text-shadows">
                    You Won
                </h2>
            </div>
        </div>

        <ClientOnly>
            <vue-particles
                id="tsparticles"
                :options="particlesOptions"
            />
        </ClientOnly>
    </ResultContainer>
</template>

<script setup lang="ts">
import particlesOptions from '~/config/tsParticles.config';
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bungee&display=swap");
.text-shadows {
    --color-primary: #5192ed;
    --color-secondary: #69a1f0;
    --color-tertiary: #7eaef2;
    --color-quaternary: #90baf5;
    --color-quinary: #a2c4f5;

    --color-primary: var(--color-yellow-500);
    --color-secondary: var(--color-yellow-400);
    --color-tertiary: var(--color-yellow-300);
    --color-quaternary: var(--color-yellow-200);
    --color-quinary: var(--color-yellow-100);
}
.text-shadows {
    text-shadow: 3px 3px 0 var(--color-secondary), 6px 6px 0 var(--color-tertiary),
        9px 9px var(--color-quaternary), 12px 12px 0 var(--color-quinary);
    font-family: bungee, sans-serif;
    font-weight: 400;
    text-transform: uppercase;
    font-size: calc(2rem + 5vw);
    text-align: center;
    margin: 0;
    color: var(--color-primary);
    animation: shadows 1.2s ease-in infinite;
    letter-spacing: 0.4rem;
}

@keyframes shadows {
    0% {
        text-shadow: none;
    }
    10% {
        transform: translate(-3px, -3px);
        text-shadow: 3px 3px 0 var(--color-secondary);
    }
    20% {
        transform: translate(-6px, -6px);
        text-shadow: 3px 3px 0 var(--color-secondary), 6px 6px 0 var(--color-tertiary);
    }
    30% {
        transform: translate(-9px, -9px);
        text-shadow: 3px 3px 0 var(--color-secondary), 6px 6px 0 var(--color-tertiary),
            9px 9px var(--color-quaternary);
    }
    40% {
        transform: translate(-12px, -12px);
        text-shadow: 3px 3px 0 var(--color-secondary), 6px 6px 0 var(--color-tertiary),
            9px 9px var(--color-quaternary), 12px 12px 0 var(--color-quinary);
    }
    50% {
        transform: translate(-12px, -12px);
        text-shadow: 3px 3px 0 var(--color-secondary), 6px 6px 0 var(--color-tertiary),
            9px 9px var(--color-quaternary), 12px 12px 0 var(--color-quinary);
    }
    60% {
        text-shadow: 3px 3px 0 var(--color-secondary), 6px 6px 0 var(--color-tertiary),
            9px 9px var(--color-quaternary), 12px 12px 0 var(--color-quinary);
    }
    70% {
        text-shadow: 3px 3px 0 var(--color-secondary), 6px 6px 0 var(--color-tertiary),
            9px 9px var(--color-quaternary);
    }
    80% {
        text-shadow: 3px 3px 0 var(--color-secondary), 6px 6px 0 var(--color-tertiary);
    }
    90% {
        text-shadow: 3px 3px 0 var(--color-secondary);
    }
    100% {
        text-shadow: none;
    }
}
</style>
