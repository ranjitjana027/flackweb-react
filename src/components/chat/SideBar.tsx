import * as React  from 'react';
import DehazeIcon from '@material-ui/icons/Dehaze';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import RateReviewIcon from '@material-ui/icons/RateReview';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { signout } from '../../features/auth/authSlice';
import { GroupSearch } from '../../features/groupSearch/GroupSearch';
import { Feedback } from '../Feedback';
import { Profile } from '../../features/auth/Profile';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';
import { useAppDispatch } from '../../app/hooks';
import '../../stylesheets/chat/sidebar.scss';

export default function SideBar(){
    const [menuSelected,setMenuSelected]=React.useState<string|null>(null);
    const dispatch=useAppDispatch();

    const menuItems: [string,string,OverridableComponent<SvgIconTypeMap<{}, "svg">>][]=[
        ['Me','View Profile',AccountCircleIcon],
        ['New Group', 'Join a new group', GroupAddIcon],
        ['Feedback', 'Write to us', RateReviewIcon]
    ];

    const handleClick=(l:string,e:React.MouseEvent<HTMLLIElement>)=>{
        setMenuSelected(l);
    }

    const closeSidebar=({target}: React.MouseEvent<HTMLDivElement>)=>{
        if((target as HTMLElement).classList.contains('sidebar')){
            (target as HTMLElement).classList.add('hidden');
            setMenuSelected(null);
        }
    }
    const toggleSidebar=()=>{
        const target: HTMLElement|null=document.querySelector('#sidebar');
        if(target != null){
            if(target.classList.contains('hidden')){
                target.classList.remove('hidden');
            }
            else{
                target.classList.add('hidden');
                setMenuSelected(null);
            }
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
                        menuItems.map(([label,title,Icon]:[string,string,OverridableComponent<SvgIconTypeMap<{}, "svg">>],i)=>(
                            <li
                            key={i}
                            className={menuSelected===label?"menubar-item active":"menubar-item"}
                            title={title}
                            onClick={(e)=>handleClick(label,e)} >
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

                {menuSelected==="Me" && <Profile active={true} /> }
                { menuSelected==="New Group" && <GroupSearch active={true} toggleSidebar={toggleSidebar}/> }
                { menuSelected==="Feedback" && <Feedback active={true} /> }
            </div>


        </div>
    );
}
