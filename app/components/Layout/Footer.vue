<template>
    <footer class="w-full px-3 py-4 border-t border-pancho-600 flex items-center justify-between">
        <div class="flex items-center gap-1">
            <span>Made With</span>
            <UIcon
                :customize="customize"
                name="i-lucide-heart"
                class="size-6 text-red-700"
            />
            <span>By</span>
            <MRazinShaikhGithub class="ml-1" />
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
                        name="i-lucide-github"
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
