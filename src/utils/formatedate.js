export function formatdate(date) {
    var date = new Date(date);
    var year=date.getFullYear(); 
    var month=date.getMonth()+1; 
    var day=date.getDate(); 
    var hour=date.getHours(); 
    var minute=date.getMinutes(); 
    var second=date.getSeconds(); 

    let newdate=year + '-' + (String(month).length > 1 ? month : '0' + month) + '-' + 
    (String(day).length > 1 ? day : '0' + day) + ' ' + (String(hour).length > 1 ? hour : '0' + hour) + ':' + (String(minute).length > 1 ? minute : '0' + minute)
     + ':' + (String(second).length > 1 ? second : '0' + second)

   return newdate
}