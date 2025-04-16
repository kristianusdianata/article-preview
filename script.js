/**
 * ----------------------------------------------------
 * Global variables
 * ----------------------------------------------------
 */
let button = null;
let wrapper = null;
let card = null;

/**
 * ----------------------------------------------------
 * Helper function
 * ----------------------------------------------------
 */
function deactiveAction() {
  button.classList.remove("active");
  wrapper.classList.add("hide");
}

function toggleAction() {
  button.classList.toggle("active");
  wrapper.classList.toggle("hide");
}

function handleDocumentClick(e) {
  if (!button && !wrapper) return;

  const isButtonActive = button.classList.contains("active");
  const isClickOutsideButton = !button.contains(e.target);
  const isClickOutsideWrapper = !wrapper.contains(e.target);

  if (isButtonActive && isClickOutsideButton && isClickOutsideWrapper) {
    deactiveAction();
  }
}
function handleWrapperMenuPosition() {
  if (window.innerWidth > 768) {
    const target_btn_rect = button.getBoundingClientRect(); // get share button position
    const target_card_rect = card.getBoundingClientRect(); // get card element (which is the parent) position

    // calculate wrapper-menu element position
    wrapper.style.setProperty(
      "inset-block-end",
      `${target_card_rect.bottom - target_btn_rect.bottom + 65}px`
    );
  } else {
    wrapper.style.removeProperty("inset-block-end"); // on small screen remove inset-block-end property with dynamic value
  }
}

function handleTransitionClass() {
  if (window.innerWidth > 768) {
    /**
     * add transition class to wrapper
     * on large screen
     */
    if (wrapper.classList.contains("sm-transition")) {
      wrapper.classList.remove("sm-transition"); // remove small screen wrapper transition class
    }

    wrapper.classList.add("lg-transition"); // add large screen wrapper transition class
  } else {
    /**
     * add transition class to wrapper
     * on small screen
     */
    if (wrapper.classList.contains("lg-transition")) {
      wrapper.classList.remove("lg-transition"); // remove large screen wrapper transition class
    }

    wrapper.classList.add("sm-transition"); // add small screen wrapper transition class
  }
}

/**
 * ----------------------------------------------------
 * Setup function
 * ----------------------------------------------------
 */
function setuResponsiveDynamicStyle() {
  if (!card && !button && !wrapper) return;
  handleWrapperMenuPosition();
  handleTransitionClass();
}

function setupToggleAction() {
  if (!button && !wrapper) return;

  button.addEventListener("click", toggleAction);
}

function setupDocumentAction() {
  document.addEventListener("click", handleDocumentClick);
}

function setupRezizeAction() {
  window.addEventListener("resize", setuResponsiveDynamicStyle);
}

/**
 * ----------------------------------------------------
 * Invoke function
 * ----------------------------------------------------
 */
function init() {
  button = document.querySelector(".footer button");
  wrapper = document.querySelector(".wrapper-menu");
  card = document.querySelector(".card");

  setuResponsiveDynamicStyle();
  setupToggleAction();
  setupDocumentAction();
  setupRezizeAction();
}

init();
