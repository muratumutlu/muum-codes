export const beautifyDate = (dateString: string | null = null, withDay = false) => {
  if (dateString === null) return 'No Valid Date Provided';

  const date = new Date(dateString);

  if (withDay) {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};
