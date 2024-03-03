import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Label } from 'recharts';
import styles from './programboard.module.css'; // 적절한 CSS 파일을 import

const ProgramChart = ({ programList }) => {
    const [data, setChartData] = useState([]);
    const [totalPrograms, setTotalPrograms] = useState(0);

    useEffect(() => {
        if (!programList || programList.length === 0) {
            return;
        }

        // 각 카테고리의 프로그램 수 계산
        const categoryCounts = programList.reduce((acc, program) => {
            const category = program.PG_CATEGORY;
            if (category) {
                acc[category] = (acc[category] || 0) + 1;
            }
            return acc;
        }, {});

        if (Object.keys(categoryCounts).length === 0) {
            return;
        }

        // 데이터 포맷 변경
        const chartData = Object.keys(categoryCounts).map((category) => ({
            name: category,
            value: categoryCounts[category],
        }));

        setChartData(chartData);

        // 전체 프로그램 갯수 계산
        const totalProgramsCount = Object.values(categoryCounts).reduce((total, count) => total + count, 0);
        setTotalPrograms(totalProgramsCount);
    }, [programList]);

    // 차트에 사용할 색상 정의
    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className={styles.chartContainer}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%" cy="50%"
                        innerRadius={50} 
                        outerRadius={120} 
                        labelLine={true}
                        label={(entry) => entry.name}
                        fill="#8884d8"
                        dataKey="value"
                        paddingAngle={-1}
                        animationBegin={0} // 애니메이션 시작 시간(ms), 0으로 설정하면 초기 렌더링 시 시작
                        animationDuration={1500} // 애니메이션 지속 시간(ms)
                        animationEasing="ease-out" 
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        <Label
                            value={`총 : ${totalPrograms}개`}
                            position="center"
                            fill="#8884d8"
                        />
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, '프로그램 갯수']} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProgramChart;
