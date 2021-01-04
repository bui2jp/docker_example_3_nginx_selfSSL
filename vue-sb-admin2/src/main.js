import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//
import '@fortawesome/fontawesome-free/css/all.min.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min'

import './lib/sb-admin2/css/sb-admin-2.min.css'
//import './lib/sb-admin2/js/sb-admin-2.js'
import $ from 'jquery'

new Vue({
  router,
  store,
  render: h => h(App),
  created: function () {
    console.log('Vue:created')
  },
  mounted: function () {
    console.log('Vue:mounted')

  // 
  // import './lib/sb-admin2/js/sb-admin-2.js'
  // これより下はsb-admin-2.jsからのコピー
  // 

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function() {
    console.log('sb-admin-2:sidebarToggle')
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    }
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    console.log('sb-admin-2:window.resize')
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    }
    
    // Toggle the side navigation when window is resized below 480px
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $('.sidebar .collapse').collapse('hide');
    }
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    console.log('sb-admin-2:mousewheel')    
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    console.log('sb-admin-2:scroll')    
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    console.log('sb-admin-2:document')
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });    

  }
}).$mount('#app')

Vue.nextTick(function() {
  console.log('Vue.nextTick')
})

console.log("process.env:" + JSON.stringify(process.env));
console.log("process.env:" + process.env.VUE_APP_MY_TITLE);