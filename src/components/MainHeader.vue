<template>
  <div class="container">
      <header id="index_header" class="jumbotron text-center mb-1">
			<h4>행복한 우리 집</h4>
			<div id="latlng" name="latlng" style="display: none"></div>
		</header>
		
        <!-- nav start -->
		<nav class="navbar navbar-expand-sm bg-dark navbar-dark rounded" id="NoneLoginPage">
			<ul class="navbar-nav">
				<li class="nav-item">
					<a class="nav-link" href="/" style="color:white;">Home</a>
				</li>
				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown" style="color:white;">
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
					<a class="nav-link" href="#" style="color:white;">Notice</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#" style="color:white;">News</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/qna" style="color:white;">QnA</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="user/login" style="color:white;">로그인</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="user/register" style="color:white;">회원 가입</a>
				</li>
			</ul>
		</nav>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.nav-link {
    color: white;
}
</style>