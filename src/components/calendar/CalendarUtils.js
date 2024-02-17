    
export const formatScheduleToEvent = (scheduleData) => {
    // console.log('scheduleData:', scheduleData); // 전체 객체를 로그로 출력
    // console.log('repeatType:', scheduleData.repeatType); // repeatType 속성만을 개별 로그로 출력
    return {
        title: scheduleData.title, 
        start: scheduleData.start,
        end: scheduleData.end,
        content: scheduleData.content,
        rrule: {
            dtstart: scheduleData.start,
            until: scheduleData.end,
        },
        pgCategory: scheduleData.category,
    };
};
    
export const getBackgroundColor = (category) => {
    const actualCategory = category || '기본값';
    const predefinedColors = ['#1abc9c', '#3498db', '#e74c3c', '#f0932b', '#6ab04c', '#3c40c6', '#e056fd', '#ff7979', '#82589F', '#6D214F'];
    const hash = actualCategory.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const colorIndex = hash % predefinedColors.length;
    return predefinedColors[colorIndex];
};
