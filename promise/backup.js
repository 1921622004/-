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
            // setTimeout(() => {
            excuter(resolve, reject)
            // },0)

        } catch (e) {
            // 有错误走失败
            reject(e)
        }
    }
    then(onFullfilled, onRejected) {
        if (this.status === 'resolved') {
            onFullfilled(this.value)
        } else if (this.status === 'rejected') {
            onRejected(this.reason)
        } else if (this.status === 'pending') {
            this.onResolvedCallbacks.push(onFullfilled);
            this.onRejectedCallback.push(onRejected)
        }
    }
}

module.exports = Promise;