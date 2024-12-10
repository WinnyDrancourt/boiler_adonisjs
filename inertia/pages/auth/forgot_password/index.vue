<script setup lang="ts">
import AuthLayout from '~/layouts/AuthLayout.vue'
import { useForm } from '@inertiajs/vue3'
import { Info, Loader } from 'lucide-vue-next'

defineOptions({ layout: AuthLayout })
defineProps<{ isSent: boolean }>()

const form = useForm({
  email: '',
})
</script>

<template>
  <AppHead title="Mot de passe oublié ?" description="Réinitialiser votre mot de passe" />
  <div class="flex flex-col space-y-2">
    <h1 class="text-2xl font-semibold tracking-tight">Mot de passe oublié ?</h1>
    <p>
      Pas de soucis ! Saisissez votre adresse e-mail ci-dessous et, si nous trouvons un compte
      correspondant, nous vous enverrons un lien de réinitialisation de mot de passe.
    </p>
  </div>
  <Alert v-if="isSent">
    <Info class="w-4 h-4" />
    <AlertTitle>Veuillez vérifier votre boite Mail</AlertTitle>
    <AlertDescription>
      Nous vous avons envoyé un lien de réinitialisation de mot de passe à votre adresse e-mail.
      Veuillez vérifier votre e-mail et cliquer sur le lien pour réinitialiser votre mot de passe.
    </AlertDescription>
  </Alert>
  <form
    class="grid gap-3"
    @submit.prevent="
      form.post('/forgot-password', { onSuccess: () => form.reset(), preserveScroll: true })
    "
  >
    <FormInput
      label="email"
      v-model="form.email"
      :error="form.errors.email"
      :disabled="form.processing"
    />
    <Button type="submit" :disabled="form.processing">
      <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
      Réinitialiser votre mot de passe
    </Button>
  </form>
</template>
