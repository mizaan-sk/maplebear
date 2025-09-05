const form = document.getElementById("enquiry-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Clear previous errors
  document.querySelectorAll('[id$="-error"]').forEach(error => {
    error.classList.add("hidden");
  });

  let isValid = true;

  const fullName = document.getElementById("fullName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const state = document.getElementById("state").value;
  const investment = document.getElementById("investment").value;
  const timeline = document.getElementById("timeline").value;

  // Validation
  if (!fullName) {
    document.getElementById("fullName-error").textContent = "Name is required";
    document.getElementById("fullName-error").classList.remove("hidden");
    isValid = false;
  }

  if (!phone) {
    document.getElementById("phone-error").textContent = "Phone number is required";
    document.getElementById("phone-error").classList.remove("hidden");
    isValid = false;
  } else if (!/^\d{10}$/.test(phone)) {
    document.getElementById("phone-error").textContent = "Phone number must be 10 digits";
    document.getElementById("phone-error").classList.remove("hidden");
    isValid = false;
  }

  if (!email) {
    document.getElementById("email-error").textContent = "Email is required";
    document.getElementById("email-error").classList.remove("hidden");
    isValid = false;
  }

  if (!state) {
    document.getElementById("state-error").textContent = "State is required";
    document.getElementById("state-error").classList.remove("hidden");
    isValid = false;
  }
  if (!investment) {
    document.getElementById("investment-error").textContent = "Investment range is required";
    document.getElementById("investment-error").classList.remove("hidden");
    isValid = false;
  }
  if (!timeline) {
    document.getElementById("timeline-error").textContent = "Timeline is required";
    document.getElementById("timeline-error").classList.remove("hidden");
    isValid = false;
  }

  if (!isValid) return;

  // Show loading
  const submitButton = document.getElementById("submit-button");
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = "Submitting...";
  submitButton.disabled = true;

  // Prepare form data
  const formData = {
    fullName: fullName,
    phone: String(phone),
    email: email,
    state: state,
    investment: investment,
    timeline: timeline,
    utm_source: document.getElementById("utm_source").value,
    utm_ad: document.getElementById("utm_ad").value,
    utm_campaign: document.getElementById("utm_campaign").value,
    utm_placement: document.getElementById("utm_placement").value,
    utm_keyword: document.getElementById("utm_keyword").value,
    gclid: document.getElementById("gclid").value,
    fbclid: document.getElementById("fbclid").value,
  };

  console.log("Sending data:", formData);

  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbxHWDPjCQeDGt-HK4GJAWKWj4kRJXm_fdSP_AAfEkYdmRtV2z_NN-A-0k6du78yYVcx/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        mode: "no-cors",
      }
    );

    // ✅ Reset the form after successful submission
    form.reset();

    // ✅ Reset select colors back to gray placeholder
    document.querySelectorAll("select").forEach(select => {
      select.style.color = "#6B7280"; // Tailwind's text-gray-500
    });

    // ✅ Redirect to thank-you page
    window.location.href = "thank-you.html";

  } catch (error) {
    console.error("Submission error:", error);
    alert("❌ Submission failed. Please try again.");
  } finally {
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
  }
});


