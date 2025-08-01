<template>
  <div class="flex items-center justify-center py-12">
    <div class="w-full max-w-md p-8 space-y-8 bg-white/40 backdrop-blur-md rounded-2xl shadow-lg">
      <div class="text-center">
        <h1 class="font-heading text-5xl text-brand-brown">Join the Pack</h1>
        <p class="mt-2 text-text-light">Create an account to find friends for your best friend.</p>
      </div>
      
      <form @submit.prevent="handleSignup" class="space-y-6">
        <FormInput
          id="username"
          label="Username"
          v-model="formData.username"
          placeholder="Your pet's #1 fan"
        />
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          v-model="formData.email"
          placeholder="you@example.com"
        />
        <FormInput
          id="city"
          label="Your City"
          v-model="formData.city"
          placeholder="e.g., New York"
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          v-model="formData.password"
          placeholder="••••••••"
        />

        <div>
          <FormButton>Create Account</FormButton>
        </div>
      </form>

      <div class="text-center">
        <p class="text-sm text-text-light">
          Already have an account?
          <NuxtLink to="/login" class="font-bold text-brand-brown hover:underline">Log In</NuxtLink>
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
  username: '',
  email: '',
  city: '',
  password: '',
});

const handleSignup = async () => {
  // MOVED: We now call useUserStore() inside the function, guaranteeing Pinia is ready.
  const userStore = useUserStore();
  
  const success = await userStore.signup(formData.value);
  
  if (success) {
    router.push('/create-profile');
  } else {
    alert('Signup failed! Username or email might already be in use.');
  }
};
</script>