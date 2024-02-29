import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Menu, MenuItem, Sidebar, SubMenu, sidebarClasses } from 'react-pro-sidebar';

const SidebarCommon = ({list, handleMenu}) => {

  const handleClick = (e) =>{
    const menuTitle = e.target.innerText;
    if(handleMenu){
          handleMenu(menuTitle);
    }
  }

  return (
    <Sidebar
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: 'white',
          fontWeight: 'bold',
          fontSize: '0.85rem'
        },
      }}
      style={{border:'none'}}
    >
      <Menu>
        {list.map((item, index) => (
          // subMenuItems가 존재하는 경우에만 SubMenu를 생성
          'subMenuItems' in item ? (
            <SubMenu key={index} defaultOpen={item.isOpen} label={item.label} icon={<FontAwesomeIcon icon={item.icon}  />}>
              {item.subMenuItems.map((subMenuItem, subIndex) => (
                <MenuItem onClick={handleClick} key={subIndex} icon={<FontAwesomeIcon icon={subMenuItem.icon}  />}>
                  {subMenuItem.label}
                </MenuItem>
              ))}
            </SubMenu>
          ) : (
            // subMenuItems가 없는 경우는 MenuItem만 생성
            <MenuItem key={index} onClick={handleClick} icon={<FontAwesomeIcon icon={item.icon} />}>
                {item.label}
            </MenuItem>
          )
        ))}
      </Menu>
    </Sidebar>
  )
}

export default SidebarCommon