import * as React  from 'react';
import { signout } from '../../features/auth/authSlice';
import { GroupSearch } from '../../features/groupSearch/GroupSearch';
import { Feedback } from '../Feedback';
import { Profile } from '../../features/auth/Profile';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';
import { useAppDispatch } from '../../app/hooks';
import { ArrowBackIcon, CrossIcon } from '../../utils/Icons';
import DehazeIcon from '@material-ui/icons/Dehaze';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import RateReviewIcon from '@material-ui/icons/RateReview';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import '../../stylesheets/chat/sidebar.scss';


export default function SideBar(){
    const [menuSelected,setMenuSelected]=React.useState<string>('');
    const dispatch=useAppDispatch();

    const menuItems: [string,string,OverridableComponent<SvgIconTypeMap<{}, "svg">>][]=[
        ['Me','View Profile',AccountCircleIcon],
        ['New Group', 'Join a new group', GroupAddIcon],
        ['Feedback', 'Write to us', RateReviewIcon]
    ];

    const handleClick=(l:string,e:React.MouseEvent<HTMLElement>)=>{
        setMenuSelected(l);
        const target: HTMLElement|null=document.querySelector('#sidebar');
        if(target !== null){
            if(l===''){
                target.classList.remove('show-sidebar-content');
            }
            else{
                target.classList.add('show-sidebar-content');
            }
        }
    }

    const closeSidebar=({target}: React.MouseEvent<HTMLDivElement>)=>{
        if((target as HTMLElement).classList.contains('sidebar')){
            (target as HTMLElement).classList.add('hidden');
            setMenuSelected('');
        }
    }
    const toggleSidebar=()=>{
        const target: HTMLElement|null=document.querySelector('#sidebar');
        if(target !== null){
            if(target.classList.contains('hidden')){
                target.classList.remove('hidden');
            }
            else{
                target.classList.add('hidden');
                setMenuSelected('');
                target.classList.remove('show-sidebar-content');
            }
        }
    }


    return (
        <>
            <div className="expand-menubar">
                <div className="menu-icon">
                    <DehazeIcon
                    onClick={toggleSidebar}/>
                </div>
            </div>
            <div
            id="sidebar"
            className="sidebar  hidden"
            onClick={closeSidebar} >
                <div className="menubar">
                    <div
                    className="close-menubar"
                    title="Close"
                    onClick={toggleSidebar} >
                        <CrossIcon/>
                    </div>
                    <ul>
                        {
                            menuItems.map(([label,title,Icon]:[string,string,OverridableComponent<SvgIconTypeMap<{}, "svg">>],i)=>(
                                <li
                                key={i}
                                className={menuSelected===label?"menubar-item active":"menubar-item"}
                                title={title}
                                onClick={(e)=>handleClick(label,e)} >
                                    <div>
                                        <Icon/>
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
                                <PowerSettingsNewIcon/>
                            </div>
                            <div className="menubar-label">
                                Logout
                            </div>
                        </li>
                    </ul>
                    <div
                    style={{
                        position:'absolute',
                        textAlign:'center',
                        width:'100%',
                        bottom:'5px',
                        cursor:'default',
                        fontSize:'x-small'
                    }}>
                        Version 2.0.2021
                    </div>
                </div>
                <div className="sidebar-content">
                    <header>
                        <div 
                        className="icon" 
                        title="Go back"
                        onClick={(e)=>handleClick('',e)} >
                            <ArrowBackIcon/>
                        </div>
                        <div className="headline">
                            {menuSelected}
                        </div>
                    </header>
                    
                    {menuSelected==="Me" && <Profile/> }
                    { menuSelected==="New Group" && <GroupSearch toggleSidebar={toggleSidebar}/> }
                    { menuSelected==="Feedback" && <Feedback/> }
                </div>
            </div>


        </>
    );
}
