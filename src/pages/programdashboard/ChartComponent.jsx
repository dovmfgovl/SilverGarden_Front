import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ChartComponent = ({pgCalList}) => {

    // 주어진 데이터의 타이틀별로 그룹화하고 개수를 계산
    const groupedData = pgCalList.reduce((acc, item) => {
        const title = item.PS_NAME;
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

    // 데이터를 카테고리별로 다른 색상으로 지정
    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00C49F', '#FFBB28', '#FF8042'];
    chartData.forEach((data, index) => {
        data.color = COLORS[index % COLORS.length];
    });

    // 데이터를 count를 기준으로 정렬
    chartData.sort((a, b) => b.count - a.count);

    return (
        <>
            <h4>프로그램별 진행 횟수(예정)</h4>
            <BarChart width={300} height={300} data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="title" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="횟수" fill="#8884d8"  >
                    {chartData.map((entry, index) => (
                        <Bar key={`bar-${index}`} dataKey="횟수" fill={entry.color} />
                    ))}
                </Bar>
            </BarChart>
        </>
    );
};

export default ChartComponent;
