<template>
  <!-- Page Wrapper -->
  <div id="wrapper">
    <!-- Sidebar -->
    <ul
      class="navbar-nav bg-gradient-info sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <!-- Sidebar - Brand -->
      <a
        class="sidebar-brand d-flex align-items-center justify-content-center"
        href="#"
      >
        <div class="sidebar-brand-icon rotate-n-15">
          <!-- <i class="fas fa-laugh-wink"></i> -->
          <i class="fas fa-fw fa-folder"></i>
        </div>
        <div class="sidebar-brand-text mx-3">Example <sup>99</sup></div>
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider" />

      <!-- Heading -->
      <div class="sidebar-heading">Page</div>

      <!-- Nav Item - Dashboard -->
      <li class="nav-item">
          <router-link to="page1">
        <a class="nav-link" href="#">
          <i class="fas fa-fw fa-folder"></i>
          <span>Page1</span></a
        ></router-link>
      </li>

      <!-- Nav Item - Dashboard -->
      <li class="nav-item">
        <router-link to="page2">
          <a class="nav-link" href="#">
            <i class="fas fa-fw fa-folder"></i>
            <span>Page2</span></a
          >
        </router-link>
      </li>

      <!-- Sidebar Toggler (Sidebar) -->
      <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <!-- Topbar -->
        <nav
          class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
        >
          <!-- Sidebar Toggle (Topbar) -->
          <button
            id="sidebarToggleTop"
            class="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i class="fa fa-bars"></i>
          </button>

          <!-- Topbar Navbar -->
          <ul class="navbar-nav ml-auto">
            <div class="topbar-divider d-none d-sm-block"></div>

            <li class="nav-item">
              <router-link to="/">
                <button class="btn btn-secondary" >Sign Out</button>
              </router-link>
            </li>
          </ul>
        </nav>
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">
          <!-- コンテンツ内容 -->
          <router-view />
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <footer class="sticky-footer bg-white">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>Copyright &copy; Your Website 2020</span>
          </div>
        </div>
      </footer>
      <!-- End of Footer -->
    </div>
    <!-- End of Content Wrapper -->
  </div>
  <!-- End of Page Wrapper -->
</template>

<script>
//require('../lib/sb-admin2/js/sb-admin-2.js')
import $ from "jquery";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      msg2: "test test test",
    };
  },
  mounted: function () {
    console.log("HeadSideMenu:mounted");
    /**
     * ../lib/sb-admin2/js/sb-admin-2.js
     * の内容をここで反映する
     */
    sb_admin2_js_func();
  },
};

/**
 * ../lib/sb-admin2/js/sb-admin-2.jsからの内容をコピー
 */
let sb_admin2_js_func = () => {
  // Toggle the side navigation
  console.log("sb-admin-2:sidebarToggle register");
  $("#sidebarToggle, #sidebarToggleTop").on("click", function () {
    console.log("sb-admin-2:sidebarToggle");
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $(".sidebar .collapse").collapse("hide");
    }
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function () {
    //console.log("sb-admin-2:window.resize");
    if ($(window).width() < 768) {
      $(".sidebar .collapse").collapse("hide");
    }

    // Toggle the side navigation when window is resized below 480px
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $(".sidebar .collapse").collapse("hide");
    }
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $("body.fixed-nav .sidebar").on("mousewheel DOMMouseScroll wheel", function (
    e
  ) {
    console.log("sb-admin-2:mousewheel");
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on("scroll", function () {
    console.log("sb-admin-2:scroll");
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $(".scroll-to-top").fadeIn();
    } else {
      $(".scroll-to-top").fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on("click", "a.scroll-to-top", function (e) {
    console.log("sb-admin-2:document");
    var $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top,
        },
        1000,
        "easeInOutExpo"
      );
    e.preventDefault();
  });
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
