import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap'

const ApprovalSearchBar = () => {

  return (
    <>
    <InputGroup style={{alignItems: "center"}} size='sm'>
    <FontAwesomeIcon className='mx-2' icon={faMagnifyingGlass} />
      <DropdownButton
        variant="secondary"
        title="전체"
        id="input-group-dropdown-1"
      >
        <Dropdown.Item>전체</Dropdown.Item>
        <Dropdown.Item id="n_title">제목</Dropdown.Item>
        <Dropdown.Item id="n_content" >내용</Dropdown.Item>
        <Dropdown.Item id="e_name" >작성자</Dropdown.Item>
      </DropdownButton>
      <Form.Control aria-label="Text input with dropdown button"/>
      <Button variant="secondary">검색</Button>
    </InputGroup>
  </>
  )
}

export default ApprovalSearchBar