import { z } from 'zod';

export const AuthSchema = z.object({
  firstName: z.string().min(2).optional().or(z.literal('')),
  email: z.string().email(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string().optional(),
}).refine((data) => {
    if (data.confirmPassword) {
        return data.password === data.confirmPassword;
    }
    return true;
    }, {
    message: 'Passwords must match',
    path: ['confirmPassword']
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const emailSchema = z.object({
  email: z.string().email(),
});

export type AuthFormData = z.infer<typeof AuthSchema>;
export type LoginFormData = z.infer<typeof LoginSchema>;
export type EmailFormData = z.infer<typeof emailSchema>;