// Slider Code of banner start 
 document.addEventListener("DOMContentLoaded", function () {
    const sliderWrapper = document.querySelector("#banner-slider .slider-wrapper");

    // Detect if desktop or mobile slides should be used
    const slides = Array.from(
      document.querySelectorAll(
        window.innerWidth >= 768
          ? "#banner-slider .desktop-slide"
          : "#banner-slider .mobile-slide"
      )
    );

    let currentIndex = 1; // Start from the first actual slide (after clone)
    const totalSlides = slides.length;

    if (totalSlides <= 1) return; // Stop slider if there's only one image

    // Clone first and last slides for seamless infinite effect
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    sliderWrapper.insertBefore(lastClone, slides[0]);
    sliderWrapper.appendChild(firstClone);

    const allSlides = document.querySelectorAll(
      window.innerWidth >= 768
        ? "#banner-slider .desktop-slide"
        : "#banner-slider .mobile-slide"
    );

    let slideWidth = sliderWrapper.clientWidth;

    function goToSlide(index) {
      sliderWrapper.style.transition = "transform 0.6s ease-in-out";
      sliderWrapper.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    function nextSlide() {
      currentIndex++;
      goToSlide(currentIndex);

      // Reset to first slide seamlessly when reaching the end
      if (currentIndex === allSlides.length - 1) {
        setTimeout(() => {
          sliderWrapper.style.transition = "none";
          currentIndex = 1;
          sliderWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }, 600);
      }
    }

    function prevSlide() {
      currentIndex--;
      goToSlide(currentIndex);

      // Reset to last slide seamlessly when going backward
      if (currentIndex === 0) {
        setTimeout(() => {
          sliderWrapper.style.transition = "none";
          currentIndex = totalSlides;
          sliderWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }, 600);
      }
    }

    // Initialize first position
    sliderWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    // Auto-play every 3 seconds
    setInterval(nextSlide, 3000);

    // Handle window resize
    window.addEventListener("resize", () => {
      slideWidth = sliderWrapper.clientWidth;
      sliderWrapper.style.transition = "none";
      sliderWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    });
  });
// slider code of banner ends here 
// why maple bear hover code  start 
function togglesCard(card) {
    // Only apply toggle on mobile
    if (window.innerWidth >= 768) return;

    const icon = card.querySelector('.card-icon');
    const title = card.querySelector('.card-title');
    const hoverText = card.querySelector('.card-hover');

    // Toggle state
    const isActive = card.classList.contains('active');

    if (isActive) {
      card.classList.remove('active');
      card.style.backgroundColor = 'white';
      icon.style.opacity = '1';
      title.style.opacity = '1';
      hoverText.style.opacity = '0';
    } else {
      card.classList.add('active');
      card.style.backgroundColor = '#CC1316';
      icon.style.opacity = '0';
      title.style.opacity = '0';
      hoverText.style.opacity = '1';
    }
  }

  // Reset state when window resizes to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      document.querySelectorAll(".card").forEach(card => {
        card.classList.remove("active");
        card.style.backgroundColor = "white";
        card.querySelector(".card-icon").style.opacity = "1";
        card.querySelector(".card-title").style.opacity = "1";
        card.querySelector(".card-hover").style.opacity = "0";
      });
    }
  });
  // why maple bear hover ends here 
