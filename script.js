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
    if(itemName && itemName != 'projects'){
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
    getFirstClass('content-area').style.width = isSmallScreen ? "95%": "660px";
    getFirstClass('content-area').style.overflowY = isSmallScreen ? "auto" : "hidden";
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
    onUpdatePrj();
    // console.log(`onResizeScreen called ${isSmallScreen}`)
}

//PROJECTS
var projectNext = new Map([
    ['prj_hms','prj_bk'],
    ['prj_bk','prj_bk']
]);
var projectPrev = new Map([
    ['prj_bk','prj_hms'],
    ['prj_hms','prj_hms']
]);
var currentProject = "";
const onInitProject = (prj_id)=>{
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
const onUpdatePrj = ()=>{
    const prjContents = document.getElementsByClassName('project-content');
    iterateHtmlCollection(prjContents, (prjContent)=>{
        const appDemo = getFirstClass('app-demo',prjContent);
        const appDemoDesc = getFirstClass('app-demo-desc',prjContent);
        if(appDemo){
            appDemo.style.display = isSmallScreen? "block" : "flex";
            appDemo.style.width = isSmallScreen? "100%" : "50%";
            // appDemo.style.height = isSmallScreen? "auto" : "100%";
            // appDemo.style.float = isSmallScreen? "none" : "left";
            appDemoDesc.style.display = isSmallScreen? "block" : "flex";
            appDemoDesc.style.width = isSmallScreen? "100%" : "50%";
            appDemoDesc.style.height = isSmallScreen? "auto" : "100%";
            // appDemoDesc.style.float = isSmallScreen? "none" : "right";
        }
    })
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

//FIRST TIME EXECUTION
onClickHeaderName();
// $(window).bind('resize', onResizeScreen);
onResizeScreen();
window.onresize = onResizeScreen;
addOnNavigationClick();
//default selection
onClickNavigationItemByName('about',!isSmallScreen);
onClickRole('rl_sse_paytm');
addOnNavIconClicked();
addOnRoleClicked();
initPrjSlide();
onInitProject('prj_hms');
initSocialLinks();