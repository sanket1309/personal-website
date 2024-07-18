const smallScreenMaxSize = 800
const getIsSmallScreen = () => {return window.outerWidth <= smallScreenMaxSize}
var isSmallScreen = getIsSmallScreen()
const updateIsSmallScreen = () => {isSmallScreen = getIsSmallScreen()}
const getFirstClass = (className,element = document) => element.getElementsByClassName(className)[0]
const getFirstTag = (tagName,element = document) => element.getElementsByTagName(tagName)[0]
const iterateHtmlCollection = (collection,doForElement) => {
    for(let i=0;i<collection.length;i++){
        const item = collection[i]
        doForElement(item)
    }
}

//NAVIGATION
const hideNavigation = (toHide) => {
    const navigation = getFirstClass('navigation')
    navigation.style.display = toHide ? "none" :"block"
}
const hideNavIcon = (toHide) => {
    const navMenuIconImg = getFirstTag('img',getFirstClass('nav-menu-icon'))
    navMenuIconImg.style.visibility = toHide ? "hidden" :"visible"
}
const hideNavMenu = (toHide) => {
    const navMenu = getFirstClass('nav-menu')
    navMenu.style.visibility = toHide ? "hidden" : "visible"
    isNavMenuOpen = !toHide
}
var isNavMenuOpen = false
const addOnNavIconClicked = () => {
    const navMenuIconImg = getFirstTag('img',getFirstClass('nav-menu-icon'))
    navMenuIconImg.addEventListener('click',() => {
        console.log("clicked")
        hideNavMenu(isNavMenuOpen)
    })
}
//updates content area
const onNavigateContent = (contentId) => {
    const contentList = getFirstClass('content-area')?.children
    if(!contentList) return
    iterateHtmlCollection(contentList,(item) => {
        item.style.display = (item.id == contentId) ? "block" : "none"
    })
}
var selectedNavItemName
//changes nav item and navigates
const onClickNavigationItemByName = (itemName,isTopNav = true) => {
    if(itemName){
        selectedNavItemName = itemName
        const className = isTopNav ? 'navigation-item' : 'nav-menu-item'
        const navItems = document.getElementsByClassName(className)
        iterateHtmlCollection(navItems,(item) => {
            item.style.color = (item.innerHTML == itemName) ? "#17bffc" : "black"
            item.style.fontWeight = (item.innerHTML == itemName) ? "700" : "normal"
        })
        onNavigateContent(itemName)
        if(!isTopNav){
            hideNavMenu(true)
        }
    }
}
//updates after nav item clicked
const onClickNavigationItemForEvent = (event,isTopNav = true) => {
    const navItem = event.srcElement || event.target
    onClickNavigationItemByName(navItem?.innerHTML,isTopNav)
}
//sets listener for nav item
const addOnNavigationClick = () => {
    const navItemsTopNav = document.getElementsByClassName('navigation-item')
    iterateHtmlCollection(navItemsTopNav,(item) => {
        item.addEventListener('click',(event)=>{onClickNavigationItemForEvent(event,true)})
    })
    const navItemsMenuNav = document.getElementsByClassName('nav-menu-item')
    iterateHtmlCollection(navItemsMenuNav,(item) => {
        item.addEventListener('click',(event)=>{onClickNavigationItemForEvent(event,false)})
    })
}

//EXPERIENCE
const roleContentIdMapping = new Map([
    ['rl_sse_paytm','cnt_sse_paytm'],
    ['rl_se_paytm','cnt_se_paytm']
])
var selectedRoleId = 'rl_sse_paytm'
const showRoleContent = (roleId) => {
    const role =  document.getElementById(roleId).parentElement
    const roleContainer = getFirstClass('role-container',role)
    const contentId = roleContentIdMapping.get(roleContainer.id)
    const roleContents = document.getElementsByClassName('role-content')

    const roleContentContainer = getFirstClass('role-content-container')
    roleContentContainer.style.display = isSmallScreen ? "none" : "block"
    const roleNameContainer = getFirstClass('role-name-container')
    roleNameContainer.style.display = isSmallScreen ? "block" : "inline-block"
    roleNameContainer.style.borderRight = isSmallScreen ? "none" : "2px solid #17bffc"
    roleNameContainer.style.width = isSmallScreen ? "100%" : null
    roleNameContainer.style.textAlign = isSmallScreen ? "center" : null

    if(isSmallScreen){
        const roleCnt = getFirstClass('role-cnt',role)
        roleCnt.innerHTML = (selectedRoleId != roleId) ? 
        document.getElementById(contentId).innerHTML: "";
        // const 
        if(selectedRoleId != roleId){
            selectedRoleId = roleId
        }else{
            // selectedRoleId = ""
        }

    }else{
        iterateHtmlCollection(roleContents, (roleContent)=>{
            roleContent.style.display = (contentId == roleContent.id) ? "block" : "none"
        })
        const roleCnts = document.getElementsByClassName('role-cnt')
        iterateHtmlCollection(roleCnts, (roleCnt) => {
            roleCnt.innerHTML = ""
        })
        selectedRoleId = roleId
    }
}
const onClickRole = (roleId) => {
    if(!roleId) return
    const roleContainer = document.getElementById(roleId)
    const roleName = getFirstClass('role-name',roleContainer)
    const roleDur = getFirstClass('role-dur',roleContainer)
    const role = roleContainer.parentElement
    const roles = document.getElementsByClassName('role')

    showRoleContent(roleId)
    if(isSmallScreen){
        iterateHtmlCollection(roles,(role)=>{
            const roleContainer = getFirstClass('role-container',role)
            roleContainer.style.color = (selectedRoleId == roleContainer.id)?"#17bffc":"black"
            roleContainer.style.backgroundColor = "white"
        });
    }else{
        iterateHtmlCollection(roles,(role)=>{
            const roleContainer = getFirstClass('role-container',role)
            roleContainer.style.color = (selectedRoleId == roleContainer.id)?"white":"black"
            roleContainer.style.backgroundColor = (selectedRoleId == roleContainer.id)?"#17bffc":"white"
        });
    }
}
const onClickRoleForEvent = (event) => {
    const clickedElement = event.srcElement || event.target
    let roleContainer = (clickedElement.className != 'role-container')?
    clickedElement.parentElement :clickedElement
    console.log("roleContainer: ",roleContainer)
    onClickRole(roleContainer.id)
}
const addOnRoleClicked = () => {
    const roleContainers = document.getElementsByClassName('role-container')
    iterateHtmlCollection(roleContainers, (roleContainer)=>{
        console.log("clicked "+roleContainer)
        roleContainer.addEventListener('click',onClickRoleForEvent)
    })
}

const updateContentAreaSize = () => {
    getFirstClass('content-area').style.width = isSmallScreen ? "95%": "70%";
}
const onResizeScreen = () => {
    updateIsSmallScreen()
    updateContentAreaSize()
    hideNavIcon(!isSmallScreen)
    if(!isSmallScreen){
        hideNavMenu(true)
    }
    onClickNavigationItemByName(selectedNavItemName,!isSmallScreen)
    hideNavigation(isSmallScreen)
    if(!isSmallScreen){
        onClickRole(!selectedRoleId?"rl_sse_paytm":selectedRoleId)
    }else{
        onClickRole(selectedRoleId)
    }
    // console.log(`onResizeScreen called ${isSmallScreen}`)
}

//FIRST TIME EXECUTION
onResizeScreen()
addOnNavigationClick()
//default selection
onClickNavigationItemByName('experience',!isSmallScreen)
onClickRole('rl_sse_paytm')
addOnNavIconClicked()
addOnRoleClicked()