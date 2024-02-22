import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

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
        const data = Object.keys(categoryCounts).map((category) => ({
            category,
            '프로그램 수': categoryCounts[category],
        }));

        setChartData(data);
    }, [programList]);

    return (
        <div>
            <h4>카테고리별 프로그램</h4>
            <BarChart width={450} height={400} data={data}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="프로그램 수" fill="rgba(75,192,192,0.6)" />
            </BarChart>
        </div>
    );
};

export default ProgramChart;