// Modal form start 
document.addEventListener("DOMContentLoaded", function () {
  const popupModal = document.getElementById("popup-modal");
  const popupClose = document.getElementById("popup-close");
  const popupForm = document.getElementById("popup-enquiry-form");

  let modalShown = false; // ✅ Prevent reopening

  // Get UTM params from URL or main form
  function getUTMParams() {
    const urlParams = new URLSearchParams(window.location.search);

    // Fill popup hidden fields
    document.getElementById("popup_utm_source").value = urlParams.get("utm_source") || document.getElementById("utm_source")?.value || "";
    document.getElementById("popup_utm_ad").value = urlParams.get("utm_ad") || document.getElementById("utm_ad")?.value || "";
    document.getElementById("popup_utm_campaign").value = urlParams.get("utm_campaign") || document.getElementById("utm_campaign")?.value || "";
    document.getElementById("popup_utm_placement").value = urlParams.get("utm_placement") || document.getElementById("utm_placement")?.value || "";
    document.getElementById("popup_utm_keyword").value = urlParams.get("utm_keyword") || document.getElementById("utm_keyword")?.value || "";
    document.getElementById("popup_gclid").value = urlParams.get("gclid") || document.getElementById("gclid")?.value || "";
    document.getElementById("popup_fbclid").value = urlParams.get("fbclid") || document.getElementById("fbclid")?.value || "";
  }

  // Call it on page load
  getUTMParams();

  // Show modal after 20 seconds only once
  const modalTimer = setTimeout(() => {
    if (!modalShown) {
      popupModal.classList.remove("hidden");
      popupModal.classList.add("flex");
      modalShown = true; // ✅ Prevent showing again
    }
  }, 20000);

  // Close modal
  popupClose.addEventListener("click", () => {
    popupModal.classList.add("hidden");
    modalShown = true; // ✅ Prevent reopening after close
    clearTimeout(modalTimer);
  });

  // Handle form submission
  popupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    document.querySelectorAll('[id^="popup"][id$="-error"]').forEach(el => el.classList.add("hidden"));
    let isValid = true;

    const fullName = document.getElementById("popupFullName").value.trim();
    const phone = document.getElementById("popupPhone").value.trim();
    const email = document.getElementById("popupEmail").value.trim();
    const state = document.getElementById("popupState").value;
    const investment = document.getElementById("popupInvestment").value;
    const timeline = document.getElementById("popupTimeline").value;

    // Validation
    if (!fullName) { document.getElementById("popupFullName-error").textContent = "Name is required"; document.getElementById("popupFullName-error").classList.remove("hidden"); isValid = false; }
    if (!phone) { document.getElementById("popupPhone-error").textContent = "Phone is required"; document.getElementById("popupPhone-error").classList.remove("hidden"); isValid = false; }
    if (!email) { document.getElementById("popupEmail-error").textContent = "Email is required"; document.getElementById("popupEmail-error").classList.remove("hidden"); isValid = false; }
    if (!state) { document.getElementById("popupState-error").textContent = "State is required"; document.getElementById("popupState-error").classList.remove("hidden"); isValid = false; }
    if (!investment) { document.getElementById("popupInvestment-error").textContent = "Investment range required"; document.getElementById("popupInvestment-error").classList.remove("hidden"); isValid = false; }
    if (!timeline) { document.getElementById("popupTimeline-error").textContent = "Timeline required"; document.getElementById("popupTimeline-error").classList.remove("hidden"); isValid = false; }

    if (!isValid) return;

    const submitBtn = document.getElementById("popup-submit-button");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Submitting...";
    submitBtn.disabled = true;

    const formData = {
      fullName,
      phone: String(phone),
      email,
      state,
      investment,
      timeline,
      utm_source: document.getElementById("popup_utm_source").value,
      utm_ad: document.getElementById("popup_utm_ad").value,
      utm_campaign: document.getElementById("popup_utm_campaign").value,
      utm_placement: document.getElementById("popup_utm_placement").value,
      utm_keyword: document.getElementById("popup_utm_keyword").value,
      gclid: document.getElementById("popup_gclid").value,
      fbclid: document.getElementById("popup_fbclid").value,
    };

    try {
      await fetch("https://script.google.com/macros/s/AKfycbxHWDPjCQeDGt-HK4GJAWKWj4kRJXm_fdSP_AAfEkYdmRtV2z_NN-A-0k6du78yYVcx/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        mode: "no-cors"
      });
      popupForm.reset();

      modalShown = true; // ✅ Don't reopen after submission
      clearTimeout(modalTimer);

      window.location.href = "thank-you.html";
    } catch (error) {
      console.error("Error:", error);
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
});


// modal form ends 

 function updateSelectColor(select) {
    if (select.value === "") {
      select.classList.remove("text-black");
      select.classList.add("text-gray-500");
    } else {
      select.classList.remove("text-gray-500");
      select.classList.add("text-black");
    }
  }

  
// Sticky button start 
// Get Elements
// Get Elements
const downloadBtns = document.querySelectorAll(".downloadBtn"); // ✅ Select all buttons
const brochureModal = document.getElementById("brochureModal");
const closeModal = document.getElementById("closeModal");
const brochureForm = document.getElementById("brochureForm");
const modalTitle = document.getElementById("modalTitle");
const modalSubtitle = document.getElementById("modalSubtitle");

