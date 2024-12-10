<script setup lang="ts">
import ToastManager from '~/components/ToastManager.vue'

defineProps<{
  messages: Record<string, string | Record<string, string>>
}>()
</script>

<template>
  <div class="container">
    <header class="flex gap-2 my-2">
      <Link href="/"> Boiler</Link>
      <Link href="/register">Register</Link>
      <Link href="/login">Login</Link>
    </header>
    <main
      class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
    >
      <slot />
    </main>

    <ToastManager :messages="messages" />
  </div>
</template>
