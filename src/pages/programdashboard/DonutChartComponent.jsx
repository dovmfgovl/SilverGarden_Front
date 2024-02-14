// DonutChartComponent.jsx

import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const DonutChartComponent = () => {
    const data = [
        { name: '이지연', value: 20 },
        { name: '이슬기', value: 20 },
        { name: '박정원', value: 20 },
        { name: '고태규', value: 20 },
        { name: '안수연', value: 20 },
        // 추가적인 데이터 항목들...
    ];

    const COLORS = ['#0088FE', '#00C49F', '#82ca9d', '#8884d8']; // 각 부분에 대한 색상 설정

    return (
        <PieChart width={450} height={400}>
        <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data}
            cx={250}
            cy={200}
            outerRadius={80}
            innerRadius={40} // innerRadius를 설정하여 도넛 차트로 만듭니다.
            fill="#8884d8"
            label
        >
            {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
        <Tooltip />
        <Legend />
        </PieChart>
    );
};

export default DonutChartComponent;