// Attach click event to ALL download buttons
downloadBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalTitle.textContent = "Download Brochure";
    modalSubtitle.textContent = "Fill in your details to get the brochure.";
    brochureModal.classList.remove("hidden");
  });
});

// Close Modal
closeModal.addEventListener("click", () => {
  brochureModal.classList.add("hidden");
});

// Close Modal on Outside Click
brochureModal.addEventListener("click", (e) => {
  if (e.target === brochureModal) {
    brochureModal.classList.add("hidden");
  }
});

// Capture UTM Parameters from URL
function getUTMParams() {
  const urlParams = new URLSearchParams(window.location.search);

  const utmFields = ["utm_source", "utm_ad", "utm_campaign", "utm_placement", "utm_keyword", "gclid", "fbclid"];
  
  utmFields.forEach(field => {
    const value = urlParams.get(field) || "";
    document.getElementById(field).value = value;
    localStorage.setItem(field, value);
  });
}

// Prefill UTM from Local Storage if not in URL
function prefillUTMFromLocalStorage() {
  const utmFields = ["utm_source", "utm_ad", "utm_campaign", "utm_placement", "utm_keyword", "gclid", "fbclid"];

  utmFields.forEach(field => {
    if (!document.getElementById(field).value) {
      document.getElementById(field).value = localStorage.getItem(field) || "";
    }
  });
}

// Run UTM Capture on Page Load
getUTMParams();
prefillUTMFromLocalStorage();

// Handle Form Submission
// Handle Form Submission
brochureForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  document.querySelectorAll('[id$="-error"]').forEach(err => err.classList.add("hidden"));

  const brochureName = document.getElementById("brochureName").value.trim();
  const phone = document.getElementById("brochurePhone").value.trim();
  const email = document.getElementById("brochureEmail").value.trim();
  const utm_source = document.getElementById("utm_source").value;
  const utm_ad = document.getElementById("utm_ad").value;
  const utm_campaign = document.getElementById("utm_campaign").value;
  const utm_placement = document.getElementById("utm_placement").value;
  const utm_keyword = document.getElementById("utm_keyword").value;
  const gclid = document.getElementById("gclid").value;
  const fbclid = document.getElementById("fbclid").value;

  let isValid = true;

  if (!brochureName) {
    document.getElementById("brochureName-error").textContent = "Name is required";
    document.getElementById("brochureName-error").classList.remove("hidden");
    isValid = false;
  }
  if (!phone || !/^\d{10}$/.test(phone)) {
    document.getElementById("brochurePhone-error").textContent = "Valid 10-digit phone required";
    document.getElementById("brochurePhone-error").classList.remove("hidden");
    isValid = false;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById("brochureEmail-error").textContent = "Valid email required";
    document.getElementById("brochureEmail-error").classList.remove("hidden");
    isValid = false;
  }

  if (!isValid) return;

  const submitBtn = document.getElementById("submitBrochure");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Submitting...";
  submitBtn.disabled = true;

  try {
    await fetch("https://script.google.com/macros/s/AKfycbxHWDPjCQeDGt-HK4GJAWKWj4kRJXm_fdSP_AAfEkYdmRtV2z_NN-A-0k6du78yYVcx/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        fullName: brochureName,
        phone,
        email,
        utm_source,
        utm_ad,
        utm_campaign,
        utm_placement,
        utm_keyword,
        gclid,
        fbclid
      }),
      mode: "no-cors"
    });

    // ✅ Trigger brochure download
    const link = document.createElement("a");
    link.href = "Maple_Franchise.pdf"; // your PDF file
    link.download = "Maple_Franchise.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // ✅ Reset form & hide modal
    brochureModal.classList.add("hidden");
    brochureForm.reset();

    // ✅ Redirect to thank-you page
    window.location.href = "thank-you.html";

  } catch (error) {
    console.error("Form submission error:", error);
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});



