<script setup lang="ts">
import AuthLayout from '~/layouts/AuthLayout.vue'
import { useForm } from '@inertiajs/vue3'
import AppHead from '~/components/AppHead.vue'
import FormInput from '~/components/FormInput.vue'
import { Loader } from 'lucide-vue-next'

defineOptions({ layout: AuthLayout })
const form = useForm({
  username: '',
  email: '',
  password: '',
})
</script>
<template>
  <AppHead title="S'enregistrer" description="S'enregistrer sur le site" />
  <div class="flex flex-col space-y-2">
    <h1 class="text-2xl font-semibold tracking-tight">S'enregistrer</h1>
  </div>
  <form
    class="grid gap-3"
    @submit.prevent="form.post('/register', { onSuccess: () => form.reset() })"
  >
    <FormInput
      label="Username"
      v-model="form.username"
      :error="form.errors.username"
      :disabled="form.processing"
    />
    <FormInput
      label="Email"
      v-model="form.email"
      type="email"
      :error="form.errors.email"
      :disabled="form.processing"
    />
    <FormInput
      label="Password"
      type="password"
      v-model="form.password"
      :error="form.errors.password"
      :disabled="form.processing"
    />
    <Button type="submit" :disabled="form.processing">
      <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
      S'enregistrer
    </Button>
  </form>
</template>
