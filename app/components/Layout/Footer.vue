<template>
    <footer class="w-full px-3 py-4 border-t border-pancho-600 flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-between">
        <div class="flex items-center gap-1">
            <span>Made With</span>
            <UIcon
                :customize="customize"
                name="lucide:heart"
                class="size-6 text-red-700"
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
                    <span class="group-hover:underline">
                        mrazinshaikh/TicTacToe
                    </span>
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
