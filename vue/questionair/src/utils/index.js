export let formatDate = date => {      
    let da = new Date(date);
    let year = da.getFullYear();
    let month = da.getMonth()+1;
    let day = da.getDate();
    return [year,month,day].join('-');
}