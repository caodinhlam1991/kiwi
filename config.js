﻿exports.config = {
    modules: {
        0: 'Admin',
        1: 'File',
        2: 'Flag',
        3: 'Contact',
        4: 'Chat',
        5: 'Cart',
        6: 'Search',
        7: 'Bill',
        8: 'Coin',
        9: 'People',
        10: 'App',
        11: 'Home',
        12: 'Game',
        13: 'Content'
    },
    publicpath: ['/data', '/public'],
    port: 80,
    css: '/public/css',
    js: '/public/js',
    media: '/public/media',
    skin: '/public/media/images/skin',
    img: '/public/media/images/images',
    file: '/public/media/files',
    video: '/public/media/video',
    filedir: './data/media/files',
    imgdir: './data/media/images/images',
    videodir: './data/media/video',
    delimiter: ' - ',
    sitename: 'CAZS',
    title: 'Thiết kế web đẹp và an toàn, hoạt động tốt với các thiết bị di động',
    except: 'Thiết kế web đẹp và an toàn, hoạt động tốt với các thiết bị di động',
    keys: 'làm web tại nha trang, làm web ở nha trang, làm web nha trang, thiết kế web tại nha trang, thiết kế web ở nha trang',
    image: '/public/media/images/skin/logo1.png',
    link: "https://cazs.cf",
    fblink: 'https://www.facebook.com/wsup3.solution/',
    gglink: 'https://plus.google.com/b/105056636712153169891/105056636712153169891?hl=en',
    ttlink: 'https://twitter.com/Wsup31',
    gmapkey: 'AIzaSyAfFRRF86zarkE-959pngIPrWoeh_Degtw',
    pmtokens: '38b3507e-52aa-4ba2-9a7e-460d903165ef',
    region: 'VN-34',
    place: 'tp. Nha Trang',
    pos: '12.215494;109.193681',
    icbm: '12.215494, 109.193681',
    appid: '187923778295752',
    admins: '100002011114519',
    appsecret: 'ffd9dd257ec77c77eb07ef930c37cbcc',
    fanpagename: 'Cazs',
    femail: 'admin@wsup3.cf',
    fpass: '01227513694',
    fname: 'CAZS',
    remail: 'caodinhlam1991@gmail.com',
    phone: '0867578776',
    sphone: '086.757.8776',
    rname: 'CAZS',
    onsocket: true,
    database: {
        name: 'wsup3',
        //dsnLoc: 'mongodb+srv://wsup3:wsup3@wsup3.wbqao.azure.mongodb.net/wsup3?retryWrites=true&w=majority',
        //dsnOnl: 'mongodb+srv://wsup3:wsup3@wsup3.wbqao.azure.mongodb.net/wsup3?retryWrites=true&w=majority',
        dsnLoc: 'mongodb+srv://local:local@cluster0.mpa2q.mongodb.net/wsup3?retryWrites=true&w=majority',
        dsnOnl: 'mongodb+srv://local:local@cluster0.mpa2q.mongodb.net/wsup3?retryWrites=true&w=majority',
    }
};