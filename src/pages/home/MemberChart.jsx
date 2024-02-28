import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, Label } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const MemberChart = ({ memberList }) => {
    console.log(memberList);

    // Gender 별로 데이터 카운트
    const genderCount = memberList.reduce((count, member) => {
        const gender = member.CLIENT_GENDER || 'Unknown';
        count[gender] = (count[gender] || 0) + 1;
        return count;
    }, {});

    // 전체 인원 수
    const totalMembers = Object.values(genderCount).reduce((sum, count) => sum + count, 0);

    // 데이터 포맷 변경 -> 차트에 표시되게끔 변경
    const data = Object.entries(genderCount).map(([gender, count]) => ({
        name: gender,
        value: count,
        percentage: ((count / totalMembers) * 100).toFixed(2), 
    }));

    const onPieEnter = (entry) => {
        console.log('onPieEnter', entry);
    };

    return (
        <>
            <PieChart width={1000} height={500} onMouseEnter={onPieEnter}> {/* 여기를 조정했습니다. */}
                <Pie
                    data={data}
                    cx={500} /* 중심 X 좌표도 조정하여 차트를 중앙에 위치시킵니다. */
                    cy={250} /* 중심 Y 좌표도 조정하여 차트를 중앙에 위치시킵니다. */
                    innerRadius={120} /* 내부 반지름 크기 조정 */
                    outerRadius={200} /* 외부 반지름 크기 조정 */
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    <Label
                        value={`총인원: ${totalMembers}명`}
                        position="center"
                        fill="#8884d8"
                    />
                </Pie>
                <Tooltip formatter={(value) => [`${value}명`, `${((value / totalMembers) * 100).toFixed(1)}%`]} />
                <Legend />
            </PieChart>
        </>
    );
};

export default MemberChart;
