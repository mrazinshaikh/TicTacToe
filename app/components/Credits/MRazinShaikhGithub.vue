<template>
    <NuxtLink
        class="hover:underline"
        :href="profileUrl"
        target="_blank"
    >
        {{ profileName }}
    </NuxtLink>
</template>

<script setup lang="ts">
const profileUrl = 'https://github.com/MRazinShaikh';
const profileName = 'MRazinShaikh';
</script>
