const smallScreenMaxSize = 800;
const getIsSmallScreen = () => {return window.outerWidth <= smallScreenMaxSize};
var isSmallScreen = getIsSmallScreen();
const updateIsSmallScreen = () => {isSmallScreen = getIsSmallScreen()};
const getFirstClass = (className,element = document) => element.getElementsByClassName(className)[0];
const getFirstTag = (tagName,element = document) => element.getElementsByTagName(tagName)[0];
const iterateHtmlCollection = (collection,doForElement) => {
    for(let i=0;i<collection.length;i++){
        const item = collection[i];
        doForElement(item);
    }
};

//HEADER
const onClickHeaderName = () => {
    const headerName = document.getElementById('header-name');
    headerName.addEventListener('click',()=>{
        open("https://sanketpatil.me","_self");
    });
};
//NAVIGATION
const hideNavigation = (toHide) => {
    const navigation = getFirstClass('navigation')
    navigation.style.display = toHide ? "none" :"block"
};
const hideNavIcon = (toHide) => {
    const navMenuIconImg = getFirstTag('img',getFirstClass('nav-menu-icon'));
    navMenuIconImg.style.visibility = toHide ? "hidden" :"visible";
};
const hideNavMenu = (toHide) => {
    const navMenu = getFirstClass('nav-menu');
    navMenu.style.visibility = toHide ? "hidden" : "visible";
    isNavMenuOpen = !toHide;
};
var isNavMenuOpen = false;
const addOnNavIconClicked = () => {
    const navMenuIconImg = getFirstTag('img',getFirstClass('nav-menu-icon'));
    navMenuIconImg.addEventListener('click',() => {
        hideNavMenu(isNavMenuOpen);
    });
};
//updates content area
const onNavigateContent = (contentId) => {
    const contentList = getFirstClass('content-area')?.children;
    if(!contentList) return;
    iterateHtmlCollection(contentList,(item) => {
        item.style.display = (item.id == contentId) ? "block" : "none";
    });
};
var selectedNavItemName;
//changes nav item and navigates
const onClickNavigationItemByName = (itemName,isTopNav = true) => {
    if(itemName){
        const html = document.getElementsByTagName('html')[0];
        if(itemName == "projects"){
            html.style.setProperty('position', 'fixed', 'important');
        }else{
            html.style.position = "static";
        }
        const body = document.getElementsByTagName('body')[0];
        if(itemName == "projects"){
            body.style.setProperty('position', 'fixed', 'important');
        }else{
            body.style.position = "static";
        }
        const scrollHint = getFirstClass('scroll_hint');
        scrollHint.style.display = itemName == "projects" ? "block" : "none";
        selectedNavItemName = itemName;
        const className = isTopNav ? 'navigation-item' : 'nav-menu-item';
        const navItems = document.getElementsByClassName(className);
        iterateHtmlCollection(navItems,(item) => {
            item.style.color = (item.innerHTML == itemName) ? "#17bffc" : "black";
            item.style.fontWeight = (item.innerHTML == itemName) ? "700" : "normal";
        });
        onNavigateContent(itemName);
        if(!isTopNav){
            hideNavMenu(true);
        }
    }
};
//updates after nav item clicked
const onClickNavigationItemForEvent = (event,isTopNav = true) => {
    const navItem = event.srcElement || event.target;
    onClickNavigationItemByName(navItem?.innerHTML,isTopNav);
};
//sets listener for nav item
const addOnNavigationClick = () => {
    const navItemsTopNav = document.getElementsByClassName('navigation-item');
    iterateHtmlCollection(navItemsTopNav,(item) => {
        item.addEventListener('click',(event)=>{onClickNavigationItemForEvent(event,true)});
    });
    const navItemsMenuNav = document.getElementsByClassName('nav-menu-item');
    iterateHtmlCollection(navItemsMenuNav,(item) => {
        item.addEventListener('click',(event)=>{onClickNavigationItemForEvent(event,false)});
    });
};

