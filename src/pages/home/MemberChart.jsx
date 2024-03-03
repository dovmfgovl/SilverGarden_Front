import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, Label, ResponsiveContainer } from 'recharts';

const COLORS = ['#794ff7', '#1153fc'];

const MemberChart = ({ memberList }) => {
    // console.log(memberList);

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
        <div style={{ width: '100%', height: '80%' }}>
            <ResponsiveContainer>
                <PieChart onMouseEnter={onPieEnter}> 
                    <Pie
                        data={data}
                        innerRadius={50} 
                        outerRadius={90} 
                        fill="#8884d8"
                        paddingAngle={1}
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
            </ResponsiveContainer>
        </div>
    );
};

export default MemberChart;
