
let p = new Promise((resolve,reject) => {
        resolve(100)
})
p.then(data=>{
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(data + 100)
        }, 3000);
    })
})
.then(data => {
    console.log(data)
})