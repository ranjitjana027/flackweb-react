import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DehazeIcon from '@material-ui/icons/Dehaze';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import RateReviewIcon from '@material-ui/icons/RateReview';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { signout } from '../../features/auth/authSlice';
import { GroupSearch } from '../../features/groupSearch/GroupSearch';
import { Feedback } from '../Feedback';
import { Profile } from '../Profile';
import '../../stylesheets/chat/sidebar.scss';

export default function SideBar(props){
    const [menuSelected,setMenuSelected]=useState(null);
    const dispatch=useDispatch();

    const menuItems=[
        ['Me','View Profile',AccountCircleIcon],
        ['New Group', 'Join a new group', GroupAddIcon],
        ['Feedback', 'Write to us', RateReviewIcon]
    ];

    const handleClick=(l,e)=>{
        setMenuSelected(l);
    }

    const closeSidebar=({target})=>{
        if(target.classList.contains('sidebar')){
            target.classList.add('hidden');
            setMenuSelected(null);
        }
    }
    const toggleSidebar=()=>{
        const target=document.querySelector('#sidebar');
        if(target.classList.contains('hidden')){
            target.classList.remove('hidden');
        }
        else{
            target.classList.add('hidden');
            setMenuSelected(null);
        }
    }

    return (
        <div className="">
            <div className="expand-menubar">
                <DehazeIcon
                fontSize="large"
                onClick={toggleSidebar}/>
                <div style={{
                    flex:'1 1 100px',
                    textAlign: 'center',
                    fontSize:'large'
                }}>
                    FLACK
                </div>
            </div>
            <div
            id="sidebar"
            className="sidebar  hidden"
            onClick={closeSidebar} >
                <ul className="menubar">
                    <div className="logo">
                    FLACK
                    </div>
                    {
                        menuItems.map(([label,title,Icon],i)=>(
                            <li
                            key={i}
                            className={menuSelected===label?"menubar-item active":"menubar-item"}
                            title={title}
                            onClick={handleClick.bind(this,label)} >
                                <div>
                                    <Icon fontSize="large" />
                                </div>
                                <div className="menubar-label">
                                    {label}
                                </div>
                            </li>
                        ))
                    }
                    <li
                    className="menubar-item"
                    title="Logout"
                    onClick={()=>dispatch(signout())} >
                        <div>
                            <PowerSettingsNewIcon fontSize="large" />
                        </div>
                        <div className="menubar-label">
                            Logout
                        </div>
                    </li>
                    <li
                    className="close-menubar"
                    onClick={toggleSidebar} >
                        Close
                    </li>
                    <div
                    style={{
                        position:'absolute',
                        textAlign:'center',
                        width:'100%',
                        bottom:'5px',
                        cursor:'default'
                    }}>
                        Version 2.0.2021
                    </div>
                </ul>
                <div className="sidebar-content" style={{display:menuSelected==null?'none':''}}>
                    <Profile toggleSidebar={toggleSidebar} active={menuSelected==="Me"} />
                    <GroupSearch toggleSidebar={toggleSidebar} active={menuSelected==="New Group"} />
                    <Feedback toggleSidebar={toggleSidebar} active={menuSelected==="Feedback"} />
                </div>
                {/* { menuSelected==="Me" && <Profile toggleSidebar={toggleSidebar} /> }
                { menuSelected==="New Group" && <GroupSearch toggleSidebar={toggleSidebar}/> }
                { menuSelected==="Feedback" && <Feedback toggleSidebar={toggleSidebar} /> } */}
            </div>


        </div>
    );
}