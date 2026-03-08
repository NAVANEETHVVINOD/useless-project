import { create } from 'zustand';
import { DraftService } from '@/lib/draft/service';
import { createPetProfile } from '@/app/actions/pet';
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

const initialState = {
    name: "",
    species: undefined,
    breed: "",
    gender: undefined,
    size: undefined,
    birthday: undefined,
    photos: [],
    personality: [],
    bio: "",
    preferences: {
        maxDistance: 25,
        speciesFilter: [],
        ageRange: { min: 0, max: 20 }
    }
};

export const useOnboardingStore = create<OnboardingState>()(
  devtools(
    persist(
      (set, get) => ({
        step: 1,
        formData: initialState,
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
          const res = await createPetProfile(formData);
          if (res && res.error) {
            throw new Error(res.error);
          }
          draftService.deleteDraft();
          set({ step: 1, formData: initialState });
        },
      }),
      {
        name: 'onboarding-storage',
      }
    )
  )
);
