<script setup lang="ts">
import AuthLayout from '~/layouts/AuthLayout.vue'
import { useForm } from '@inertiajs/vue3'
import { Info, Loader } from 'lucide-vue-next'

defineOptions({ layout: AuthLayout })
const props = defineProps<{ value: string; isValid: boolean; email: string | null }>()

const form = useForm({
  value: props.value,
  password: '',
})
</script>

<template>
  <AppHead
    title="Réinitialisez votre mot de passe"
    description="Réinitialiser votre mot de passe"
  />
  <div class="flex flex-col space-y-2">
    <h1 class="text-2xl font-semibold tracking-tight">Réinitialisez votre mot de passe</h1>
    <p>Veuillez entrer votre nouveau votre mot de passe</p>
  </div>
  <div v-if="!isValid">
    <Alert>
      <Info class="w-4 h-4" />
      <AlertTitle>Lien de reinitialisation invalide</AlertTitle>
      <AlertDescription>
        Ce lien de reinitialisation de votre mot de passe est invalide ou expiré. Veuillez
        re-essayer.
      </AlertDescription>
    </Alert>
    <Button as-child class="mt-3 flex">
      <Link href="/forgot-password">Demander un nouveau lien de reinitialisation</Link>
    </Button>
  </div>
  <form
    v-else
    @submit.prevent="
      form.post('/forgot-password/reset', { onSuccess: () => form.reset(), preserveScroll: true })
    "
  >
    <div class="grid gap-3">
      <FormInput label="Email" type="email" :model-value="email" disable />

      <FormInput
        label="Nouveau Mot de passe"
        type="password"
        v-model="form.password"
        :error="form.errors.password"
        disable
      />

      <Button type="submit" :disable="form.processing">
        <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
        Reset Password
      </Button>
    </div>
  </form>
</template>
