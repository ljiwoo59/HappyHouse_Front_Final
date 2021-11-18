<template>
  <div class="container">
    <header id="index_header" >
      <!-- 1. carousel -->
      <div id="cdemo" class="carousel slide my-5" data-ride="carousel">
        <!-- Indicators -->
        <ul class="carousel-indicators">
          <li data-target="#cdemo" data-slide-to="0" class="active"></li>
          <li data-target="#cdemo" data-slide-to="1"></li>
          <li data-target="#cdemo" data-slide-to="2"></li>
        </ul>

        <!-- The slideshow -->
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="../assets/Daegu.jpg" alt="Banpo" width="1200" height="300" />
            <div class="carousel-caption">
              <h1>HappyHouse</h1>
            </div>
          </div>
          <div class="carousel-item">
            <img src="../assets/Banpo.jpg" alt="Daegu" width="1200" height="300" />
            <div class="carousel-caption">
              <h1>HappyHouse</h1>
            </div>
          </div>
          <div class="carousel-item">
            <img src="../assets/Chundam.jpg" alt="Chungdam" width="1200" height="300" />
            <div class="carousel-caption">
              <h1>HappyHouse</h1>
            </div>
          </div>
        </div>

        <!-- Left and right controls -->
        <a class="carousel-control-prev" href="#cdemo" data-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </a>
        <a class="carousel-control-next" href="#cdemo" data-slide="next">
          <span class="carousel-control-next-icon"></span>
        </a>
      </div>
    </header>

    <!-- nav start -->
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark rounded" id="NoneLoginPage">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/" style="color: white">Home</a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbardrop"
            data-toggle="dropdown"
            style="color: white"
          >
            동네 정보
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">APT 매매</a>
            <a class="dropdown-item" href="#">APT 전월세</a>
            <a class="dropdown-item" href="#">주택 매매</a>
            <a class="dropdown-item" href="#">주택 전월세</a>
            <a class="dropdown-item" href="#">상권 정보</a>
            <a class="dropdown-item" href="#">환경 정보</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" style="color: white">Notice</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" style="color: white">News</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/qna" style="color: white">QnA</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="user/login" style="color: white">로그인</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="user/register" style="color: white">회원 가입</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style>
.nav-link {
  color: white;
}
</style>
