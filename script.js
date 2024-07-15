const TITLE_NAME = "sanket patil"
const TITLE_DESG = "sse <span id=\"at_sym\">@</span><img id=\"company-logo\">"

let interval
// setTimeout(()=>{interval = setInterval(animateTitle, 100)},5000)

const title = document.getElementsByClassName("header")[0]
console.log("INNER: "+title.innerHTML.toString().substring(0,-1))
let titleValue = title.innerHTML
let isReducing = true
let changingValue = titleValue

const animateSeq = new Map([
    [TITLE_NAME,TITLE_DESG],
    [TITLE_DESG,TITLE_NAME]
])
let index = changingValue.length - 1
function animateTitle(){
    console.log(changingValue)
    console.log('isRed '+isReducing)
    console.log('i '+index)
    if(isReducing){
        if(index >= 0){
            changingValue = reduceLengthByOne(changingValue,index)
            console.log("changed "+changingValue)
            title.innerHTML = changingValue
            index = changingValue.length - 1
        }else{
            isReducing = !isReducing
            changingValue = ''
            titleValue = animateSeq.get(titleValue)
            index = -1
        }
    }
    else{
        if(index < titleValue.length){
            changingValue = addLengthByOne(changingValue, titleValue, index)
            title.innerHTML = changingValue
            index = changingValue.length + 1
        }else{
            clearInterval_()
            isReducing = !isReducing
            index = changingValue.length - 1
            // console.log('SHIFT: '+changingValue)
            // console.log('MAP: '+animateSeq.get(changingValue))
            // titleValue = animateSeq.get(titleValue)
            // changingValue = titleValue
            setTimeout(()=>{interval = setInterval(animateTitle, 150)},5000)
        }
    }
}

function clearInterval_(){
    clearInterval(interval)
}

function reduceLengthByOne(str,index){
    if(index < 0) return ' '
    if(str.endsWith('<img id="company-logo">')){
        return str.replace('<img id="company-logo">','')
    }
    if(str.endsWith('<span id="at_sym">@</span>')){
        return str.replace('<span id="at_sym">@</span>','')
    }
    return str.substring(0,index)
}

function addLengthByOne(str,original,index){
    if(index == original.length) return original
    if(str.endsWith('sse ')){
        return str+'<span id="at_sym">@</span>'
    }
    if(str.endsWith('<span id="at_sym">@</span>')){
        return str+'<img id="company-logo">'
    }
    return original.substring(0,index+1)
}



const listOfNavItems = document.getElementsByClassName('navigation-item')
console.log(listOfNavItems)
for(let i=0;i<listOfNavItems.length;i++){
    let navItem = listOfNavItems[i]
    console.log(navItem)
    navItem.addEventListener('click',onClickNavItem);
}

function onClickNavItem(event){
    const navItem = event.srcElement || event.target
    console.log("2 "+navItem)
    navItem.style.color = "#17bffc"
    navItem.style.fontWeight = "bold"
    if(navItem.innerHTML == "resume"){
        open("https://docs.google.com/document/d/1RPzjqr9xZcL5hgYytAu8WZdLEp2PqOdAKt8NpztuXlA/edit?usp=drive_link")
    }
    for(let i=0;i<listOfNavItems.length;i++){
        let navItem_ = listOfNavItems[i]
        if(navItem_.innerHTML != navItem.innerHTML){
            navItem_.style.color = "black"
            navItem_.style.fontWeight = "200"
        }
    }
}


const listOfRoles = document.getElementsByClassName('role')
// console.log(listOfNavItems)
for(let i=0;i<listOfRoles.length;i++){
    let item = listOfRoles[i]
    item.addEventListener('click',onClickRole);
}

function onClickRole(event){
    const item = (event.srcElement || event.target).parentElement
    if(item.className == 'role'){
        showRoleContent(item.id)
        item.style.backgroundColor = "#17bffc"
        item.style.color = "white"
    for(let i=0;i<listOfRoles.length;i++){
        let item_ = listOfRoles[i]
        if(item.getElementsByClassName('role-name')[0].innerHTML != 
        item_.getElementsByClassName('role-name')[0].innerHTML){
            item_.style.backgroundColor = "white"
            item_.style.color = "black"
        }
    }
    }
}

showRoleContent('rl_sse_paytm')

function showRoleContent(roleId){
    console.log("ROLE ID: "+roleId)
    let contentId;
    if(roleId == 'rl_sse_paytm'){
        contentId = 'cnt_sse_paytm'
    }
    if(roleId == 'rl_se_paytm'){
        contentId = 'cnt_se_paytm'
    }
    const listOfRoleContents = document.getElementsByClassName('role-content')
    for(let i=0;i<listOfRoleContents.length;i++){
        let item = listOfRoleContents[i]
        if(item.id != contentId){
            item.style.display = "none"
        }
    }
    document.getElementById(contentId).style.display = "block"
}