window.onload = function () {
  serIcon();
  animateBg();
};

function serIcon() {
  $('.icon').hover(function (e) {
    $(this).addClass('animated bounce');
  });
}

function animateBg() {
  var animateBgDom = document.getElementById('animate-bg');

  var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
  var camera, scene, renderer;
  var particles, particle, count = 0;
  var mouseX = 0, mouseY = 0;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  init();
  animate();

  function init() {
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100000 );
    camera.position.z = 1000;
    camera.position.y = 500;
    scene = new THREE.Scene();
    particles = new Array();
    var PI2 = Math.PI * 2;
    var material = new THREE.PointsMaterial({
      color: 0x87B145
    });
    var i = 0;
    for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
      for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
        particle = particles[ i ++ ] = new THREE.Particle( material );
        particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
        particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
        scene.add( particle );
      }
    }
    renderer = new THREE.WebGLRenderer({alpha:true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    animateBgDom.appendChild( renderer.domElement );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    window.addEventListener( 'resize', onWindowResize, false );
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }


  function onDocumentTouchStart( event ) {
    if ( event.touches.length === 1 ) {
      event.preventDefault();
      mouseX = event.touches[ 0 ].pageX - windowHalfX;
      mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
  }

  function onDocumentTouchMove( event ) {
    if ( event.touches.length === 1 ) {
      event.preventDefault();
      mouseX = event.touches[ 0 ].pageX - windowHalfX;
      mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
  }
  function onDocumentMouseMove( event ) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }

  function render() {
    camera.position.x += ( mouseX - camera.position.x ) * .005;
    camera.lookAt( scene.position );
    var i = 0;
    for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
      for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
        particle = particles[ i++ ];
        particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
        particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 2 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 2;
      }
    }
    renderer.render( scene, camera );
    count += 0.1;
  }

  function animate() {
    requestAnimationFrame( animate );
    render();
  }
}
