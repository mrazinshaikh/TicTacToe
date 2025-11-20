<template>
    <footer
        class="w-full px-3 py-4 border-t border-pancho-600 flex flex-col gap-2 md:gap-0 md:flex-row items-center justify-between text-sm md:text-base"
    >
        <div class="flex items-center gap-1">
            <span>Made With</span>
            <UIcon
                :customize="customize"
                name="lucide:heart"
                class="size-6 text-red-700 heart animate-[heartbeat_1s_ease-in-out_infinite]/"
            />
            <span>By</span>
            <MRazinShaikhGithub class="ml-1" />
        </div>

        <div>
            <NuxtLink
                class="hover:underline"
                href="https://github.com/mrazinshaikh/TicTacToe/blob/main/LICENSE"
                target="_blank"
            >GNU GPL v3.0</NuxtLink>
        </div>

        <div>
            <NuxtLink
                href="https://github.com/mrazinshaikh/TicTacToe"
                target="_blank"
                class="group"
            >
                <div class="flex items-center gap-1">
                    <span class="group-hover:underline"> mrazinshaikh/TicTacToe </span>
                    <UIcon
                        name="lucide:github"
                        class="size-6"
                    />
                </div>
            </NuxtLink>
        </div>
    </footer>
</template>

<script lang="ts" setup>
import MRazinShaikhGithub from '~/components/Credits/MRazinShaikhGithub.vue';

function customize(content: string) {
    return content.replace(/fill="[^"]*"/g, `fill="#FF5733"`);
}
</script>

<style scoped>
.heart,
.heart:hover,
.heart:focus {
    animation: heartbeat 1s ease 2 forwards;
}
@keyframes heartbeat {
    0% {
        transform: scale(1);
    }
    20% {
        transform: scale(1.25);
    }
    40% {
        transform: scale(1);
    }
    60% {
        transform: scale(1.25);
    }
    80% {
        transform: scale(1);
    }
    100% {
        transform: scale(1);
    }
}
</style>
