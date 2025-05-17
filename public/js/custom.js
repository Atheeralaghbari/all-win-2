// document.querySelector('.close-btn').addEventListener('click', function () {
//   const navbarCollapse = document.querySelector('.navbar-collapse');
//   navbarCollapse.classList.remove('show');
// });

// // إغلاق القائمة عند النقر خارجها
// document.addEventListener('click', function (event) {
//   const navbarCollapse = document.querySelector('.navbar-collapse');
//   const navbarToggler = document.querySelector('.navbar-toggler');
//   console.log('test', navbarToggler, event.target);
//   const closeBtn = document.querySelector('.close-btn');
//   if (
//     !navbarCollapse.contains(event.target) &&
//     !navbarToggler.contains(event.target) &&
//     !closeBtn.contains(event.target)
//   ) {
//     navbarCollapse.classList.remove('show');
//     console.log('test2');
//   } else {
//     navbarCollapse.classList.add('show');
//   }
// });
///////////////////////////////
// const words = [
//   'مغامرة تسويقية جذابة!',
//   'تجربة تسويقية لا تُنسى!',
//   'إبداع يفتح آفاق المبيعات!',
// ];
let wordIndex = 0;
let words = document.getElementById('_title_second_part');
console.log(words.innerText);
words = words.innerText.split(',');
const changingWord = document.getElementById('changing-word');
const cursor = document.querySelector('.cursor');
if (changingWord && cursor) {
  function typeEffect(word) {
    changingWord.innerHTML = ''; // تفريغ النص الحالي
    let currentText = ''; // تخزين النص الحالي

    word.split('').forEach((letter, index) => {
      setTimeout(() => {
        currentText += letter; // إضافة الحرف الجديد
        changingWord.innerHTML = currentText + '<span class="cursor">|</span>'; // إبقاء المؤشر داخل النص
      }, index * 150);
    });

    // بعد انتهاء الكتابة، تشغيل وميض المؤشر 4 مرات قبل الحذف
    setTimeout(() => {
      blinkCursor(4, () => {
        deleteEffect();
      });
    }, word.length * 150);
  }

  function blinkCursor(times, callback) {
    let count = 0;
    let interval = setInterval(() => {
      cursor.style.opacity = cursor.style.opacity === '1' ? '0' : '1'; // تغيير حالة الظهور

      count++;
      if (count >= times * 2) {
        // pكل وميض يحدث مرتين (إخفاء وظهور)
        clearInterval(interval);
        cursor.style.opacity = '1'; // التأكد أن المؤشر يظهر في النهاية
        callback(); // استدعاء الحذف بعد الوميض
      }
    }, 500); // زمن الوميض 0.5 ثانية
  }

  function deleteEffect() {
    let word = changingWord.textContent; // الحصول على النص الحالي
    let wordLength = word.length;

    let interval = setInterval(() => {
      if (wordLength > 0) {
        word = word.slice(0, -1); // حذف آخر حرف
        changingWord.innerHTML = word + '<span class="cursor">|</span>'; // إبقاء المؤشر بجانب النص
        wordLength--;
      } else {
        clearInterval(interval);
        wordIndex = (wordIndex + 1) % words.length; // الانتقال إلى الكلمة التالية
        setTimeout(() => {
          typeEffect(words[wordIndex]);
        }, 500);
      }
    }, 50); // حذف كل حرف بعد 100ms
  }

  typeEffect(words[wordIndex]);
}
// ///////////////////////////
// $(document).ready(function () {
//   let listItems = $(".list-group-item");
//   let images = $(".content-image");
//   let currentIndex = 0;
//   let totalItems = listItems.length;

//   // تغيير العنصر النشط عند التحميل الأول
//   changeActiveItem(currentIndex);

//   // تغيير العنصر النشط
//   function changeActiveItem(index) {
//     listItems.removeClass("active");
//     images.removeClass("active");

//     let selectedItem = listItems.eq(index);
//     let targetImage = $("#" + selectedItem.attr("data-target"));

//     selectedItem.addClass("active");
//     targetImage.addClass("active");

//     currentIndex = index;
//   }

//   // تغيير تلقائي كل 10 ثواني
//   function autoChange() {
//     currentIndex = (currentIndex + 1) % totalItems;
//     changeActiveItem(currentIndex);
//   }

//   // عند النقر على عنصر في القائمة
//   listItems.click(function () {
//     let index = $(this).index();
//     changeActiveItem(index);
//   });

//   // التغيير التلقائي كل 10 ثواني
//   setInterval(autoChange, 6000);
// });
// $(document).ready(function () {
//   let listItems = $('.list-group-item');
//   let images = $('.content-image');
//   let mobileImages = $('.mobile-image');
//   let currentIndex = 0;
//   let totalItems = listItems.length;

//   // تغيير العنصر النشط عند التحميل الأول
//   changeActiveItem(currentIndex);

//   // تغيير العنصر النشط
//   function changeActiveItem(index) {
//     listItems.removeClass('active');
//     images.removeClass('active');
//     mobileImages.addClass('d-none');

//     let selectedItem = listItems.eq(index);
//     let targetImage = $('#' + selectedItem.attr('data-target'));
//     let mobileImage = selectedItem.find('.mobile-image');

//     selectedItem.addClass('active');
//     targetImage.addClass('active');
//     mobileImage.removeClass('d-none');

//     currentIndex = index;
//   }

//   // تغيير تلقائي كل 10 ثواني
//   function autoChange() {
//     currentIndex = (currentIndex + 1) % totalItems;
//     changeActiveItem(currentIndex);
//   }

//   // عند النقر على عنصر في القائمة
//   listItems.click(function () {
//     let index = $(this).index();
//     changeActiveItem(index);
//   });

//   // التغيير التلقائي كل 10 ثواني
//   setInterval(autoChange, 10000);
// });
/////////////////////////////////////
var swiper = new Swiper('.mySwiper', {
  slidesPerView: 1.0 /* سلايد واحد وجزء من الثاني */,
  spaceBetween: 20,
  autoHeight: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 1.2 /* عند الشاشات الكبيرة يظهر جزء أكبر من الثاني */,
      spaceBetween: 30,
    },
  },
});
// ///////////////////

document.addEventListener('DOMContentLoaded', function () {
  const countrySelect = document.getElementById('countrySelect');
  const countryCode = document.getElementById('countryCode');
  const countryFlag = document.getElementById('countryFlag');

  if (countrySelect && countryFlag) {
    countrySelect.addEventListener('change', function () {
      var selectedOption = this.options[this.selectedIndex];
      var flagUrl = selectedOption.getAttribute('data-flag');
      countryFlag.src = flagUrl;
    });
  }

  if (countryCode && countryFlag) {
    countryCode.addEventListener('change', function () {
      var selectedOption = this.options[this.selectedIndex];
      var selectedFlag = selectedOption.getAttribute('data-flag');
      countrySelect.value = selectedFlag;
      countryFlag.src = `https://flagcdn.com/w80/${selectedFlag}.png`;
    });
  }
});
//////////
const button = document.getElementById('uploadFile');
if (button) {
  button.addEventListener('change', function (e) {
    const fileName = e.target.files[0].name;
    const text = document.querySelector('.custom-file-input .text');
    text.textContent = fileName;
  });
}
