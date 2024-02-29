import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProgramChart = ({ pgCalList }) => {
    const groupedData = pgCalList.reduce((acc, event) => {
        const month = event.PS_START.split('-')[1]; // '2024-01-01 14:00'에서 월만 추출
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

    // 데이터 포맷을 AreaChart에 맞게 변환
    const data = sortedData.map(({ month, count }) => ({
        월: `${month}월`, // x축
        횟수: count, // y축
    }));
    
    return (
        <div style={{ width: '100%', height: '80%' }}>
            <ResponsiveContainer>
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="월" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                        type="monotone" 
                        dataKey="횟수" 
                        stroke="#ffcb52" 
                        fill="#ff7b02" 
                        isAnimationActive={true} 
                        position="center"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProgramChart;
