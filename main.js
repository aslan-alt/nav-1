const $sitList = $('.siteList')
const $lastLi = $sitList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
let hashList = xObject || [
    { log: 'https://i.ibb.co/0nz0DZ2/afcun.jpg', url: 'https://www.acfun.cn', type: 'img' },
    { log: 'https://i.ibb.co/M9k3vB2/bilibli.jpg', url: 'https://bilibili.com', type: 'img' },
    { log: 'https://i.ibb.co/c1nQQbW/github.png', url: 'https://github.com', type: 'img' },
    { log: 'https://i.ibb.co/SPZNQdm/youtube-logo.png', url: 'https://www.youtube.com', type: 'img' },
]

const removeUrlPart = (string) => {
    let newString = string.replace('http://', '').replace('https://', '').replace('www.', '').replace('http:', '').replace('https:', '').replace('://')
    return newString
}

const render = () => {
    hashList.forEach((node, index) => {
        let urlShort = removeUrlPart(node.url)
        if (node.type === 'text') {
            let $li = $(`
            <li>
                <div class="site">
                    <div class="log">
                        ${urlShort.slice(0, 1).toLocaleUpperCase()}
                    </div>
                    <div class="link">${urlShort}</div>
                    <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div> 
            </li>
            `).insertBefore($lastLi)
            $li.on('click', '.close', (e) => {
                e.stopPropagation()
                hashList.splice(index, 1)
                $sitList.find('li:not(.last)').remove()
                render()
            })
            $li.on('click', () => {
                window.open(node.url, '_self')
            })
            $li.on(
                {
                    touchstart: function (e) {
                        // 长按事件触发  
                        timeOutEvent = setTimeout(function () {
                            timeOutEvent = 0;
                            const user = confirm("您确认要删除吗？")
                            if (user) {
                                hashList.splice(index, 1)
                                $sitList.find('li:not(.last)').remove()
                                render()
                            }
                        }, 400);
                        //长按400毫秒   
                        // e.preventDefault();    
                    },
                    touchmove: function () {
                        clearTimeout(timeOutEvent);
                        timeOutEvent = 0;
                    },
                    touchend: function () {
                        clearTimeout(timeOutEvent);
                        if (timeOutEvent != 0) {
                            // 点击事件  
                            // location.href = '/a/live-rooms.html';  
                            window.open(node.url, '_self')
                        }
                        return false;
                    }
                }
            )

        } else {
            let $li = $(`
            <li>
                <div class="site">
                    <div class="log">
                        <img src="${node.log}" alt="网站图标">
                    </div>
                    <div class="link">${urlShort}</div>
                    <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div>
            </li>
                    `).insertBefore($lastLi)
            $li.on('click', '.close', (e) => {
                e.stopPropagation()
                hashList.splice(index, 1)
                $sitList.find('li:not(.last)').remove()
                render()
            })
            $li.on('click', () => {
                window.open(node.url, '_self')
            })
            $li.on(
                {
                    touchstart: function (e) {
                        // 长按事件触发  
                        timeOutEvent = setTimeout(function () {
                            timeOutEvent = 0;
                            const user = confirm("您确认要删除吗？")
                            if (user) {
                                hashList.splice(index, 1)
                                $sitList.find('li:not(.last)').remove()
                                render()
                            }
                        }, 400);
                        //长按400毫秒   
                        // e.preventDefault();    
                    },
                    touchmove: function () {
                        clearTimeout(timeOutEvent);
                        timeOutEvent = 0;
                    },
                    touchend: function () {
                        clearTimeout(timeOutEvent);
                        if (timeOutEvent != 0) {
                            // 点击事件  
                            // location.href = '/a/live-rooms.html';  
                            window.open(node.url, '_self')
                        }
                        return false;
                    }
                }
            )
        }
    })
}
render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请输入你要添加的网址')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hashList.push(
            { log: (url), url: url, type: 'text' },
        )
        $sitList.find('li:not(.last)').remove()
        render()

    })
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashList)
    localStorage.setItem('x',string)
}
$(document).on('keypress', e => {
    console.log(e.key)
    const { key } = e
    for (let i = 0; i < hashList.length; i++) {
        console.log(hashList[i].url)
        if (hashList[i].type === 'text' && removeUrlPart(hashList[i].log).slice(0, 1) === key) {
            window.open(hashList[i].url, '_self')
        }
    }
})
