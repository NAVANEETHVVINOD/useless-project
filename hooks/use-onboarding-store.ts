import { create } from 'zustand';
import { DraftService } from '@/lib/draft/service';
import { devtools, persist } from 'zustand/middleware';

const draftService = new DraftService();

interface OnboardingState {
  step: number;
  formData: any;
  setStep: (step: number) => void;
  setFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  restoreDraft: () => void;
  submitProfile: () => Promise<void>;
}

export const useOnboardingStore = create<OnboardingState>()(
  devtools(
    persist(
      (set, get) => ({
        step: 1,
        formData: {},
        setStep: (step) => set({ step }),
        setFormData: (data) => {
          const newFormData = { ...get().formData, ...data };
          set({ formData: newFormData });
          draftService.saveDraft(newFormData);
        },
        nextStep: () => set((state) => ({ step: state.step + 1 })),
        prevStep: () => set((state) => ({ step: state.step - 1 })),
        restoreDraft: () => {
          const draft = draftService.loadDraft();
          if (draft) {
            set({ formData: draft });
          }
        },
        submitProfile: async () => {
          const formData = get().formData;
          // TODO: Call the API to submit the profile
          console.log('Submitting profile', formData);
          draftService.deleteDraft();
        },
      }),
      {
        name: 'onboarding-storage',
      }
    )
  )
);
