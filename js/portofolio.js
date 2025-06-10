// fitur slide di menu portofolio untuk slide gambar sertifikat
let slideIndex = 1;
plusSlide(1);
function plusSlide(n) {
  showImg((slideIndex += n));
}

console.log(slideIndex);

function showImg(n) {
  let i;
  let imgList = document.getElementsByClassName("img-list");
  // console.log(imgList.length);
  if (n > imgList.length) slideIndex = 1;
  else if (n < 1) slideIndex = imgList.length;

  for( i = 0; i < imgList.length; i++ ) {
    imgList[i].style.display = "none";
  }

  imgList[slideIndex - 1].style.display = "block";

  console.log(slideIndex);
}