console.log('ok');


// Toggle Menu
function toggleMenu() {
  document.getElementById("nav-menu").classList.toggle("active");
}
// function toggleMenu() {
//   const menu = document.getElementById('nav-menu');
//   menu.classList.toggle('active');
// }

// toggle menu (hamburger menu) menutup ketika klik "Esc" di keyboard
document.addEventListener("keydown", function (event) {
  // Jika tombol yang ditekan adalah Escape
  if (event.key === "Escape") {
    const navMenu = document.getElementById("nav-menu");
    // Tutup menu jika sedang terbuka
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
    }
  }
});


// Slideshow Image
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlides() {
  slides.forEach((slide, index) => {
    slide.classList.remove("active");
  });

  dots.forEach(dot => dot.classList.remove("active"));

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active");

  setTimeout(showSlides, 4000); // Change image every 4 seconds
}

function currentSlide(n) {
  slideIndex = n - 1; // subtract 1 since showSlides() will increment it
  showSlides();
}

// Start the slideshow
showSlides();


// Logika Draggable Card Slider
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const arrowBtns = document.querySelectorAll(".wrapper i");
  const wrapper = document.querySelector(".wrapper");

  const firstCard = carousel.querySelector(".card");
  const firstCardWidth = firstCard.offsetWidth;

  let isDragging = false,
    startX,
    startScrollLeft,
    timeoutId;

  const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging) return;

    // Hitung posisi gulir baru
    const newScrollLeft = startScrollLeft - (e.pageX - startX);

    // Periksa apakah posisi gulir baru melebihi 
    // batas korsel
    if (newScrollLeft <= 0 || newScrollLeft >=
      carousel.scrollWidth - carousel.offsetWidth) {

      // Jika iya, cegah penarikan lebih lanjut
      isDragging = false;
      return;
    }

    // Jika tidak, perbarui posisi gulir korsel
    carousel.scrollLeft = newScrollLeft;
  };

  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  const autoPlay = () => {

    // Kembalikan jika jendela lebih kecil dari 800
    if (window.innerWidth < 800) return;

    // Hitung lebar total semua card
    const totalCardWidth = carousel.scrollWidth;

    // Hitung posisi gulir maksimum
    const maxScrollLeft = totalCardWidth - carousel.offsetWidth;

    // Jika carousel berada di akhir, hentikan putar otomatis
    if (carousel.scrollLeft >= maxScrollLeft) return;

    // Putar otomatis carousel setelah setiap 2500ms
    timeoutId = setTimeout(() =>
      carousel.scrollLeft += firstCardWidth, 2500);
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  wrapper.addEventListener("mouseenter", () =>
    clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);

  // Tambahkan event listener untuk tombol panah ke 
  // gulirkan carousel ke kiri dan kanan
  arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      carousel.scrollLeft += btn.id === "left" ?
        -firstCardWidth : firstCardWidth;
    });
  });
});


// Isi Data Diri (Message Us)
function kirim() {
  const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  
  let date = new Date();
  let tanggal = date.getDate() + " " + bulan[date.getMonth()] + " " + date.getFullYear();
  let jam = date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0");
  let waktuIni = jam + ", " + tanggal;

  let form = document.forms["message-form"];
  let nama = form["nama"].value.trim();
  let ttl = form["ttl"].value;
  let gender = form["gender"].value;
  let pesan = form["pesan"].value.trim();

  // Validasi
  if (nama === "" || ttl === "" || gender === "" || pesan === "") {
    alert("Input form tidak boleh kosong!");
    return false;
  }

  if (nama.length < 3) {
    alert("Nama minimal 3 karakter.");
    return false;
  }

  if (!/^[a-zA-Z\s]+$/.test(nama)) {
    alert("Nama hanya boleh huruf dan spasi.");
    return false;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(ttl)) {
    alert("Tanggal lahir tidak valid.");
    return false;
  }

  // Menampilkan data ke DOM
  document.getElementById("waktu").innerText = waktuIni;
  document.getElementById("nama2").innerText = nama;
  document.getElementById("ttl2").innerText = ttl;
  document.getElementById("gender2").innerText = gender;
  document.getElementById("pesan2").innerText = pesan;

  // Reset form
  form.reset();

  return false; // Mencegah form reload (jika pakai form action)
}
