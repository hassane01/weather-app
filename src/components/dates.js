function getNextThreeDays() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    

    const nextThreeDays = [];
    for (let i = 0; i <= 3; i++) {
        const nextDayIndex = (currentDayIndex + i) % 7;
        nextThreeDays.push(daysOfWeek[nextDayIndex]);
    }

    return nextThreeDays;
    
}
function getCurrentDayName() {
 const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
 const currentDate = new Date();
 const currentDayIndex = currentDate.getDay();
 const day = currentDate.getDate();
 const month = monthsOfYear[currentDate.getMonth()];
 const year = currentDate.getFullYear();
 const currentDayName = daysOfWeek[currentDayIndex];
 const formattedDate = `${day} ${month} ${year}`;
 return { currentDayName, formattedDate };
}

// Example usage:
export  const { currentDayName, formattedDate } = getCurrentDayName();

export const nextThreeDays = getNextThreeDays();