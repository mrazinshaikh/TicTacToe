<template>
    <ResultContainer class="flex justify-center">
        <div class="flex flex-col items-center justify-start translate-y-[10%]">
            <UIcon
                name="i-lucide-handshake"
                class="size-32 text-gray-500"
            />
            <div class="mt-4 flex items-center justify-center">
                <h2 class="text-9xl text-shadows">
                    It's a Draw
                </h2>
            </div>
        </div>

        <!-- <ClientOnly>
            <vue-particles
                id="tsparticles"
                :options="particlesOptions"
            />
        </ClientOnly> -->
    </ResultContainer>
</template>

<script setup lang="ts">
// import particlesOptions from '~/config/tsParticles.config';
</script>

<style scoped>
.text-shadows {
    --color-primary: #6b7280;
    --color-secondary: #9ca3af;
    --color-tertiary: #d1d5db;
    --color-quaternary: #e5e7eb;
    --color-quinary: #f3f4f6;
}
.text-shadows {
    text-shadow: 3px 3px 0 var(--color-secondary), 6px 6px 0 var(--color-tertiary),
        9px 9px var(--color-quaternary), 12px 12px 0 var(--color-quinary);
    font-family: 'Bungee', sans-serif;
    font-weight: 400;
    text-transform: uppercase;
    font-size: calc(2rem + 5vw);
    text-align: center;
    margin: 0;
    color: var(--color-primary);
    /* animation: shadows 1.2s ease-in infinite; */
    letter-spacing: 0.4rem;
    /* text-shadow: 3px 3px 0 var(--color-secondary), 6px 6px 0 var(--color-tertiary),
            9px 9px var(--color-quaternary); */
            transform: translate(-12px, -12px);
        text-shadow: 3px 3px 0 var(--color-secondary), 6px 6px 0 var(--color-tertiary),
            9px 9px var(--color-quaternary), 12px 12px 0 var(--color-quinary);
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
