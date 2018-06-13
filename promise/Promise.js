class Promise {
    constructor(excuter) {
        this.status = 'pending';
        this.value = null;
        this.reason = null;
        this.onResolvedCallbacks = [];
        this.onRejectedCallback = [];
        let resolve = value => {
            if (this.status === 'pending') {
                this.value = value;
                this.status = 'resolved';
                this.onResolvedCallbacks.forEach(item => {
                    item(this.value)
                })
            }
        };
        let reject = reason => {
            if (this.status === 'pending') {
                this.reason = reason;
                this.status = 'rejected';
                this.onRejectedCallback.forEach(item => {
                    item(this.reason)
                })
            }
        };
        try {
            excuter(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    then(onFullfilled, onRejected) {

        if(this.status === 'resolved'){
            return new Promise((resolve,reject) => {
                let x = onFullfilled(this.value);
                if(x instanceof Promise){
                    x.then(resolve,reject)
                }else{
                    resolve(x);
                }
            })
        }else if (this.status === 'rejected'){
            return new Promise((resolve,reject) => {
                let x = onRejected(this.value);
                if(x instanceof Promise){
                    x.then(resolve,reject)
                }else{
                    resolve(x)
                }
            })
        }else if(this.status === 'pending'){
            return new Promise((resolve,reject) => {
                this.onResolvedCallbacks.push(() => {
                    let x = onFullfilled(this.value);
                    if(x instanceof Promise){
                        x.then(resolve,reject)
                    }else{
                        resolve(x)
                    }
                });
                this.onRejectedCallback.push(() => {
                    let x = onRejected(this.value);
                    if(x instanceof Promise){
                        x.then(resolve,reject)
                    }else{
                        resolve(x)
                    }
                })
            })
        }
    }
}

// module.exports = Promise;
