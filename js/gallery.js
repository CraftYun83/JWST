(function () {

    var bv = new Bideo();
    bv.init({
      videoEl: document.querySelector('#background_video'),
  
      container: document.querySelector('body'),
  
      resize: true,
  
      isMobile: window.matchMedia('(max-width: 768px)').matches,

      src: [
        {
          src: '../media/bg.mp4',
          type: 'video/mp4'
        }
      ],
  
      // What to do once video loads (initial frame)
      onLoad: function () {
        document.querySelector('#video_cover').style.display = 'none';
      }
    });
  }());