//EXPERIENCE
const roleContentIdMapping = new Map([
    ['rl_sse_paytm','cnt_sse_paytm'],
    ['rl_se_paytm','cnt_se_paytm']
]);
var selectedRoleId = 'rl_sse_paytm';
const showRoleContent = (roleId) => {
    const role =  document.getElementById(roleId).parentElement;
    const roleContainer = getFirstClass('role-container',role);
    const contentId = roleContentIdMapping.get(roleContainer.id);
    const roleContents = document.getElementsByClassName('role-content');

    const roleContentContainer = getFirstClass('role-content-container');
    roleContentContainer.style.display = isSmallScreen ? "none" : "block";
    const roleNameContainer = getFirstClass('role-name-container');
    roleNameContainer.style.display = isSmallScreen ? "block" : "inline-block";
    roleNameContainer.style.borderRight = isSmallScreen ? "none" : "2px solid #17bffc";
    roleNameContainer.style.width = isSmallScreen ? "100%" : null;
    roleNameContainer.style.textAlign = isSmallScreen ? "center" : null;

    if(isSmallScreen){
        const roles = document.getElementsByClassName('role')
        iterateHtmlCollection(roles, (role_)=>{
            const roleCnt = getFirstClass('role-cnt',role_);
            const roleContainer_ = getFirstClass('role-container',role_);
            const contentId_ = roleContentIdMapping.get(roleContainer_.id);
            roleCnt.innerHTML = document.getElementById(contentId_).innerHTML;
        })
        
        // const 
        // if(selectedRoleId != roleId){
        //     selectedRoleId = roleId;
        // }else{
        //     // selectedRoleId = ""
        // }

    }else{
        iterateHtmlCollection(roleContents, (roleContent)=>{
            roleContent.style.display = (contentId == roleContent.id) ? "block" : "none";
        });
        const roleCnts = document.getElementsByClassName('role-cnt');
        iterateHtmlCollection(roleCnts, (roleCnt) => {
            roleCnt.innerHTML = "";
        });
        selectedRoleId = roleId;
    }
};
const onClickRole = (roleId) => {
    if(!roleId) return;
    const roleContainer = document.getElementById(roleId);
    const roleName = getFirstClass('role-name',roleContainer);
    const roleDur = getFirstClass('role-dur',roleContainer);
    const role = roleContainer.parentElement;
    const roles = document.getElementsByClassName('role');

    showRoleContent(roleId);
    if(isSmallScreen){
        iterateHtmlCollection(roles,(role)=>{
            const roleContainer = getFirstClass('role-container',role);
            roleContainer.style.color = "#17bffc";
            roleContainer.style.backgroundColor = "white";
        });
    }else{
        iterateHtmlCollection(roles,(role)=>{
            const roleContainer = getFirstClass('role-container',role);
            roleContainer.style.color = (selectedRoleId == roleContainer.id)?"white":"black";
            roleContainer.style.backgroundColor = (selectedRoleId == roleContainer.id)?"#17bffc":"white";
        });
    }
};
const onClickRoleForEvent = (event) => {
    const clickedElement = event.srcElement || event.target;
    let roleContainer = (clickedElement.className != 'role-container')?
    clickedElement.parentElement :clickedElement;
    onClickRole(roleContainer.id);
}
const addOnRoleClicked = () => {
    const roleContainers = document.getElementsByClassName('role-container');
    iterateHtmlCollection(roleContainers, (roleContainer)=>{
        roleContainer.addEventListener('click',onClickRoleForEvent);
    });
};

const updateContentArea = () => {
    getFirstClass('content-container').style.height = isSmallScreen ? "100%": "80%";
    getFirstClass('content-area').style.width = isSmallScreen ? "95%": "660px";
    getFirstClass('content-area').style.overflowY = isSmallScreen ? "auto" : "hidden";
};
const onUpdateExperience = () => {
    const roleCntContainers = document.getElementsByClassName('role-desc');
    iterateHtmlCollection(roleCntContainers, (roleCntCntr)=>{
        roleCntCntr.style.fontSize = isSmallScreen ? "1.3rem" : "1.0rem";
        const ul = roleCntCntr.getElementsByTagName('ul')[0];
        // ul.style.listStyleType = isSmallScreen ? "none" : "disc";
        ul.style.marginBlockStart = isSmallScreen ? "0" : "1em";
        ul.style.paddingInlineStart = isSmallScreen ? "20px" : "40px";
        const li = roleCntCntr.getElementsByTagName('li');
        iterateHtmlCollection(li,(item)=>{
            item.style.paddingTop = isSmallScreen ? "10px" : "0px";
            item.style.paddingBottom = isSmallScreen ? "10px" : "0px";
            item.style.justifyContent = isSmallScreen ? "center" : "inherit";
        })
    });

    const roleCnts = document.getElementsByClassName('role-cnt');
    iterateHtmlCollection(roleCnts, (roleCnt) => {
        roleCnt.style.fontSize = isSmallScreen ? "1.3rem" : "1.0rem";
    })
    const roleContainers = document.getElementsByClassName('role-container');
    iterateHtmlCollection(roleContainers, (roleContainer) => {
        roleContainer.style.fontSize = isSmallScreen ? "1.3rem" : "1.0rem";
    })
    const roleSkills = document.getElementsByClassName('role-skills');
    iterateHtmlCollection(roleSkills, (roleSkill) => {
        roleSkill.style.textAlign = "left";
        roleSkill.style.paddingInlineStart = isSmallScreen ? "20px" : "40px";
    })
};
const onResizeScreen = () => {
    updateIsSmallScreen();
    updateContentArea();
    hideNavIcon(!isSmallScreen);
    if(!isSmallScreen){
        hideNavMenu(true);
    }
    onClickNavigationItemByName(selectedNavItemName,!isSmallScreen);
    hideNavigation(isSmallScreen);
    if(!isSmallScreen){
        onClickRole(!selectedRoleId?"rl_sse_paytm":selectedRoleId);
    }else{
        onClickRole(selectedRoleId);
    }
    onUpdateExperience();
    onUpdatePrj();
    // console.log(`onResizeScreen called ${isSmallScreen}`)
}

