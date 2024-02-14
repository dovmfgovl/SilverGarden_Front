import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomShapeLineChartComponent = () => {
    const data = [
        { name: '12월', 2024: 30, 2023: 50 },
        { name: '1월', 2024: 70, 2023: 60 },
        { name: '2월', 2024: 20, 2023: 80 },
        { name: '3월', 2024: 0, 2023: 30 },
        { name: '4월', 2024: 0, 2023: 40 },
        { name: '5월', 2024: 0, 2023: 10 },
        { name: '6월', 2024: 0, 2023: 30 },
        { name: '7월', 2024: 0, 2023: 70 },
        { name: '8월', 2024: 0, 2023: 40 },
        { name: '9월', 2024: 0, 2023: 10 },
        { name: '10월', 2024: 0, 2023: 20 },
        { name: '11월', 2024: 0, 2023: 20 },
        { name: '12월', 2024: 0, 2023: 60 },
        // 추가적인 데이터 항목들...
    ];

    const customShapePath = 'M10,10C50,200,50,200,10,390C60,410,90,390,90,390C90,390,110,430,90,470C70,510,50,490,10,470C-10,430,-30,10,10,10Z';

    return (
        <LineChart width={450} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="2024" stroke="#82ca9d" isAnimationActive={true} />

            <defs>
                <clipPath id="customShape">
                    <path d={customShapePath} />
                </clipPath>
            </defs>

            <Line type="monotone" dataKey="2023" stroke="#8884d8" clipPath="url(#customShape)" isAnimationActive={true} />
        </LineChart>
    );
};

export default CustomShapeLineChartComponent;
