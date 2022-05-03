const {app, BrowserWindow} = require("electron");
const path = require("path");
const url = require("url");

function createWindow(){
    const win = new BrowserWindow({
        width: 800,
        height:600,
        minWidth: 800,
        minHeight:600,
        resizable: false,
        title:"Sistema de Estoque",
        webPreference:{
            preload: path.join(__dirname, "preloader.js"),
        },


    });

    win.loadURL("http://localhost:3002");

    // if (process.env.NODE_ENV === 'development')
    // {
    //     win.loadURL("http://localhost:3002");
    // }
    // else{
    //     win.loadURL(
    //         url.format({
    //             pathname:path.join(__dirname, '../index.html'),
    //             protocol: 'file:',
    //             slashes: true
    //         })
    //     )
    // }
}

app.whenReady().then( () =>{
    createWindow();

    app.on("active", () => {
        if(BrowserWindow.getAllWindows().lenght === 0)
        {
            createWindow();
        }
    })
});

app.on("window-all-closed", ()=>{
    if (process.plataform !== "darwin")
    {
        app.quit();
    }
});