// sticky button starts 
//  <!-- Awards Section Start  -->
        const awardsData = {
    2023: [
      {
        img: "images/aw1.webp",
        text: "Most Preferred Preschool chain by My Brand Better",
      },
      {
        img: "images/aw6.webp",
        text: "Innovation in Curriculum by Elets Technomedia Pvt. Ltd",
      },
      {
        img: "images/aw7.webp",
        text: "Innovation in Pedagogy by GSLC Award",
      },
      {
        img: "images/aw9.webp",
        text: "Edu Leader of the Year by Eduleader Summit Award",
      },
      {
        img: "images/aw8.webp",
        text: "Innovation in Curriculum by Ardocomm Media Group",
      },
      {
        img: "images/aw1.webp",
        text: "Best Preschool Chain by My Brand Better",
      },
      {
        img: "images/a10.webp",
        text: "Teacher Development and Experiential Learning by FICCI Awards",
      },
    ],
    2024: [
      {
        img: "images/a3.webp",
        text: "Best Preschool Chain of the Year & Innovation for Curriculum Award at WebCon 2024",
      },
      {
        img: "images/aw4.webp",
        text: "Best Faculty Development for Pre School (On Campus) by Indian Education Awards 2024",
      },
      {
        img: "images/aw2.webp",
        text: "Leading Quality Education Pre-school in North by Eminent Research",
      },
      {
        img: "images/aw5.webp",
        text: "Best Pre-school Chain in North India by Franchise India",
      }
    ],
    2025: [
      
      {
        img: "images/aw2.webp",
        text: "Leading Quality Education Pre-school in Delhi by Eminent Research",
      },
      {
        img: "images/aw1.webp",
        text: "Best Preschool Chain in India by Top Brand of the Year Awards 2025 (My Brand Better)",
      }
    ],
  };

  const wrapper = document.getElementById("awards-wrapper");
  const buttons = document.querySelectorAll(".tab-btn");
  let swiper;

  // Function to load awards dynamically
  function loadAwards(year) {
    wrapper.innerHTML = "";
    awardsData[year].forEach((award) => {
   wrapper.innerHTML += `
<div class="swiper-slide flex flex-col items-center text-center p-6 border bg-white transition">
    <div class="border-2 border-yellow-400 rounded-xl p-2">
      <img src="${award.img}" alt="Award" class="w-40 h-40 object-contain" />
    </div>
    <p class="mt-4 text-sm md:text-base font-medium text-gray-800">${award.text}</p>
  </div>
`;

    });

    // Destroy old swiper before reinitializing
    if (swiper) swiper.destroy();

    swiper = new Swiper(".awardsSwiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });

    // Pause slider on hover
    const swiperEl = document.querySelector(".awardsSwiper");
    swiperEl.addEventListener("mouseenter", () => swiper.autoplay.stop());
    swiperEl.addEventListener("mouseleave", () => swiper.autoplay.start());
  }

  // Default load 2025
  loadAwards("2025");

  // Handle tab button clicks
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) =>
        b.classList.remove("bg-[#D01E24]", "text-white")
      );
      buttons.forEach((b) =>
        b.classList.add("bg-white", "text-gray-800")
      );

      btn.classList.remove("bg-white", "text-gray-800");
      btn.classList.add("bg-[#D01E24]", "text-white");

      loadAwards(btn.dataset.year);
    });
  });
//      <!-- Awards Section End  -->





