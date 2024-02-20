import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getEmpList, setDetail } from '../../redux/empInfosSlice'

const SelectManager = ({ value, onChange }) => {
    const empList = useSelector(state => state.empInfos.value);
    const dispatch = useDispatch();

    // 직원 리스트 가져오기
    useEffect(() => {
        dispatch(getEmpList());
    }, [dispatch]);

    // 직원 선택 이벤트 핸들러
    const onSelectChange = (value) => {
        onChange(value);
        // 선택한 직원의 상세 정보 설정
        const selectedEmp = empList.find(emp => emp.E_NAME === value);
        dispatch(setDetail(selectedEmp));
    };

    // 직원 옵션 리스트 생성 및 정렬
    const empOptions = empList.map(emp => ({
        key: emp.E_NO,
        value: emp.E_NAME,
        label: emp.E_NAME,
    }));

    const sortOptions = (options) =>
        options.sort((a, b) => a.label.localeCompare(b.label));
    const sortedOptions = sortOptions(empOptions);

    return (
        <Select
            showSearch
            placeholder="직원 선택"
            optionFilterProp="children"
            onChange={onSelectChange}
            value={value}
            options={sortedOptions}
        />
    );
};

export default SelectManager;
