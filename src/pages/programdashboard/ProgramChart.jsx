import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const ProgramChart = ({ programList }) => {
    const [data, setChartData] = useState();

    useEffect(() => {
        if (!programList || programList.length === 0) {
            // 프로그램 목록이 비어 있을 때의 처리
            return;
        }

        // 프로그램 목록에서 카테고리별 개수를 계산
        const categoryCounts = programList.reduce((acc, program) => {
            const category = program.PG_CATEGORY;
            if (category) {
                acc[category] = (acc[category] || 0) + 1;
            }
            return acc;
        }, {});

        // categoryCounts가 비어 있는지 확인
        if (Object.keys(categoryCounts).length === 0) {
            // 처리할 데이터가 없을 때의 처리
            return;
        }

        // 차트에 사용할 데이터 포맷으로 변환
        const chartData = Object.keys(categoryCounts).map((category) => ({
            name: category,
            value: categoryCounts[category],
        }));

        setChartData(chartData);
    }, [programList]);

    // 차트에 사용할 색상 정의
    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div>
            <h4>카테고리별 프로그램</h4>
            <PieChart width={600} height={600} >
                <Pie
                    data={data}
                    cx={260} // 가로 중심 위치 조절
                    cy={300} // 세로 중심 위치 조절
                    labelLine={false}
                    label={(entry) => entry.name}
                    outerRadius={200}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data && data.map((category, index) => (
                        <Cell key={`cell-${category}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, '프로그램 수']} />
            </PieChart>
        </div>
    );
};

export default ProgramChart;
