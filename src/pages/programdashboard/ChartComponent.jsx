// ChartComponent.jsx

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ChartComponent = () => {
  // 간단한 데이터 예시 (상수값 사용)
    const data = [
        { name: '건강', 2024: 30, 2023: 20 },
        { name: '문화', 2024: 45, 2023: 25 },
        { name: '여가', 2024: 60, 2023: 10 },
        { name: '교양', 2024: 10, 2023: 40 },
        // 추가적인 데이터 항목들...
    ];

    return (
        <BarChart width={450} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="2024" fill="#8884d8" />
        <Bar dataKey="2023" fill="#82ca9d" />
        {/* 추가적인 차트 컴포넌트 설정... */}
        </BarChart>
    );
};

export default ChartComponent;