// Faq Start 
const faqs = [
      { q: "Is the curriculum aligned with local education requirements?", a: "Maple Bear's curriculum is based on Canadian best practices but adapted to local regulations and cultural contexts." },
      { q: "What are the returns like for a Maple Bear franchise?", a: "Returns vary, but franchises typically achieve breakeven within 18–24 months with an ROI of approx. 35-40%." },
      { q: "Criteria to select the location for a preschool?", a: "Ideal locations are safe, secure, accessible, and in a residential area with good footfall. Maple Bear provides expert guidance for site selection." },
      { q: "What is the total investment for a Maple Bear franchise?", a: "Investment varies but typically ranges from ₹30 lakh to ₹50 lakh, depending on location and infrastructure." },
      { q: "What is the tenure of the franchise agreement?", a: "The agreement is for 7 years and can be renewed based on mutually agreed terms." },
      { q: " How many staff members are required?", a: " A preschool typically starts with 5-7 staff, including a Centre Head, main teachers, assistant teachers, and support staff." },
      { q: "Is staff training chargeable?", a: "No, Maple Bear provides training at no cost, including onsite, online, and annual training with Canadian experts." },
      { q: "Can I expand my preschool to a full K-12 school?", a: "Yes, you can expand from a preschool to a full K-12 school with Maple Bear’s structured growth model." },
      { q: "Do I need an education background to run a franchise?", a: "No, Maple Bear welcomes entrepreneurs from all fields and provides full support and training." },
      { q: "How long does it take to launch a preschool?", a: "Typically, it takes 6 to 8 weeks from signing to launch, depending on construction, approvals, and hiring." },
        { q: "Is Maple Bear accredited or affiliated with any education boards?", a: "Yes. While the Canadian curriculum underpins Maple Bear’s pedagogy, its K–12 schools align with boards like CBSE, ICSE & IB depending on location and infrastructure." },
        { q: "What support does Maple Bear provide to new K-12 franchisees?", a: "Maple Bear offers full-spectrum support including site selection, architectural guidance, staff recruitment, curriculum training, marketing, and ongoing operational assistance." },
        { q: "What is the typical investment required for a K–12 Maple Bear franchise?", a: "The total investment varies but generally ranges from ₹8 to ₹20 crore, depending on infrastructure, location, and grade levels." },
        { q: "Can I convert my existing school into a Maple Bear K–12 school?", a: "Yes, Maple Bear offers conversion models for existing schools that meet their academic, infrastructural, and operational criteria." },
        { q: " How long is the franchise agreement, and can it be renewed?", a: "Typically, the franchise agreement is for 15 years and is renewable upon mutual agreement and performance evaluation." },

    ];

    const faqContainer = document.getElementById("faq-container");
    const readMoreBtn = document.getElementById("read-more");
    const readLessBtn = document.getElementById("read-less");

    let visibleCount = 5;

    // Render FAQs
    function renderFaqs() {
      faqContainer.innerHTML = "";

      faqs.slice(0, visibleCount).forEach((faq, index) => {
        const faqItem = document.createElement("div");
        faqItem.className = "bg-gray-100 rounded-lg border border-gray-200 overflow-hidden transition-all";

        faqItem.innerHTML = `
          <button class="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-800 hover:bg-yellow-100 transition">
            <span>${faq.q}</span>
            <svg class="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div class="max-h-0 overflow-hidden px-4 text-gray-600 transition-all">
            ${faq.a}
          </div>
        `;

        const button = faqItem.querySelector("button");
        const answer = faqItem.querySelector("div");
        const icon = button.querySelector("svg");

        button.addEventListener("click", () => {
          const isOpen = answer.classList.contains("max-h-40");
          document.querySelectorAll("#faq-container div div").forEach(el => el.classList.remove("max-h-40"));
          document.querySelectorAll("#faq-container button svg").forEach(el => el.classList.remove("rotate-180"));

          if (!isOpen) {
            answer.classList.add("max-h-40");
            icon.classList.add("rotate-180");
          }
        });

        faqContainer.appendChild(faqItem);
      });

      // Button visibility
      readMoreBtn.style.display = visibleCount >= faqs.length ? "none" : "inline-block";
      readLessBtn.style.display = visibleCount > 5 ? "inline-block" : "none";
    }

    // Show more FAQs
    readMoreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      visibleCount = faqs.length;
      renderFaqs();
    });

    // Show fewer FAQs
    readLessBtn.addEventListener("click", (e) => {
      e.preventDefault();
      visibleCount = 5;
      renderFaqs();
    });

    renderFaqs();