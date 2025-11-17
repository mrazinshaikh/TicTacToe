<template>
    <header class="w-full px-3 py-4 border-b border-pancho-600 flex items-center justify-between">
        <div class="flex items-center justify-start gap-3">
            <span>
                <UIcon
                    name="i-custom-board"
                    class="size-8 text-pancho-700"
                />
            </span>
            <div class="flex flex-col items-start gap-0">
                <h2 class="text-xl lg:text-3xl font-bold">
                    Tic Tac Toe
                </h2>
                <small>
                    <span>By</span>
                    <MRazinShaikhGithub class="ml-1" />
                </small>
            </div>
        </div>

        <!-- <div>End Block</div> -->
    </header>
</template>

<script setup lang="ts">
import MRazinShaikhGithub from '../Credits/MRazinShaikhGithub.vue';
</script>
