export function mesPropis(date) {
  let mes = date.getMonth();
  let mesPropis ='';
  if (mes===0) {
    mesPropis = 'ЯНВАРЬ';
  } else if (mes===1) {
    mesPropis = 'ФЕВРАЛЬ';
  } else if (mes===2) {
    mesPropis = 'МАРТ';
  } else if (mes===3) {
    mesPropis = 'АПРЕЛЬ';
  } else if (mes===4) {
    mesPropis = 'МАЙ';
  } else if (mes===5) {
    mesPropis = 'ИЮНЬ';
  } else if (mes===6) {
    mesPropis = 'ИЮЛЬ';
  } else if (mes===7) {
    mesPropis = 'АВГУСТ';
  } else if (mes===8) {
    mesPropis = 'СЕНТЯБРЬ';
  } else if (mes===9) {
    mesPropis = 'ОКТЯБРЬ';
  } else if (mes===10) {
    mesPropis = 'НОЯБРЬ';
  } else if (mes===11) {
    mesPropis = 'ДЕКАБРЬ';
  }
  return mesPropis;
}

export function formatData(date) {
  let mes = '' + (date.getMonth() + 1);
  if (mes.length === 1) {
    mes = '0' + mes;
  }
  let den = '' + date.getDate();
  if (den.length === 1) {
    den = '0' + den;
  }
  let cas = '' + date.getHours();
  if (cas.length === 1){
    cas = '0' + cas;
  }
  let min = '' + date.getMinutes();
  if (min.length === 1) {
    min = '0' + min;
  }
  let sec = '' + date.getSeconds();
  if (sec.length === 1) {
    sec = '0' + sec;
  }
  let newDataStr = '' + date.getFullYear() + '-' + mes + '-' + den + 'T' + cas + ':' + min + ':' + sec;


  return newDataStr;
}


export function formatData1(date) {
  let mes = '' + (date.getMonth() + 1);
  if (mes.length === 1) {
    mes = '0' + mes;
  }
  let den = '' + date.getDate();
  if (den.length === 1) {
    den = '0' + den;
  }
  let cas = '' + date.getHours();
  if (cas.length === 1){
    cas = '0' + cas;
  }
  let min = '' + date.getMinutes();
  if (min.length === 1) {
    min = '0' + min;
  }
  let sec = '' + date.getSeconds();
  if (sec.length === 1) {
    sec = '0' + sec;
  }
  let newDataStr = '' + den + '.' + mes + '.' + date.getFullYear() + ' ' + cas + ':' + min;


  return newDataStr;
}
