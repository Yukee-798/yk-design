// import React, { useState } from 'react';
// import Button from './components/Button/button'
// import RotatingCube from './animation/rotatingCube/rotatingCube';
// import SearchBar from './components/SearchBar/searchBar';
// import Dialog from './components/Dialog/dialog';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem'
import { useEffect, useRef } from "react";
import SearchBar from "./components/SearchBar/searchBar";
import './App.scss'
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'






export default function App() {
  const ref = useRef();

  return (
    <div className='App'>
      <Menu
        mode='vertical'
      >
        <MenuItem icon={<Icon icon={faSearch} />}>搜索</MenuItem>
        <MenuItem >2</MenuItem>
        <SubMenu title='subMenu'>
          <MenuItem>111</MenuItem>
          <MenuItem>222</MenuItem>
          <MenuItem>333</MenuItem>
        </SubMenu>
        <MenuItem >3</MenuItem>
      </Menu>
      <Menu
        // style={{ marginTop: '200px' }}
        mode='horizontal'
      >
        <MenuItem icon={<Icon icon={faSearch} />}>用户主页</MenuItem>
        <MenuItem>主页</MenuItem>
        <MenuItem>用户</MenuItem>
        <SubMenu title='4'>
          <MenuItem icon={<Icon icon={faSearch} />}>搜索</MenuItem>
          <MenuItem>2</MenuItem>
          <MenuItem>3</MenuItem>

        </SubMenu>
      </Menu>
    </div>

  )
}
