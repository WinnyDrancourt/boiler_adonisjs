<script setup lang="ts">
import AuthLayout from '~/layouts/AuthLayout.vue'
import { useForm } from '@inertiajs/vue3'
import AppHead from '~/components/AppHead.vue'
import FormInput from '~/components/FormInput.vue'
import { AlertCircle, Loader } from 'lucide-vue-next'

defineOptions({ layout: AuthLayout })
defineProps<{
  exceptions: Record<string, string>
}>()
const form = useForm({
  email: '',
  password: '',
  remember: false,
})
</script>
<template>
  <AppHead title="Se connecter" description="Se connecter sur le site" />
  <div class="flex flex-col space-y-2">
    <h1 class="text-2xl font-semibold tracking-tight">Connexion</h1>
  </div>
  <form class="grid gap-3" @submit.prevent="form.post('/login')">
    <Alert v-if="exceptions.E_INVALID_CREDENTIALS" variant="destructive" class="mb-6">
      <AlertCircle class="w-4 h-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{{ exceptions.E_INVALID_CREDENTIALS }}</AlertDescription>
    </Alert>
    <FormInput
      label="email"
      v-model="form.email"
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
    <div class="flex items-center justify-between flex-wrap gap-4">
      <FormInput type="group" :error="form.errors.remember">
        <div class="flex items-center gap-2">
          <Checkbox v-model:checked="form.remember" />
          <span>Remember me</span>
        </div>
      </FormInput>
      <Link href="/forgot-password" class="text-sm underline">Forgot password?</Link>
    </div>
    <Button type="submit" :disabled="form.processing">
      <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
      Connexion
    </Button>
  </form>
</template>