//PROJECTS
var projectNext = new Map([
    ['prj_hms','prj_bk'],
    ['prj_bk','prj_lnkdn'],
    ['prj_lnkdn','prj_lnkdn']
]);
var projectPrev = new Map([
    ['prj_lnkdn','prj_bk'],
    ['prj_bk','prj_hms'],
    ['prj_hms','prj_hms']
]);
var currentProject = "";
const onInitProject = (prj_id)=>{
    if(prj_id == "prj_lnkdn"){
        const prjContents = document.getElementsByClassName('project-content')
        iterateHtmlCollection(prjContents, (item)=>{
            item.style.display = "block";
            item.style.width = "100%";
            const demoImg = getFirstClass('app-demo-img',item);
            demoImg.style.width = "100%";
            demoImg.style.height = "auto";
        });
    }else{
        const prjContents = document.getElementsByClassName('project-content')
        iterateHtmlCollection(prjContents, (item)=>{
            item.style.display = isSmallScreen? "block" : "inline-block";
            item.style.width = isSmallScreen? "100%" : "49%";
            const demoImg = getFirstClass('app-demo-img',item);
            demoImg.style.width = "auto";
            demoImg.style.height = "95%";
        });
    }
    if(currentProject == prj_id) return;
    currentProject = prj_id;
    const prjList = document.getElementsByClassName('project')
    iterateHtmlCollection(prjList, (item)=>{
        console.log("list",item)
        item.style.display = (item.id == prj_id) ? "inline-block": "none";
    })
}
const onNextProject = ()=>{
    onInitProject(projectNext.get(currentProject));
};
const onPrevProject = ()=>{
    onInitProject(projectPrev.get(currentProject));
};
const initPrjSlide = ()=>{
    const prev = getFirstClass('round-button',document.getElementById('prev'));
    prev.addEventListener('click', onPrevProject);
    const next = getFirstClass('round-button',document.getElementById('next'));
    next.addEventListener('click', onNextProject);
};
const updateRoundButton = ()=>{
    const prev = getFirstClass('round-button',document.getElementById('prev'));
    prev.style.borderRadius = isSmallScreen ? "0 50% 50% 0" : "50%";
    const next = getFirstClass('round-button',document.getElementById('next'));
    next.style.borderRadius = isSmallScreen ? "50% 0 0 50%" : "50%";
};
const onUpdatePrj = ()=>{
    onInitProject(currentProject);
    // const prjContents = document.getElementsByClassName('project-content');
    // iterateHtmlCollection(prjContents, (prjContent)=>{
    //     prjContent.style.display = isSmallScreen? "block" : "inline-block";
    //     prjContent.style.width = isSmallScreen? "100%" : "49%";
    // });
    updateRoundButton();
}

//ABOUT
const initSocialLinks = ()=>{
    const socialMail = document.getElementById('social_mail');
    socialMail.addEventListener('click',()=>{
        open('mailto://sanketpatil1309@gmail.com');
    });
    const socialLnkdn = document.getElementById('social_lnkdn');
    socialLnkdn.addEventListener('click',()=>{
        open('https://www.linkedin.com/in/sanket-patil-dev/');
    });
}
var prjName = "";
const onLoadProjects = function () {
    // Get the current URL
    const currentUrl = window.location.href;
    
    // You can also perform actions based on the URL
    if (currentUrl.includes("/?project=")) {
        prjName = currentUrl.split("/?project=")[1];
    }
};
onLoadProjects();

//FIRST TIME EXECUTION
onClickHeaderName();
// $(window).bind('resize', onResizeScreen);
onResizeScreen();
window.onresize = onResizeScreen;
addOnNavigationClick();
//default selection
if(prjName == ""){
    onClickNavigationItemByName('projects',!isSmallScreen);
}else{
    onClickNavigationItemByName('projects',!isSmallScreen);
}
onClickRole('rl_sse_paytm');
addOnNavIconClicked();
addOnRoleClicked();
initPrjSlide();
if(prjName == "hms"){
    onInitProject('prj_hms');
}else if(prjName == "book"){
    onInitProject('prj_bk');
}else if(prjName == "clg_netw"){
    onInitProject('prj_lnkdn');
}
else{
    onInitProject('prj_hms');
}
initSocialLinks();