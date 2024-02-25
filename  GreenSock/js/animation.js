(() => {
  function animationMenu() {
    const tlMenu = gsap.timeline();
    tlMenu.pause();
    tlMenu
      .to(
        '.menu',
        {
          display: 'block',
          duration: 0,
        },
        0
      )
      .fromTo(
        '.menu__header',
        {
          y: -100,
          opacity: 0,
          duration: 0.7,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
        },
        0.4
      )
      .from(
        '.menu__main',
        {
          opacity: 0,
          duration: 0.7,
        },
        0.8
      )
      .from(
        '.menu__left',
        {
          opacity: 0,
          y: 70,
          duration: 0.7,
        },
        1.2
      )
      .from(
        '.social',
        {
          opacity: 0,
          y: 70,
          duration: 1,
        },
        1.5
      )
      .from(
        '.menu__right',
        {
          opacity: 0,
          y: 70,
          duration: 1,
        },
        1.5
      );

    return tlMenu;
  }

  function Menu() {
    const burger = document.querySelector('.burger');
    const close = document.querySelector('.close');
    console.log(burger);
    const menu = animationMenu();

    burger.addEventListener('click', e => {
      e.preventDefault();
      menu.play();
    });

    close.addEventListener('click', e => {
      e.preventDefault();
      menu.reverse();
    });
  }

  function siteLoad () {
    const tlLoad = gsap.timeline();
    tlLoad
    .from('.hero__btn', {
      opacity: 0,
      y: 80,
      duration: 1
    },
    0)
    .from('.hero__title', {
      opacity: 0,
      y: 90,
      duration: 1
    },
    0.2)
    .from('.hero__descr', {
      opacity: 0,
      duration: 1
    },
    0.6)

    .from('.photos__img_1', {
      opacity: 0,
      scale: 0.4,
      duration: 0.7,
      ease: "slow(0.7,0.7,false)"
    },
    0.8)
    .from('.photos__img_2', {
      opacity: 0,
      scale: 0.4,
      duration: 0.7,
      ease: "slow(0.7,0.7,false)"
    },
    1)
    .from('.photos__img_3', {
      opacity: 0,
      scale: 0.4,
      duration: 0.7,
      ease: "slow(0.7,0.7,false)"
    },
    1.2)
    .from('.photos__author', {
      opacity: 0,
      duration: 1
    },
    1.4)
  }

  document.addEventListener('DOMContentLoaded', () => {
    siteLoad();
    Menu();
  });
})();
