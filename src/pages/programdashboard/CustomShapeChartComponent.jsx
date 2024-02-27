import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomShapeLineChartComponent = () => {
    const events = useSelector((state) => state.calendarSlice.events);
    const groupedData = events.reduce((acc, event) => {
        const month = event.start.split('-')[1]; // '2024-01-01 14:00'에서 월만 추출
        if (!acc[month]) {
            acc[month] = { month, count: 1 }; // 객체로 저장하여 월 정보를 유지
        } else {
            acc[month].count++;
        }
        return acc;
    }, {});

    // 객체를 [월, { month, count }] 형태의 배열로 변환
    const dataForSorting = Object.entries(groupedData).map(([month, { count }]) => ({
        month,
        count,
    }));

    // 배열을 월을 기준으로 정렬
    const sortedData = dataForSorting.sort((a, b) => a.month.localeCompare(b.month));

    // 데이터 포맷을 LineChart에 맞게 변환
    const data = sortedData.map(({ month, count }) => ({
        월: `${month}월`, // x축
        횟수: count, // y축
    }));


    return (
        <>
            <h4>월별 프로그램 횟수</h4>
            <LineChart width={500} height={600} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="월" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="횟수" stroke="#8884d8" strokeWidth={3} isAnimationActive={true} />
            </LineChart>
        </>
    );
};

export default CustomShapeLineChartComponent;
