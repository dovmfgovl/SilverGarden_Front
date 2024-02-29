import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProgramCalChart = ({pgCalList}) => {
    // 주어진 데이터의 타이틀별로 그룹화하고 개수를 계산
    const groupedData = pgCalList.reduce((acc, item) => {
        const title = item.PS_NAME;
        const category = item.PS_CATEGORY;
        if (!acc[title]) {
            acc[title] = 1;
        } else {
            acc[title]++;
        }

        return acc;
    }, {});

    // 그룹화된 데이터를 차트에 표시할 형태로 변환
    const chartData = Object.keys(groupedData).map(title => ({
        title,
        횟수: groupedData[title],
    }));

    // 데이터를 count를 기준으로 정렬
    chartData.sort((a, b) => b.count - a.count);

    return (
        <div style={{ width: '95%', height: '90%' }}>
        <ResponsiveContainer>
            <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="title" type="category" width={140} />
                <Tooltip />
                <Legend />
                <Bar dataKey="횟수" fill="#8884d8">
                    {chartData.map((entry, index) => (
                        <Bar key={`bar-${index}`} dataKey="횟수" fill={entry.color} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
    );
};

export default ProgramCalChart;
