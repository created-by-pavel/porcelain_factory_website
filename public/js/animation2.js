let loadTl = gsap.timeline();
loadTl.from(".title", {opacity: 0, scale: 0.9, duration: 0.5});
loadTl.from(".form-container", {opacity: 0, scale: 0.9, duration: 0.6});

let scrollTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".main",
        start: "center 80%",
        toggleActions: "play none none none"
    }
});
scrollTl.from(".contacts", {opacity: 0, scale: 0.9, duration: 0.6});
scrollTl.from(".map", {opacity: 0, scale: 0.9, duration: 0.6});