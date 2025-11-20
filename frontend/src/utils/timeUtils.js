
export const formatLocalTime = (timezone) => {
  try {
    const now = new Date();
    return now.toLocaleString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    });
  } catch (error) {
    console.error('Error formatting time for timezone:', timezone, error);
    return 'Time unavailable';
  }
};

export const isWithinWorkingHours = (timezone, workingHours) => {
  try {
    if (!workingHours || !workingHours.start || !workingHours.end) {
      return false;
    }
    
    const now = new Date();
    const timeInTimezone = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const currentHour = timeInTimezone.getHours();
    
    // Parse working hours as numbers
    const startHour = typeof workingHours.start === 'string' 
      ? parseInt(workingHours.start.split(':')[0], 10)
      : workingHours.start;
    const endHour = typeof workingHours.end === 'string'
      ? parseInt(workingHours.end.split(':')[0], 10)
      : workingHours.end;
    
    return currentHour >= startHour && currentHour < endHour;
  } catch (error) {
    console.error('Error checking working hours for timezone:', timezone, error);
    return false;
  }
};

export const getTimezoneOffset = (timezone) => {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    const parts = formatter.formatToParts(now);
    const partMap = {};
    parts.forEach(({ type, value }) => {
      partMap[type] = value;
    });
    
    const tzDate = new Date(
      partMap.year,
      parseInt(partMap.month) - 1,
      partMap.day,
      partMap.hour,
      partMap.minute,
      partMap.second
    );
    
    const diffMs = now - tzDate;
    const offsetHours = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60));
    const offsetMinutes = Math.floor((Math.abs(diffMs) % (1000 * 60 * 60)) / (1000 * 60));
    
    const sign = diffMs >= 0 ? '+' : '-';
    return `${sign}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;
  } catch (error) {
    console.error('Error getting timezone offset:', error);
    return '+00:00';
  }
};
