<template>
    <NuxtPwaManifest />
    <UApp>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'Tic Tac Toe - By MRazinShaikh',
    description:
        'Play Tic Tac Toe online for free. A simple and fun game to play with your family and friends.',
    ogTitle: 'Tic Tac Toe - Play Tic Tac Toe Online',
    ogDescription:
        'Play Tic Tac Toe online for free. A simple and fun game to play with your family and friends.',
    ogImage: 'https://tic-tac-toe-mrazinshaikh.com/board.png',
    ogUrl: 'https://tic-tac-toe-mrazinshaikh.com',
    ogType: 'website',
    ogLocale: 'en_US',
    ogSiteName: 'Tic Tac Toe',
    ogLocaleAlternate: ['en_US', 'en'],
});

const { $pwa } = useNuxtApp();

const toast = useToast();

onMounted(() => {
    checkAndInstallPwa();

    if ($pwa?.offlineReady) {
        toast.add({
            title: 'Offline Read.',
            color: 'success',
        });
    }
});

function checkAndInstallPwa() {
    if (!$pwa?.isPWAInstalled) {
        toast.add({
            duration: 30000,
            title: 'Ready to install !',
            actions: [
                {
                    icon: 'lucide:download',
                    label: 'Install',
                    color: 'success',
                    variant: 'solid',
                    onClick: async (e) => {
                        e.preventDefault();
                        installPwa();
                    },
                },
            ],
        });
    }
}

async function installPwa() {
    const choice = await $pwa?.install();

    if (choice?.outcome === 'dismissed') {
        toast.add({
            title: 'Operation failed!',
            color: 'error',
        });
    }
}
</script>
