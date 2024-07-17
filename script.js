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

const onResizeScreen = () => {
    updateIsSmallScreen()
    hideNavIcon(!isSmallScreen)
    if(!isSmallScreen){
        hideNavMenu(true)
    }
    onClickNavigationItemByName(selectedNavItemName,!isSmallScreen)
    hideNavigation(isSmallScreen)
    // console.log(`onResizeScreen called ${isSmallScreen}`)
}

//FIRST TIME EXECUTION
onResizeScreen()
addOnNavigationClick()
//default selection
onClickNavigationItemByName('experience',!isSmallScreen)
addOnNavIconClicked()