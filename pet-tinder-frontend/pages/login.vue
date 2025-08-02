<template>
  <div class="flex items-center justify-center py-12">
    <div class="w-full max-w-md p-8 space-y-8 bg-white/40 backdrop-blur-md rounded-2xl shadow-lg">
      <div class="text-center">
        <!-- CHANGE: Updated text color -->
        <h1 class="font-heading text-5xl text-brand-primary">Welcome Back!</h1>
        <!-- CHANGE: Updated text color for consistency -->
        <p class="mt-2 text-text-secondary">Let's get your pet back in the game.</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          v-model="formData.email"
          placeholder="you@example.com"
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          v-model="formData.password"
          placeholder="••••••••"
        />

        <div>
          <FormButton>Log In</FormButton>
        </div>
      </form>

      <div class="text-center">
        <p class="text-sm text-text-secondary">
          Don't have an account?
          <!-- CHANGE: Updated link color -->
          <NuxtLink to="/signup" class="font-bold text-brand-primary hover:underline">Sign Up</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '~/store/userStore';
import FormInput from '~/components/form/FormInput.vue';
import FormButton from '~/components/form/FormButton.vue';

const router = useRouter();

const formData = ref({
  email: '',
  password: '',
});

const handleLogin = async () => {
  const userStore = useUserStore();
  const success = await userStore.login(formData.value);
  if (success) {
    router.push('/swipe'); 
  } else {
    alert('Login failed! Please check your email and password.');
  }
};
</script>