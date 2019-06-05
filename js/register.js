if (navigator.serviceWorker){

  navigator.serviceWorker.register('sw.js').then(function() {
    console.log('SW Registration worked!');
  }).catch(function() {
    console.log('SW Registration failed!');
  });
}
