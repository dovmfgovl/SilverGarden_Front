// ChartComponent.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const ChartComponent = () => {
    // useSelector를 사용하여 리덕스 스토어에서 데이터 가져오기
    const events = useSelector((state) => state.calendarSlice.events);

    const groupedData = events.reduce((acc, item) => {
        const date = new Date(item.start); // 예제 데이터에서는 start 프로퍼티를 날짜로 가정
        const dayOfWeek = date.toLocaleDateString('ko', { weekday: 'long' }); // 요일을 추출
        if (!acc[dayOfWeek]) {
            acc[dayOfWeek] = 1;
        } else {
            acc[dayOfWeek]++;
        }
        return acc;
    }, {});
    delete groupedData["일요일"];

    // 그룹화된 데이터를 차트에 표시할 형태로 변환
    const chartData = Object.keys(groupedData).map(dayOfWeek => ({
        name: dayOfWeek,
        value: groupedData[dayOfWeek],
    }));

    // 차트에 사용할 색상 정의
    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <PieChart width={450} height={400}>
            <Pie
                data={chartData}
                cx={225}
                cy={200}
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
            >
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
            </Pie>
            <Tooltip formatter={(value) => [value, 'Count']} />
        </PieChart>
    );
};

export default ChartComponent;
