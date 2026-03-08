/**
 * Age calculation utilities
 */

/**
 * Calculate age in years from birthday
 */
export function calculateAge(birthday: Date): number {
  const today = new Date();
  const birthDate = new Date(birthday);
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // Adjust if birthday hasn't occurred this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Calculate age in years and months from birthday
 */
export function calculateAgeDetailed(birthday: Date): { years: number; months: number } {
  const today = new Date();
  const birthDate = new Date(birthday);
  
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  if (today.getDate() < birthDate.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }
  
  return { years, months };
}

/**
 * Format age for display
 */
export function formatAge(birthday: Date): string {
  const { years, months } = calculateAgeDetailed(birthday);
  
  if (years === 0) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  }
  
  if (months === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  }
  
  return `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}`;
}
